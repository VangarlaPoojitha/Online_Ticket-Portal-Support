@echo off
echo Running SonarCloud analysis...
 
REM Download SonarScanner if not exists
if not exist "sonar-scanner" (
    echo Downloading SonarScanner...
    curl -L -o sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-windows.zip
    powershell -command "Expand-Archive -Path sonar-scanner.zip -DestinationPath ."
    ren sonar-scanner-4.8.0.2856-windows sonar-scanner
    del sonar-scanner.zip
)
 
REM SonarCloud analysis with actual project details
sonar-scanner\bin\sonar-scanner.bat -Dsonar.organization=birdorg -Dsonar.projectKey=birdorg_online-ticket-portal -Dsonar.sources=. -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=c67b5c6ae75e60eea7f76d76fa2ebd69d3f332f0
echo Analysis complete! Check https://sonarcloud.io
pause