/**
 * Created by i851226 on 3/21/16.
 */
var ApiGuidePage = require('./pages/apiGuidePage.js');

describe('api guide', function() {
    var newPage;
    //todo to get it from config
    var setup = function () {
        browser.ignoreSynchronization = true;
        newPage = new ApiGuidePage();
    };

    //todo found which jasmine version we use. Should use beforeAll
    beforeAll(function() {
        setup();
        newPage.go()
    });

    describe('api guide without login tests', function() {
        it('should have 3 app sidebar links', function () {
            expect(newPage.sideBarQuickStart.getText()).toEqual('Quick Start Guide');
            expect(newPage.sideBarAuthentication.getText()).toEqual('Authentication');
            expect(newPage.sideBarWhySap.getText()).toEqual('Why SAP Ariba');
        });
    });

    describe('api explorer with login tests', function() {

        beforeAll(function() {
            newPage.openAPIGuideWithLogin();
        });

        it('should have 3 app sidebar links', function () {
            expect(newPage.sideBarQuickStart.getText()).toEqual('Quick Start Guide');
            expect(newPage.sideBarAuthentication.getText()).toEqual('Authentication');
            expect(newPage.sideBarWhySap.getText()).toEqual('Why SAP Ariba');
        });

        afterAll(function() {
            newPage.logout();
        });
    });



});
