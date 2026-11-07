@echo off
TITLE Push CCTNS Tracker to GitHub
echo =====================================================================
echo    CCTNS Investigation Tracker - GitHub Repository Push
echo =====================================================================
echo.
cd /d "%~dp0"

echo [1/3] Checking Git status...
git add .
git commit -m "feat: complete CCTNS investigation tracker with unified dashboard" 2>nul

echo.
echo [2/3] Setting Main Branch...
git branch -M main

echo.
echo [3/3] GitHub Repository URL...
echo Example: https://github.com/your-username/cctns-tracker.git
echo.
set /p REPO_URL="Enter GitHub Repository URL (or press Enter if already set): "

if not "%REPO_URL%"=="" (
    git remote remove origin 2>nul
    git remote add origin %REPO_URL%
)

echo.
echo Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [SUCCESS] Code pushed to GitHub successfully!
    echo =====================================================================
) else (
    echo.
    echo [NOTE] If authentication failed, please ensure your GitHub Token
    echo        or GitHub login credentials are entered correctly.
)
echo.
pause
