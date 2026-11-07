@echo off
TITLE CCTNS Investigation Tracker - Internal Police Portal
echo =====================================================================
echo    CCTNS INVESTIGATION TRACKER (Bilingual: Hindi + English)
echo    सी.सी.टी.एन.एस विवेचना, ई-साक्ष्य एवं 60/90 दिवस मामला निगरानी
echo =====================================================================
echo.

cd /d "%~dp0frontend"
echo [1/2] Starting Frontend (React + Vite + Tailwind)...
start "CCTNS Tracker UI" cmd /k "npm run dev"

cd /d "%~dp0backend"
echo [2/2] Starting Backend API (FastAPI)...
start "CCTNS Tracker API" cmd /k "python -m uvicorn app.main:app --reload --port 8000"

echo.
echo =====================================================================
echo Portal URL: http://localhost:5174
echo API Swagger Docs: http://localhost:8000/docs
echo =====================================================================
timeout /t 5
start http://localhost:5174
