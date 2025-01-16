# FIDO2 Authentication Bypass Implementation

## Attacker is the application to be run by the malicious actor. 
The inject.js script can be pasted in the console window of the malicious actor's browser to override the navigator.credentials.get(). It can also be converted to a web extension to use.

## Cloud is a sample implementation of the C2 server. 
The URL of the C2 server has to be mentioned in the flaskapp code for both the attacker and malware.

## Malware is the malware script that is run on the victim's machine.
It can be made to start on boot.
