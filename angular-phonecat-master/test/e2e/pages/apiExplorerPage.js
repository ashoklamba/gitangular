/**
 * Created by i851226 on 3/22/16.
 */
var BasePage = require('./basePage.js');

var ApiExplorerPage = function () {
    this.sideBarMenus = element.all(by.css('a[href*="/apis/"]'));
    this.useThisApiButton = element(by.css('.btn.btn-primary'));
    this.sideBarBuyer = element(by.css('a[href*="/apis/Buyer"]'));
    this.sideBarNetwork = element(by.css('a[href*="/apis/Network"]'));
    this.sideBarSourcing = element(by.css('a[href*="/apis/Sourcing"]'));
    this.envTable = element.all(by.css('table.table.table-bordered > tbody > tr > td'));
};

//extend BasePage by cloning BasePage's prototype.
ApiExplorerPage.prototype = Object.create(BasePage.prototype);

ApiExplorerPage.prototype.go = function () {
    var uri = this.baseUrl() + '/apis';
    browser.get(uri);
    browser.driver.wait(function () {
        return browser.driver.getTitle().then(function (title) {
            return "API Explorer" === title;
        });
    }, 2000).then(function () {
        console.log("Testing on the API Explorer page, waiting until swagger section is done");
        browser.driver.wait(function () {
            return element(by.css('a[href*="#!/Requisitions"]')).isPresent().then(function (result) {
                return result;
            });
        }, 2000);
    });
};

ApiExplorerPage.prototype.getApiSwaggerHeading = function (app) {
    var urlPattern = 'a[href="#!/' + app + '"]';
    var resourcePattern = '#resource_' + app;
    //todo later: why more than one element found
    return element(by.css('.swagger-section')).element(by.css(resourcePattern)).element(by.css('.heading')).element(by.css(urlPattern));
};

ApiExplorerPage.prototype.publicUriPrefixByEnv = function (envName) {
    var rows = element.all(by.css('table.table.table-bordered > tbody > tr'));
    var deferred = protractor.promise.defer();
    rows.filter(function (row) {
        var cells = row.all(by.css('td'));
        return cells.count().then(function (count) {
            if (count > 0) {
                expect(count).toBe(2);
                return cells.get(0).getText().then(function (text) {
                    return text === envName;
                })
            }
            else {
                return false;
            }
        })
    }).all(by.css('td')).then(function (cells) {
        expect(cells.length).toBe(2);
        cells[1].getText().then(function (text) {
            deferred.fulfill(text);
        });
    });
    return deferred.promise;
};

module.exports = ApiExplorerPage;
