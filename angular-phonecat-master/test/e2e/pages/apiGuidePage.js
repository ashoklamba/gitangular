/**
 * Created by i851226 on 3/24/16.
 */
var BasePage = require('./basePage.js');

var ApiGuidePage = function () {
    this.sideBarQuickStart = element(by.css('a[href*="/guides/01_intro"]'));
    this.sideBarAuthentication = element(by.css('a[href*="/guides/02_auth"]'));
    this.sideBarWhySap = element(by.css('a[href*="/guides/00_why_SAP_Ariba"]'));
};

ApiGuidePage.prototype = Object.create(BasePage.prototype);

ApiGuidePage.prototype.go = function () {
    var uri = this.baseUrl() + '/guides';
    browser.get(uri);
    browser.driver.wait(function () {
        return browser.driver.getTitle().then(function (title) {
            return "API Guides" === title;
        });
    }, 2000).then(function () {
        console.log("Testing on the API Guide page");
    });
};

module.exports = ApiGuidePage;
