/**
 * Created by Yanming Tang on 2/24/16.
 */
'use strict';

/**
    unit test for PhoneUdateCtrl which manages Rest API to update and get phone summary
    following info of a given http request is verified
    1. request method type
    2. request url. if url has parameters, make sure parameter values are set on url before request is sent
    3. for PUT, verify request body that has the actual data to be updated
    this unit test also covers both init and update methods in PhoneUdateCtrl
    this unit test also covers both init and update methods in PhoneUdateCtrl
 */
describe('Controller: PhoneUpdateCtrl', function () {
    // load the controller's module
    beforeEach(module('phonecatApp'));

    var PhoneUpdateCtrl;
    var scope;
    var phoneSummaryService;
    var $controller, $routeParams, $rootScope, $httpBackend;
    var url;
    var expectedPhoneSummary = function() {
        return {
            "age": '1',
            "id": "xyz",
            "hide": false,
            "imageUrl": "img/phones/motorola-xoom.0.jpg",
            "name": "MOTOROLA XOOM",
            "snippet": "nice MOTOROLA XOOM"
        }
    };

    var expectedPhoneToUpdateSummary = function() {
        return {
            "age": '1',
            "id": "xyz",
            "hide": false,
            "imageUrl": "img/phones/motorola-xoom.0.jpg",
            "name": "xyz",
            "snippet": "nice MOTOROLA XOOM"
        }
    };

    var username = 'dummyUser';

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, PhoneSummary, _$routeParams_, $filter, ConfigConstants, userService) {
        userService.clearCookie();
        $httpBackend = _$httpBackend_;
        phoneSummaryService = PhoneSummary;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $routeParams = _$routeParams_;
        url = $filter('format')('{0}:{1}/mockbox/phones/{2}/{3}/phones/xyz',
            ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, username);
        //PhoneUpdateCtrl retrieves userName from userService and set it on URL path. So set userName on userService
        userService.mockUser();
        //PhoneUpdateCtrl passes phoneId route parameter to the PhoneSummary service URI. so set the phoneId route parameter
        //before instantiate the controller
        $routeParams.phoneId = 'xyz';
        scope = $rootScope.$new();
        PhoneUpdateCtrl = $controller('PhoneUpdateCtrl', {
            $scope: scope,
            PhoneSummary: phoneSummaryService
        });

        //specify a fake backend GET response if GET is made.
        //this is needed for each test because whenever the controller is created, PHoneSummary.get is called
        $httpBackend.when('GET', url).respond(200, expectedPhoneSummary());
    }));


    it('phoneUpdateCtrl.init: should get phone from server by passing username and phoneid on GET url', function () {
        expect(scope.phone).not.toBeDefined();
        $httpBackend.expectGET(url);
        spyOn(phoneSummaryService, 'get').and.callThrough();
        scope.init();
        expect(phoneSummaryService.get).toHaveBeenCalled();
        $httpBackend.flush();
        expect(scope.phone.id).toBe('xyz');

    });

    it('phoneUpdateCtrl.update: should send PUT wiht username, phone on PUT url and phone in request body', function () {
        spyOn(phoneSummaryService, 'update').and.callThrough();
        var phone = expectedPhoneToUpdateSummary()
        $httpBackend.expectPUT(url, function(requestBody) {
            return requestBody == JSON.stringify(phone);
        }).respond(200, {}); //OK don't care put response
        scope.update(phone, username);
        $httpBackend.flush();
        expect(phoneSummaryService.update).toHaveBeenCalled();
    });

    afterEach(inject(function(userService) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        userService.clearCookie();
    }));

});