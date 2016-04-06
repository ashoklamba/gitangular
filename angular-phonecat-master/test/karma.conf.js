module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angularjs-filters/filters.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-material-icons/angular-material-icons.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'app/js/*.js',
      'app/common/*.js',
      'app/user/*.js',
      'app/requisition/*.js',
      'test/common/*.js',
      'test/unit/*.js',
      'test/unit/user/*.js',
      'test/unit/requisition/*.js',
        //todo: is there a way to reduce the configuration ? Looks like if we don't have these two entries, behavior tests will fail
      {pattern: 'app/user/login-form.html', watched: true, served: true, included: false},
      {pattern: 'app/partials/phone-list.html', watched: true, served: true, included: false},
    ],

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-jasmine-jquery',
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};