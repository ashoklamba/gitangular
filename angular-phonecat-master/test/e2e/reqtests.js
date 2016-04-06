/**
 * Created by i835310 on 3/16/16.
 */
/**
 * Created by i851226 on 3/16/16.
 */
describe('Req automating test', function() {
    var result;
    var loginBtn = element(by.css('button'));

    beforeEach(function () {
        return browser.ignoreSynchronization = true;
    });

    it('Should open google page and test', function () {

        //first page
        browser.get('http://localhost:8000/app');
        element(by.name("username")).sendKeys('ariba');
        browser.driver.wait(function () {
            return loginBtn.isEnabled().then(function (result) {
                return result;
            });
        }, 2000).then(function() {
            loginBtn.click();
        });
    });

    it('req list: table data should come', function () {
        //2nd page
        browser.driver.wait(function () {
           return element(by.css('table')).isPresent().then(function (result) {
               return result;
           });
        }, 2000).then(function () {
            //DO STUFF ON PAGE

            var allrows = element.all(by.css('table > tbody > tr'));
            allrows.last().getText().then(function (lastElemText) {
                console.log("last " + lastElemText);
            });
            expect(allrows.first().getText()).toContain('PR10');
            expect(allrows.last().getText()).toContain('PR14');
            expect(allrows.count()).toBe(5);

            ////Now click to the Solutions link
            //var alllinks = element.all(by.css('a[href*="#/"]'));
            //alllinks.filter(function (elem) {
            //    return elem.getText().then(function (text) {
            //        return text === 'PR10';
            //    });
            //}).click();

        });
    });

    it('req list: should search', function () {
        //3rd page
        var allrows = element.all(by.css('table > tbody > tr'));
        var input = element(by.css('input'));

        browser.driver.wait(function () {
            input.sendKeys('PR12');
            return allrows.count().then(function (count) {
                if (count == 1) {
                    return true;
                }
                else {
                    input.clear().then(function() {
                        return false;
                    })
                }
            })
        }, 2000).then(function () {
            input.clear();
        })
    });

    it('req list: should have approve link', function () {
        var allrows = element.all(by.css('table > tbody > tr'));
        var input = element(by.css('input'));

        //3rd page
        browser.driver.wait(function () {
            return allrows.count().then(function (count) {
                return count == 5;
            })
        }, 2000).then(function () {
            //DO STUFF ON PAGE

            var alllinks = element.all(by.css('a[href*="javascript"]'));
            //approve all reqs
            alllinks.filter(function (elem) {
                return elem.getText().then(function (text) {
                    return text === 'approve';
                });
            }).click();
        });
    });


    xit('req list: should approve and show approved', function () {

        //3rd page

        browser.driver.wait(function () {
            return browser.driver.getTitle().then(function (title) {
                console.log(title);
                return found = "Requisition App" === title;
            });
        }, 2000).then(function () {
            //DO STUFF ON PAGE

           //this is harder to do since need to find sibling node
        });
    });

});
