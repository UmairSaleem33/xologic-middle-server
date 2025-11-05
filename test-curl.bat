@echo off
REM Mock API Server - CMD Test Script
REM Pehle server ko run karo: node server.js

echo.
echo ========================================
echo Mock API Server - Curl Test Commands
echo ========================================
echo.

echo 1. Testing Home Endpoint...
echo Command: curl http://localhost:3000/
curl http://localhost:3000/
echo.
echo.

timeout /t 2 /nobreak > nul

echo 2. Testing GitHub Users List (5 users)...
echo Command: curl http://localhost:3000/api/users/github?limit=5
curl http://localhost:3000/api/users/github?limit=5
echo.
echo.

timeout /t 2 /nobreak > nul

echo 3. Testing Specific GitHub User (octocat)...
echo Command: curl http://localhost:3000/api/users/github/octocat
curl http://localhost:3000/api/users/github/octocat
echo.
echo.

timeout /t 2 /nobreak > nul

echo 4. Testing User Repositories (octocat)...
echo Command: curl http://localhost:3000/api/users/github/octocat/repos?limit=5
curl http://localhost:3000/api/users/github/octocat/repos?limit=5
echo.
echo.

timeout /t 2 /nobreak > nul

echo 5. Testing Mock Users (JSONPlaceholder)...
echo Command: curl http://localhost:3000/api/users/mock
curl http://localhost:3000/api/users/mock
echo.
echo.

echo ========================================
echo All Tests Completed!
echo ========================================
echo.

pause

