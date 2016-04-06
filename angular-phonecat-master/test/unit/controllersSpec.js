'use strict';

/* jasmine specs for controllers go here */
 describe('PhoneCat controllers', function() {
     beforeEach(function () {
         jasmine.addMatchers({
             toEqualData: function (util, customEqualityTesters) {
                 return {
                     compare: function (actual, expected) {
                         var passed = angular.equals(actual, expected);
                         return {
                             pass: passed,
                             message: 'Expected ' + actual + (passed ? '' : ' not') + ' to equal ' + expected
                         }
                     }
                 }
             }
         });
     });

  beforeEach(module('phonecatApp'));

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $filter, ConfigConstants, userService) {
      $httpBackend = _$httpBackend_;
      userService.mockUser();
      var urlPath = $filter('format')('{0}:{1}/mockbox/phones/{2}/{3}/phones',
          ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, userService.get().userName);
      $httpBackend.expectGET(urlPath).
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
        //after inject $route to controller, there is a refresh on login page. Need to train the default request too
      $httpBackend.expectGET('user/login-form.html').respond(200);
      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope});
    }));

    //Test the phones data returned
    it('HttpBackend-Unit-Test-example: should create "phones" model with 2 phones fetched from xhr', function() {
      expect(scope.phones).toEqualData([]);
      $httpBackend.flush();

      expect(scope.phones).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.data.orderProp).toBe('age');
    });
  });


  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
          return {
            name: 'phone xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller, $filter, ConfigConstants, userService) {
        $httpBackend = _$httpBackend_;
        userService.mockUser();
        var urlPath = $filter('format')('{0}:{1}/mockbox/phonedetails/{2}/{3}/d/xyz',
            ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, userService.get().userName);
        $httpBackend.expectGET(urlPath).respond(xyzPhoneData());
        $routeParams.phoneId = 'xyz';
        scope = $rootScope.$new();
        ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('HttpBackend-Unit-Test-Example: should fetch phone detail', function() {
        expect(scope.phone).toEqualData({});
        $httpBackend.flush();
        expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });
});
