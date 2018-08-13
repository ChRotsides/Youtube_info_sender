# Youtube_info_sender
Chrome extension that sends information about the current tab open in youtube

###SERVER###


Intall node js and in cmd run 

npm install express

npm install socket.io

npm install request-ip

npm install winser

npm install node-gyp

npm install rebuild

npm run-script install-windows-service

after installing all the modules go into the winser folder in node moudules and run cmd as admin in that folder type in cmd "nssm start api_test" to start the server.

###Extension###


Go to chrome menu

-more tools

-extensions

-Load unpacked

Find the Extensions folder in this repository and select the manifest.json.

Every thing should work now.

To get the data that the extension is sending you go to this url http://localhost:60024/getData
