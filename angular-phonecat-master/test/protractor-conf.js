exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/apiExplorerBasicTest.js',
    'e2e/apiGuideBasicTest.js',
   // 'e2e/scenarios.js',
    'e2e/dragdrop.js'
  ],

  capabilities: {
    //'browserName': 'firefox'
    'browserName': 'chrome'

  },

  chromeOnly: true,

//  baseUrl: 'http://localhost:8000/',
  baseUrl: 'http://localhost:3000/authoring.html',


  //https://github.com/jasmine/jasmine/issues/704 to enable support for beforeAll and afterAll
  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
