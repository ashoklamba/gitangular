/**
 * Created by i851226 on 3/25/16.
 */
//var webdriver = require('/Users/i851226/WebstormProjects/angularPhoneApp/angular-phonecat-master/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver/webdriver.js');

describe('e2e test for forms', function () {
    beforeEach(function () {
        return browser.ignoreSynchronization = true;
    });
    var formName = 'new form name 4';
    it('draft form e2e test', function() {
//        browser.get("http://localhost:3000/authoring.html");
        browser.get(browser.baseUrl);
        expect(element(by.id('blank-template-link')).getText()).toEqual("Blank Templates");

        var superFormLink = element.all(by.css('.list-group-item')).get(5);
        var blankTemplateLink = element(by.id('blank-template-link'));
        blankTemplateLink.click();
        element(by.css('h3[data-property="Title"]')).click();
        //browser.pause();
        element(by.css('.form-control.widget-property.input-label')).clear();
        element(by.css('.form-control.widget-property.input-label')).sendKeys(formName);

        //webdriver.ActionSequence.prototype.dragAndDrop = function(element, location) {
        //    return this.mouseDown(element).mouseMove(location).mouseUp();
        //};
        //browser.actions().dragAndDrop(element(by.id('widget-icon-0')), element(by.css('.col-md-12.canvas-column.ui-sortable'))).perform();

        //drags and drops the text and data source chooser widget
        browser.actions().dragAndDrop(element(by.id('widget-icon-0')),element(by.css('.col-md-12.canvas-column.ui-sortable'))).mouseUp().perform();
        element(by.css('.form-control.widget-property.input-label')).clear();
        element(by.css('.form-control.widget-property.input-label')).sendKeys('new text field yay:');


        browser.actions().dragAndDrop(element(by.id('widget-icon-3')),element(by.css('.col-md-4.canvas-column.ui-sortable'))).mouseUp().perform();
        element(by.css('.form-control.widget-property.input-label')).clear();
        element(by.css('.form-control.widget-property.input-label')).sendKeys('new data source chooser yay:');

        var layoutsTab = element(by.css('a[href*="#layouts-tab"]'));
        layoutsTab.click();
        //browser.actions().dragAndDrop(element(by.id('layout-icon-0')),element(by.css('.col-md-12.canvas-column.ui-sortable'))).mouseUp().perform();
        //browser.actions().mouseDown(element(by.id('layout-icon-0'))).mouseMove(element(by.css('.panel-body.canvas.ui-sortable'), {x: 1220, y: 1090})).mouseUp().perform();
        //browser.actions().dragAndDrop(element(by.id('layout-icon-0')), {x: 560, y: 610}).mouseUp().perform();

        //browser.actions().
        //mouseMove(element(by.id('layout-icon-0')).getWebElement()).
        //mouseDown().
        //mouseMove(element(by.css('.panel-body.canvas.ui-sortable').getWebElement()),{x: 560, y: 610}).
        //mouseUp().
        //perform();

        //browser.pause();

        //superFormLink.click();
        //superFormLink.getText().then(function(text) {
        //    console.log(text);
        //})
        //browser.pause();
        //element(by.css('.form-control.widget-property.input-label')).sendKeys("hello");



//        element(by.css('input[value="Punisher:"]')).sendKeys("New C")
        expect(element(by.id('click-next')).getText()).toEqual("Next");

        element(by.id('click-next')).click();
  //      expect(element(by.id('addNextApprover')).getText()).toEqual('xx');
  //      element(by.css('.icon-add.add-layout')).click();
  //      element('input[placeholder="Add an approver"]').sendKeys("AP Manager\n");
        //browser.pause();
        browser.driver.wait(function () {
            return element(by.css('.approver-heading')).getText().then(function (text) {
                console.log(text);
                return "Add Approver" === text;
            });
        }, 2000).then(function() {
            console.log('xx');
            var nextBtn = element(by.css('.btn.btn-primary.btn-create'));
            nextBtn.getText().then(function (text) {
                console.log(text);
                expect(text).toBe("Next");
                nextBtn.click();
                element.all(by.css('.slide-label')).get(2).click();
                //browser.pause();
                browser.driver.wait(function() {
                    var approveBtn = element(by.id('click-approve'));
                    return approveBtn.isPresent().then(function (result) {
                        return result;
                    });
                }, 2000).then(function() {
                    console.log("Done");
                })
            });
        })


        element(by.id('saveButton')).click();
        browser.get(browser.baseUrl);
        browser.driver.wait(function() {
            return element.all(by.css('.list-group-item-draft')).last().getText().then(function(text) {
                return text === formName;
            })
        })
        //expect(element.all(by.css('.list-group-item-draft')).last().getText()).toEqual(formName);

        //var closeButton = element(by.css('.close'));
        //var EC = protractor.ExpectedConditions;
        //browser.wait(function() {
        //    EC.visibilityOf(closeButton)}, 2000).then(function() {
        //    closeButton.click();
        //});


        //browser.pause();


        //browser.driver.wait(function () {
        //
        //}, 2000).then(function() {
        //    console.log('xx');
        //})


        //element(by.css('h3.approver-heading')).getText().then(function(text) {
        //    console.log(text);
        //})
        //expect(element(by.css('h3.approver-heading')).getText()).toEqual("xx");
        //browser.pause();
        //browser.actions().mouseDown(element(by.id('click-next'))).mouseUp().perform();

        //expect(element(by.id('Super_form_f79a9a14-76db-834a-6c0a-d2a776c40e50')).getText()).toEqual('new');

      //  browser.pause();
    });

    //it('E2E with adding an approver to the flow')
});