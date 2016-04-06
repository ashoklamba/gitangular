'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute', 'ch.filters',
  'phonecatAnimations',
  'phonecatControllers',
  'spockConstants',
  'spockFilters',
  'navi.directive',
  'userModule',
  'requisitionModule',
  'phonecatServices',
  'phonecatDirectives',
  'ngMdIcons']);

//todo: need build task to replace this with env specific value
//phonecatApp.constant('myConfig',
//    {
//      //This is a hack for now.  It will be configurable or pointing to localhost
//      //localhost doesn't work in protractor for some reason in e2e test.  ToDo: check localhost settings in Protractor
//      "url": "http://mo-9deec2c01.mo.sap.corp",
//      "port": "9090",
//      "version": "v2",
//    }
//);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/phones/update/:phoneId', {
        templateUrl: 'partials/phone-update.html',
        controller: 'PhoneUpdateCtrl'
      }).
      when('/login', {
        templateUrl: 'user/login-form.html',
        controller: 'LoginFormCtrl'
      }).
      when('/requisitions', {
        templateUrl: 'requisition/requisition-list.html',
        controller: 'RequisitionListCtrl'
      }).
      when('/requisitions/:reqId', {
        templateUrl: 'requisition/requisition-detail.html',
        controller: 'RequisitionDetailCtrl'
    }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
