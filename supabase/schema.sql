-- ==============================================================
-- CCTNS INVESTIGATION TRACKER - SUPABASE DATABASE SCHEMA
-- Target Region: South Asia (Mumbai, India) [ap-south-1]
-- Compliance: Bharatiya Nyaya Sanhita (BNS) & BNSS 2023
-- Timezone: Asia/Kolkata (IST)
-- ==============================================================

SET timezone = 'Asia/Kolkata';

-- 1. Districts (जिले)
CREATE TABLE IF NOT EXISTS districts (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL
);

-- 2. Police Stations (थाने)
CREATE TABLE IF NOT EXISTS police_stations (
    id TEXT PRIMARY KEY,
    district_id TEXT REFERENCES districts(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL
);

-- 3. Officers & IOs (अधिकारी एवं विवेचक)
CREATE TABLE IF NOT EXISTS officers (
    id TEXT PRIMARY KEY,
    police_station_id TEXT REFERENCES police_stations(id) ON DELETE CASCADE,
    pno TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    rank TEXT NOT NULL,
    rank_hi TEXT NOT NULL,
    mobile TEXT,
    is_active_io BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CRA Daily Login Compliance (CRA दैनिक लॉगिन ट्रैकिंग)
CREATE TABLE IF NOT EXISTS cra_daily_logins (
    id TEXT PRIMARY KEY,
    officer_id TEXT REFERENCES officers(id) ON DELETE CASCADE,
    police_station_id TEXT REFERENCES police_stations(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    has_logged_in BOOLEAN DEFAULT FALSE,
    login_time TEXT,
    cases_updated_count INT DEFAULT 0,
    last_active_action TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_officer_day UNIQUE(officer_id, date)
);

-- 5. FIR Records (प्रथम सूचना रिपोर्ट रजिस्टर)
CREATE TABLE IF NOT EXISTS fir_records (
    id TEXT PRIMARY KEY,
    police_station_id TEXT REFERENCES police_stations(id) ON DELETE CASCADE,
    district_id TEXT REFERENCES districts(id) ON DELETE CASCADE,
    fir_number TEXT NOT NULL,
    fir_year INT NOT NULL,
    fir_date DATE NOT NULL,
    acts_sections TEXT NOT NULL,
    crime_head TEXT NOT NULL,
    crime_head_hi TEXT NOT NULL,
    io_officer_id TEXT REFERENCES officers(id),
    complainant_name TEXT,
    accused_names TEXT[],
    current_status TEXT DEFAULT 'Under Investigation',
    current_status_hi TEXT DEFAULT 'विवेचनाधीन',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. e-Sakshya SIDs (ई-साक्ष्य आईडी एवं लिंकिंग स्थिति)
CREATE TABLE IF NOT EXISTS esakshya_sids (
    id TEXT PRIMARY KEY,
    fir_id TEXT REFERENCES fir_records(id) ON DELETE CASCADE,
    sid_number TEXT UNIQUE NOT NULL,
    evidence_type TEXT NOT NULL,
    evidence_type_hi TEXT NOT NULL,
    collected_at TEXT NOT NULL,
    location_details TEXT,
    geo_coords TEXT,
    hash_value TEXT NOT NULL,
    is_final_linked_to_challan BOOLEAN DEFAULT FALSE,
    final_link_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 60/90 Days BNS Custody Cases (60/90 दिवस BNS मामला निगरानी)
CREATE TABLE IF NOT EXISTS bns_custody_cases (
    id TEXT PRIMARY KEY,
    fir_id TEXT REFERENCES fir_records(id) ON DELETE CASCADE,
    police_station_id TEXT REFERENCES police_stations(id) ON DELETE CASCADE,
    district_id TEXT REFERENCES districts(id) ON DELETE CASCADE,
    accused_name TEXT NOT NULL,
    arrest_date DATE NOT NULL,
    statutory_days INT NOT NULL CHECK (statutory_days IN (60, 90)),
    deadline_date DATE NOT NULL,
    challan_status TEXT DEFAULT 'Drafting',
    challan_status_hi TEXT DEFAULT 'प्रारूपण जारी',
    is_due_today_in_court BOOLEAN DEFAULT FALSE,
    is_presented_in_court BOOLEAN DEFAULT FALSE,
    court_presentation_date DATE,
    court_name TEXT,
    cctns_entry_status TEXT DEFAULT 'Pending',
    cctns_entry_status_hi TEXT DEFAULT 'CCTNS में प्रविष्टि शेष',
    cctns_dispatch_no TEXT,
    cctns_entry_date DATE,
    cctns_operator_name TEXT,
    cis_case_no TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Enablement
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE police_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cra_daily_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE fir_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE esakshya_sids ENABLE ROW LEVEL SECURITY;
ALTER TABLE bns_custody_cases ENABLE ROW LEVEL SECURITY;

-- Anonymous Read Policy (For portal UI)
CREATE POLICY "Public Read Access" ON districts FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON police_stations FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON officers FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON cra_daily_logins FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON fir_records FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON esakshya_sids FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON bns_custody_cases FOR SELECT USING (true);
