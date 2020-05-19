# Security Analysis

## Injection
- Vulnerability
    - User data are not validated and sanitized
    - Attacker data is used within search parameters to extract sensitive information
- Prevention
    - Escape html from user inputs 
    - Don’t perform queries with user data
 
## Broken Authentication
- Vulnerability
    - Attackers can retrieve the passwords and usernames of our app users. 
    - Session attacks due to unchecked and unexpired cookies
    - Retrieve highly sensitive health information about our users by gaining access to an admin account
- Prevention
    - Using cryptography to hash the password with a salt string and store the hash in our database.
    - When designing our security features we have to find a way to keep the  user’s session data away from malicious users.
 
## Sensitive Data Exposure
- Vulnerability
    - User authentication data transmitted and stored in plain text
    - User location data transmitted in plain text
    - Attacker data is used within search parameters to extract sensitive information
- Prevention
    - Encrypt authentication data sent from client end to server 
    - Encrypt location data sent from client end to server 
    - Store password using bcrypt

## XML Entities
- We will be using JSON 

## Broken Access Control
- Vulnerability
    - An attacker able to bypass access control checks to modify an URL of our web app.
    - An unauthorized access to a database query that will enable them to retrieve whatever sensitive information they need about the user.
    - If an attacker is able to access one of the admins page that he doesn’t have access to.
- Prevention
    - Able to correctly authenticate  a user when they use our app 
    - Creating a list of things users cannot do without proper authorization.
    - Able to have a standard method of identifying access control in our codebase.
		
## Security Misconfiguration
- Vulnerability
   - Error handling reveals stack traces 
   - Dependencies with bugs are not updated
   - Unnecessary packages are installed

- Prevention
  - Review and update dependencies 
  - Disable stack trace printing in production environment 
  - Do not install unused packages 

## Cross-Site Scripting XSS
- Vulnerability 
   - Attackers are able to send a redirect link to a malicious website to the user from a page returned from the server.
   - Attackers can add HTML and Javascript to request data 
- Prevention
    - Using a template to escape html in user input data
    - Validating and Sanitizing the user-controlled input 
 
## Insecure Deserialization
- Vulnerability
    - JSON objects can be used for remote code execution
- Prevention
    - Strict type constraints should be enforced when deserializing JSON objects
 
## Using Components with Known Vulnerabilities
- Vulnerability
    - Using deprecated version dependencies in both client-side and server-side code. 
- Prevention
    - Updating unsupported softwares and dependencies during each development cycle before deployment.
    - Checking for vulnerabilities daily
    - Make sure there are no unused dependencies in our app.

## Insufficient Logging & Monitoring
- Vulnerability
    - Failure to log user sign ups and logins 
    - Errors generate inadequate information
- Prevention
    - Ensure user signup and login access failures are logged with a way to identify users
    - Ensure the logs generate descriptive and adequate information of failures  
