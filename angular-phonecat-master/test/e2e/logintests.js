/**
 * Created by Wendy Yu on 3/17/16.
 */
describe('Widget automating test', function() {

    beforeEach(function () {
        return browser.ignoreSynchronization = true;
    });

    it('Should show link as invisible when clicking info tab', function () {
        browser.get('http://localhost:63342/angular14Test/angular-phonecat-master/app/index.html');

        var allInfo = element.all(by.css('a'));
        allInfo.first().click();
        //var infoLink = browser.driver.findElement(by.css('a[href*="https://docs.angularjs.org/guide/controller"]'));
        var infoLink =element(by.css('a[href*="https://docs.angularjs.org/guide/controller"]'));
        expect(infoLink.isDisplayed()).toBe(false);


        allInfo.filter(function (elem) {
            return elem.getText().then(function (text) {
                return text === 'test';
            });
        }).click().then(function () {
            console.log("found matching element! ");
            expect(infoLink.isDisplayed()).toBe(true);
        });
    });


    it('should show selected item', function(){
        browser.get('http://localhost:63342/angular14Test/angular-phonecat-master/app/index.html');
        var loginBtn = element(by.css('button'));
        element(by.name("username")).sendKeys('ariba');
        loginBtn.click();

        var phoneLink = element(by.css('a[href*="#/phones"]'));
        if(phoneLink.isPresent()){
            phoneLink.click();
        }

        var select = element(by.css('select'));

        element(by.cssContainingText('option', 'Alphabetical')).click();
        element(by.cssContainingText('option', 'Newest')).click();
        browser.driver.sleep(4000);

        expect(element(by.cssContainingText('option', 'Newest')).isSelected()).toBe(true);

    });

})