@echo off
TITLE Push CCTNS Tracker to GitHub
echo =====================================================================
echo    CCTNS Investigation Tracker - GitHub Repository Push
echo    Target: https://github.com/projectcctns9-debug/cctns-investigation-tracker.git
echo =====================================================================
echo.
cd /d "%~dp0"

echo [1/3] Staging all changes...
git add .
git commit -m "feat: complete CCTNS investigation tracker with unified dashboard" 2>nul

echo [2/3] Setting branch to main...
git branch -M main

echo [3/3] Setting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/projectcctns9-debug/cctns-investigation-tracker.git

echo.
echo Pushing code to GitHub...
echo (Agar browser login pop-up aaye to authorize karein)
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [SUCCESS] Code pushed to GitHub successfully!
    echo Repository: https://github.com/projectcctns9-debug/cctns-investigation-tracker
    echo =====================================================================
) else (
    echo.
    echo [ERROR] Push failed. 
    echo Please make sure you have created the repository 'cctns-investigation-tracker'
    echo on https://github.com/new first!
)
echo.
pause
