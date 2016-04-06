'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource', '$filter', 'ConfigConstants',
  function($resource, $filter, ConfigConstants){
    //http://localhost:8080/mockbox/phones/v2/ytang/phones
    var urlPath = $filter('format')('{0}:{1}/mockbox/phones/{2}/:userName/phones',
      ConfigConstants.url, ConfigConstants.port, ConfigConstants.version);

    return $resource(urlPath, {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

phonecatServices.factory('PhoneDetail', ['$resource', '$filter', 'ConfigConstants',
  function($resource, $filter, ConfigConstants){
    var urlPath = $filter('format')('{0}:{1}/mockbox/phonedetails/{2}/:userName/d/:phoneId',
      ConfigConstants.url, ConfigConstants.port, ConfigConstants.version);
    //return $resource(url+'/mockbox/phonedetails/v2/ytang/d/:phoneId', {}, {
    return $resource(urlPath, {}, {
    });
  }]);

//http://stackoverflow.com/questions/16194442/angular-content-type-is-not-being-sent-with-http
phonecatServices.factory('PhoneSummary', ['$resource', '$filter', 'ConfigConstants',
  function($resource, $filter, ConfigConstants){
    var urlPath = $filter('format')('{0}:{1}/mockbox/phones/{2}/:userName/phones/:phoneId',
        ConfigConstants.url, ConfigConstants.port, ConfigConstants.version);
    return $resource(urlPath, null, {
        'get' : {method: 'GET'},
        'delete': {method: 'DELETE',
                 data: '',
                 headers: {"Content-Type": "application/json"}
        },
        'update': {method: 'PUT'}
    });
  }]);
phonecatApp.factory('phoneOptionService', function() {
  var options = [
    {value: 'edit', displayName: 'Edit Phone'},
    {value: 'delete', displayName: "Delete Phone"}
  ];

  return {
    getOptions: function() {
      return options;
    }
  };
});