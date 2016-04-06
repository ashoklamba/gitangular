/**
 * Created by i835310 on 3/16/16.
 */
/**
 * Created by i851226 on 3/16/16.
 */
describe('Angular drag drop test', function() {
    var result;

    beforeEach(function () {
        return browser.ignoreSynchronization = true;
    });

    it('Should go to directive page', function () {

        //first page
        browser.get('http://localhost:63342/angular-phonecat-master/app/dragAndDrop.html');
    });

    it('should be able to execute js', function() {

        browser.executeScript(function add(x, y) {
            return x+y;
        }, 1, 1).then(function(result) {
            expect(result).toBe(2);
        });
    });

    xit('should drag and drop', function() {
        var div = element(by.id('div1'))
        var drag = element(by.id('drag1'))

        expect(div.isPresent()).toBe(true)
        expect(drag.isPresent()).toBe(true)
        expect(div.getTagName()).toBe('div')
        expect(drag.getTagName()).toBe('img')

        expect(div.getInnerHtml()).toBe('')


         browser.actions()
         .mouseMove(drag.getWebElement(), {x: 0, y: 0})
         .mouseDown()
         .mouseMove(drag.getWebElement(), {x: 5, y: 5})
         .mouseMove(div.getWebElement())
         .mouseUp()
         .perform()

        //browser.actions().dragAndDrop(drag, {x: 0, y: 50}).perform()
            .then(function() {
            browser.driver.wait(function () {
                return div.getInnerHtml().then(function (html) {
                    return html != '';
                })
            }, 2000)
        })

        /*
         div.getLocation().then(function(divLocation) {
         browser.actions().dragAndDrop(drag, divLocation).perform()
         })
         */
        //finally verify that there should be inner html change
        expect(div.getInnerHtml()).not.toBe('')
    })

});