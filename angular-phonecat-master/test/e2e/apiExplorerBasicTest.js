/**
 * Created by i851226 on 3/21/16.
 */
var ApiExplorerPage = require('./pages/apiExplorerPage.js');
describe('api explorer', function() {
    var newPage;
    //todo to get it from config
    var setup = function () {
        browser.ignoreSynchronization = true;
        newPage = new ApiExplorerPage();
    }

    //todo found which jasmine version we use. Should use beforeAll
    beforeAll(function() {
        setup();
        newPage.go()
    });

    describe('api explorer without login tests', function() {
        it('should have 3 app api links', function () {
            expect(newPage.sideBarMenus.count()).toBe(3);
            expect(newPage.sideBarBuyer.getText()).toEqual('Buyer');
            expect(newPage.sideBarNetwork.getText()).toEqual('Network');
            expect(newPage.sideBarSourcing.getText()).toEqual('Sourcing');
        });

        it('should open Buyer API by default and show 3 envs for Buyer in table', function () {
            newPage.envTable.then(function (cells) {
                expect(cells.length).toBe(6);
            });
            expect(newPage.publicUriPrefixByEnv('Development')).toBe('/oa/v0.1/MOCKBOX/Buyer');
            expect(newPage.publicUriPrefixByEnv('Staging')).toBe('/oa/v0.1/REALBOX/Buyer');
            expect(newPage.publicUriPrefixByEnv('Production')).toBe('/oa/v0.1/PRODUCTION/Buyer');
        });

        it('should have Buyer API swaggers', function () {
            expect(newPage.getApiSwaggerHeading("Approvers").getText()).toBe('Approvers');
            expect(newPage.getApiSwaggerHeading("Requisitions").getText()).toBe("Requisitions");
            expect(newPage.getApiSwaggerHeading("Comments").getText()).toBe("Comments");
            expect(newPage.getApiSwaggerHeading("Requesters").getText()).toBe("Requesters");
            expect(newPage.getApiSwaggerHeading("LineItems").getText()).toBe("LineItems");
            expect(newPage.getApiSwaggerHeading("Accountings").getText()).toBe("Accountings");
            expect(newPage.getApiSwaggerHeading("Records").getText()).toBe("Records");
            expect(newPage.getApiSwaggerHeading("Users").getText()).toBe("Users");
        })
    });

    describe('api explorer with login tests', function() {

        beforeAll(function() {
            newPage.openAPIExplorerWithLogin();
        })

        it('should have the use the api buttuon', function() {
            expect(newPage.useThisApiButton.getText()).toBe("Use this API");
        });

        afterAll(function() {
            newPage.logout();
        })
    });



});
