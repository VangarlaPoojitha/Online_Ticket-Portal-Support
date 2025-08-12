@echo off
echo Setting up SonarQube...
 
REM Download SonarQube Community Edition
if not exist "sonarqube" (
    echo Downloading SonarQube...
    curl -L -o sonarqube.zip https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.9.0.65466.zip
    powershell -command "Expand-Archive -Path sonarqube.zip -DestinationPath ."
    ren sonarqube-9.9.0.65466 sonarqube
    del sonarqube.zip
)
 
echo Starting SonarQube...
cd sonarqube\bin\windows-x86-64
StartSonar.bat