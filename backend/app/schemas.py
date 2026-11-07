from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime

class DistrictSchema(BaseModel):
    id: str
    name_en: str
    name_hi: str
    code: str

class PoliceStationSchema(BaseModel):
    id: str
    district_id: str
    name_en: str
    name_hi: str
    code: str

class OfficerSchema(BaseModel):
    id: str
    police_station_id: str
    pno: str
    name_en: str
    name_hi: str
    rank: str
    mobile: str
    is_active_io: bool

class CraDailyLoginSchema(BaseModel):
    id: str
    officer_id: str
    officer_name_en: str
    officer_name_hi: str
    police_station_id: str
    pno: str
    date: date
    has_logged_in: bool
    login_time: Optional[str] = None
    cases_updated_count: int = 0
    last_active_action: Optional[str] = None

class ESakshyaSidSchema(BaseModel):
    id: str
    fir_id: str
    sid_number: str
    evidence_type: str
    evidence_type_hi: str
    collected_at: str
    location_details: str
    geo_coords: str
    hash_value: str
    is_final_linked_to_challan: bool
    final_link_date: Optional[str] = None

class BnsCaseMonitoringSchema(BaseModel):
    id: str
    fir_id: str
    police_station_id: str
    district_id: str
    fir_number: str
    fir_year: int
    acts_sections: str
    crime_head: str
    crime_head_hi: str
    accused_name: str
    arrest_date: date
    statutory_days: int # 60 or 90
    deadline_date: date
    days_elapsed: int
    days_remaining: int
    challan_status: str
    challan_status_hi: str
    is_due_today_in_court: bool
    is_presented_in_court: bool
    court_name: Optional[str] = None
    cctns_entry_status: str
    cctns_entry_status_hi: str
    cctns_dispatch_no: Optional[str] = None
    cis_case_no: Optional[str] = None
    cctns_operator_name: Optional[str] = None
    cctns_entry_date: Optional[date] = None

class CctnsPostCourtEntryRequest(BaseModel):
    case_id: str
    cctns_dispatch_no: str
    cis_case_no: Optional[str] = None
    cctns_operator_name: str
    court_presentation_date: Optional[date] = None
