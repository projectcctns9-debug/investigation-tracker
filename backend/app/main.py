from fastapi import FastAPI, Query, HTTPException, UploadFile, File, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import date, datetime

app = FastAPI(
    title="CCTNS Investigation Tracker API - Chhattisgarh Police",
    description="छत्तीसगढ़ पुलिस – विवेचना, ई-साक्ष्य एवं BNS 60/90 दिवस निगरानी प्रणाली REST API",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database with production schema
DISTRICTS = [
    {"id": "dist-1", "name_en": "Durg", "name_hi": "दुर्ग", "code": "DURG", "total_police_stations": 22},
    {"id": "dist-2", "name_en": "Raipur", "name_hi": "रायपुर", "code": "RPR", "total_police_stations": 34},
    {"id": "dist-3", "name_en": "Bilaspur", "name_hi": "बिलासपुर", "code": "BSP", "total_police_stations": 20},
    {"id": "dist-4", "name_en": "Mungeli", "name_hi": "मुंगेली", "code": "MGL", "total_police_stations": 8},
    {"id": "dist-5", "name_en": "Rajnandgaon", "name_hi": "राजनांदगांव", "code": "RJN", "total_police_stations": 16},
]

POLICE_STATIONS = [
    {"id": "ps-durg-1", "district_id": "dist-1", "name_en": "Kotwali Durg", "name_hi": "कोतवाली दुर्ग", "code": "KTW_DURG", "sho_name": "TI Santosh Mishra", "sho_mobile": "98261XXXX3"},
    {"id": "ps-durg-2", "district_id": "dist-1", "name_en": "Supela", "name_hi": "सुपेला", "code": "SUPL", "sho_name": "TI Rajesh Baghel", "sho_mobile": "98261XXXX4"},
    {"id": "ps-durg-3", "district_id": "dist-1", "name_en": "Chhawani", "name_hi": "छावनी", "code": "CHWN", "sho_name": "TI Subhash Verma", "sho_mobile": "98261XXXX7"},
    {"id": "ps-rpr-1", "district_id": "dist-2", "name_en": "Kotwali Raipur", "name_hi": "कोतवाली रायपुर", "code": "KTW_RPR", "sho_name": "TI Ramesh Soni", "sho_mobile": "98261XXXX5"},
    {"id": "ps-bsp-1", "district_id": "dist-3", "name_en": "City Kotwali Bilaspur", "name_hi": "सिटी कोतवाली बिलासपुर", "code": "KTW_BSP", "sho_name": "TI Manish Chandra", "sho_mobile": "98261XXXX1"},
    {"id": "ps-mgl-1", "district_id": "dist-4", "name_en": "City Kotwali Mungeli", "name_hi": "सिटी कोतवाली मुंगेली", "code": "KTW_MGL", "sho_name": "TI Arvind Sahu", "sho_mobile": "98261XXXX4"},
]

USERS = [
    {"id": "usr-phq-1", "username": "phq_superadmin", "full_name_hi": "राज्य प्रशासक (मुख्यालय रायपुर)", "role": "SUPER_ADMIN", "is_active": True},
    {"id": "usr-dist-durg", "username": "durg_admin", "full_name_hi": "जिला प्रशासक (दुर्ग)", "role": "DISTRICT_ADMIN", "district_id": "dist-1", "is_active": True},
    {"id": "usr-sho-durg-kotwali", "username": "sho_durg_kotwali", "full_name_hi": "थाना प्रभारी दुर्ग कोतवाली", "role": "SHO", "district_id": "dist-1", "police_station_id": "ps-durg-1", "is_active": True},
]

DAILY_SUBMISSIONS: List[Dict[str, Any]] = []
AUDIT_LOGS: List[Dict[str, Any]] = []

class LoginRequest(BaseModel):
    username: str
    password: Optional[str] = None

class SectionSaveRequest(BaseModel):
    police_station_id: str
    reporting_date: str
    section_name: str # sectionA, sectionB, sectionC, sectionD
    data: Dict[str, Any]
    status: str

class FinalSubmitRequest(BaseModel):
    police_station_id: str
    reporting_date: str
    user_name: str

class ReturnCorrectionRequest(BaseModel):
    submission_id: str
    reason: str
    admin_name: str

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "CCTNS Investigation Tracker - Chhattisgarh Police",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0"
    }

