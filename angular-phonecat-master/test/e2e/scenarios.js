/**
 * Created by i835310 on 3/16/16.
 */
/**
 * Created by i851226 on 3/16/16.
 */
describe('Google automating test', function() {
    var result;

    beforeEach(function () {
        return browser.ignoreSynchronization = true;
    });

    it('Should open google page and test', function () {

        //first page
        browser.get('http://www.google.com');
        browser.driver.wait(function () {
            element(by.name("q")).sendKeys('ariba');
            element(by.name('btnG')).click();
            return true;
        }, 2000);
    });

    it('ariba search result should have ariba home page link and sub links', function () {
        //2nd page
        browser.driver.wait(function () {
            return browser.driver.getTitle().then(function (title) {
                console.log(title);
                return found = "ariba - Google Search" === title;
            });
        }, 2000).then(function () {
            //DO STUFF ON PAGE
            //use closure to process array in a loop
            //filter example below to find a Procurement link element
            //alllinks is declared but can be reused when actions are fired
            //https://angular.github.io/protractor/#/locators
            var alllinks = element.all(by.css('a[href*="http://www.ariba.com/"]'));
            alllinks.filter(function (elem) {
                return elem.getText().then(function (text) {
                    return text === 'Procurement';
                });
            }).getText().then(function (text) {
                console.log("found matching element! " + text);
            });

            //last & first & get(i) can allow you to return ElementFinder from an Array
            //then use expect, which works with Promise!

            //these also show that we can use the powerful getText() or other actions
            //in conjunctions with expect to assert elements in an array
            alllinks.last().getText().then(function (lastElemText) {
                console.log("last " + lastElemText);
            });

            expect(alllinks.first().getText()).toContain('Commerce');

            //Now click to the Solutions link
            alllinks.filter(function (elem) {
                return elem.getText().then(function (text) {
                    return text === 'Solutions';
                });
            }).click();
        });
    });

    it('collaborative page should have menus and side bars', function () {

        //3rd page
        browser.driver.wait(function () {
            return browser.driver.getTitle().then(function (title) {
                console.log(title);
                return found = "Collaborative Business Commerce Solutions for Better Commerce" === title;
            });
        }, 2000).then(function () {
            //DO STUFF ON PAGE

            //this page should have menu items like following
            var menu = element.all(by.css('.navbar-nav > li'));
            var expected = ['Solutions', 'For Suppliers', 'Resources', 'Customers', 'About', 'Help', 'Search', 'Log On'];
            for (var i = 0; i < menu.length; i++) {
                expect(menu.get(i).getText()).toEqual(expected[i]);
            }

            //should have 3 side bar sub menus
            expect(element.all(by.css('.sidebar-box > ul > li')).count()).toBe(3);
        });
    });

});