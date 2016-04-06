#End 2 End Testing (Protractor)
To run the end-2-end tests against the application you use [Protractor](https://github.com/angular/protractor).

## Starting the Web Server
In either case you will need the application to be running via the web-server.
From the root folder of the repository run:

```
npm start
```

The application should now be available at `http://localhost:8000/app/index.html`

## Testing with Protractor

As a one-time setup, first install protractor.
```
npm config set https-proxy http://proxy.ariba.com:8080
npm config set proxy http://proxy.ariba.com:8080
sudo npm install -g protractor@2.5.1

```

Then download Selenium server and browser support. However,  webdriver-manager doesn't work behind corporate proxy. So you need to manually switch to SAP-Internet and run
```
sudo node /usr/local/bin/webdriver-manager update
```

Start the Protractor test runner using the e2e configuration:

```
npm run protractor
```
## Protractor code style
### 