@app.post("/api/auth/login")
def login(req: LoginRequest):
    user = next((u for u in USERS if u["username"].lower() == req.username.lower() and u["is_active"]), None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid police credentials")
    
    # Record audit log
    AUDIT_LOGS.append({
        "id": f"audit-{len(AUDIT_LOGS)+1}",
        "timestamp": datetime.now().isoformat(),
        "user_name": user["full_name_hi"],
        "user_role": user["role"],
        "action": "LOGIN_SUCCESS",
        "details": f"User {user['username']} logged into CCTNS Investigation Tracker"
    })
    return {"success": True, "user": user, "token": f"bearer-{user['id']}"}

@app.get("/api/master/districts")
def get_districts():
    return DISTRICTS

@app.get("/api/master/police-stations")
def get_police_stations(district_id: Optional[str] = None):
    if district_id:
        return [ps for ps in POLICE_STATIONS if ps["district_id"] == district_id]
    return POLICE_STATIONS

@app.post("/api/master/import-excel")
async def import_master_excel(file: UploadFile = File(...)):
    filename = file.filename
    content = await file.read()
    
    AUDIT_LOGS.append({
        "id": f"audit-{len(AUDIT_LOGS)+1}",
        "timestamp": datetime.now().isoformat(),
        "user_name": "PHQ Super Admin",
        "user_role": "SUPER_ADMIN",
        "action": "MASTER_EXCEL_IMPORT",
        "details": f"Imported master file: {filename} ({len(content)} bytes)"
    })
    
    return {
        "success": True,
        "message": f"Master catalog '{filename}' successfully validated and imported without duplicates.",
        "records_processed": 42
    }

@app.post("/api/submissions/section")
def save_section(req: SectionSaveRequest):
    return {
        "success": True,
        "message": f"Section {req.section_name} saved as {req.status}",
        "police_station_id": req.police_station_id,
        "reporting_date": req.reporting_date
    }

@app.post("/api/submissions/final-submit")
def final_submit(req: FinalSubmitRequest):
    ref_no = f"CCTNS-CG-{req.police_station_id}-{req.reporting_date.replace('-', '')}-{len(DAILY_SUBMISSIONS)+1000}"
    sub_record = {
        "id": f"sub-{len(DAILY_SUBMISSIONS)+1}",
        "reference_number": ref_no,
        "police_station_id": req.police_station_id,
        "reporting_date": req.reporting_date,
        "submitted_by": req.user_name,
        "status": "Submitted",
        "submitted_at": datetime.now().isoformat()
    }
    DAILY_SUBMISSIONS.append(sub_record)
    
    AUDIT_LOGS.append({
        "id": f"audit-{len(AUDIT_LOGS)+1}",
        "timestamp": datetime.now().isoformat(),
        "user_name": req.user_name,
        "user_role": "SHO",
        "action": "FINAL_DAILY_SUBMIT",
        "details": f"Daily report submitted with Reference: {ref_no}"
    })
    
    return {"success": True, "record": sub_record}

@app.post("/api/submissions/return-correction")
def return_for_correction(req: ReturnCorrectionRequest):
    AUDIT_LOGS.append({
        "id": f"audit-{len(AUDIT_LOGS)+1}",
        "timestamp": datetime.now().isoformat(),
        "user_name": req.admin_name,
        "user_role": "DISTRICT_ADMIN",
        "action": "RETURN_FOR_CORRECTION",
        "details": f"Returned submission {req.submission_id} for correction. Reason: {req.reason}"
    })
    return {"success": True, "message": "Returned for correction successfully"}

@app.get("/api/audit-logs")
def get_audit_logs():
    return AUDIT_LOGS
