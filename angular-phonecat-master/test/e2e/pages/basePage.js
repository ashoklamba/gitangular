/**
 * Created by i835310 on 3/24/16.
 */
//Follow below style guide
//https://github.com/CarmenPopoviciu/protractor-styleguide/blob/master/README.md
var BasePage = function () {
};

BasePage.prototype.baseUrl = function () {
    return  "http://mo-9deec2c01.mo.sap.corp:8888";
};

BasePage.prototype.openAPIExplorerWithLogin = function () {
    //todo common action login, logout
    var signInLink = element(by.css('a[href*="/login"]'));
    var apiExplorerLink = element(by.css('a[href*="/apis"]'));
    signInLink.click();
    browser.driver.wait(function () {
        return browser.driver.getTitle().then(function (title) {
            console.log(title);
            return "Login" === title;
        });
    }, 2000).then(function () {
        expect(element(by.name('username')).getAttribute('placeholder')).toEqual('User Name');
        expect(element(by.name('password')).getAttribute('placeholder')).toEqual('Password');
        expect(element(by.css('input[value="Login"]')).isPresent()).toBeTruthy();
        element(by.name('username')).sendKeys("mangesh");
        element(by.name('password')).sendKeys("12345");
        element(by.css('input[value="Login"]')).click();
        expect(element(by.css('.btn.btn-primary.app-button')).getText()).toEqual("Create a new App");
    });
    apiExplorerLink.click();
    browser.driver.wait(function () {
        return browser.driver.getTitle().then(function (title) {
            return found = "API Explorer" === title;
        });
    }, 2000);
};

BasePage.prototype.openAPIGuideWithLogin = function() {
    var signInLink = element(by.css('a[href*="/login"]'));
    var apiGuideLink = element(by.css('a[href*="/guides"]'));
    signInLink.click();
    browser.driver.wait(function () {
        return browser.driver.getTitle().then(function (title) {
            console.log(title);
            return found = "Login" === title;
        });
    }, 2000).then(function(){
        expect(element(by.name('username')).getAttribute('placeholder')).toEqual('User Name');
        expect(element(by.name('password')).getAttribute('placeholder')).toEqual('Password');
        expect(element(by.css('input[value="Login"]')).isPresent()).toBeTruthy();
        element(by.name('username')).sendKeys("mangesh");
        element(by.name('password')).sendKeys("12345");
        element(by.css('input[value="Login"]')).click();
        expect(element(by.css('.btn.btn-primary.app-button')).getText()).toEqual("Create a new App");
    });
    apiGuideLink.click();
    browser.driver.wait(function () {
        return browser.driver.getTitle().then(function (title) {
            console.log(title);
            return found = "API Guides" === title;
        });
    }, 2000).then(function() {
        expect(element(by.css('a[href*="/guides/01_intro"]')).getText()).toEqual('Quick Start Guide');
        expect(element(by.css('a[href*="/guides/02_auth"]')).getText()).toEqual('Authentication');
        expect(element(by.css('a[href*="/guides/00_why_SAP_Ariba"]')).getText()).toEqual('Why SAP Ariba');

        //checks the active tab
        var activeElem = element(by.css('.active'));
        expect(activeElem.getText()).toEqual('API Guides');
    });
};

BasePage.prototype.logout = function () {
    element(by.css('a[href*="/logout"]')).click();
};

module.exports = BasePage;
