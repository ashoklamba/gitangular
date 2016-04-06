/**
 * Created by wendy yu on 3/8/16.
 */
/* Unit test for info Tab

 Test case:
 1. Text show: test if correspondingly text is shown in view when tab is selected

 */

describe('Directive: infoPane', function () {
    var scope, infoElement;
    beforeEach(module('navi.directive'));

    beforeEach(inject(function (_$compile_, _$rootScope_, $controller) {
        var $compile, $rootScope;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        infoElement = angular.element('<info-tabs> ' +
            '<info-pane type="info"> ' +
            '<li>should show tutorial infomation. info tab show feature user story. test tab show test coverage and examples of tests. ' +
            '</li> ' +
            '</info-pane> ' +
            '<info-pane type="test"> ' +
            '<li>click on a tab should select the tab. Click the tab again, should de-select the tab</li> ' +
            '<li>When a tab is selected, corresponding information is shown in pane below.</li> ' +
            '<li>When a tab is selected, its font should be in bold and click icon should be expanded.' +
            'When a tab is de-selected, its font should not be in bold and click icon should not be expanded. ' +
            '</li> ' +
            '<li>At any given time, only one tab can be selected. ' +
            '</li> ' +
            '<li> ' +
            '<a href="https://docs.angularjs.org/guide/controller">click to see directive unit tests.</a> ' +
            '</li> ' +
            '</info-pane> ' +
            '</info-tabs>');

        $compile(infoElement)(scope);
        scope.$apply();
    }));

    it('should show correspondingly text when tab is selected', function () {
        var infoPane = infoElement.find('info-pane');

        // 1. Click First tab
        var clickFirstTab = infoElement.find('li').eq(0).find('a');
        clickFirstTab.triggerHandler('click');
        expect(clickFirstTab.scope().pane.selected).toEqual(true);

        var findFirstTab = false;
        for(var i=0; i<infoPane.length;i++){
            if(infoPane.eq(i).attr('type') == clickFirstTab.scope().pane.type){
                findFirstTab = true;
                expect(infoPane.eq(i).text()).toContain('should show tutorial infomation. info tab show feature user story.');
                break;
            }
        }

        if(!findFirstTab){
            expect('Text does not match').toBe('should show tutorial infomation. info tab' +
                ' show feature user story. ' +
                'test tab show test coverage and examples of tests.');
        }

        // 2. Click Second tab
        var clickSecondTab = infoElement.find('li').eq(1).find('a');
        clickSecondTab.triggerHandler('click');
        expect(clickSecondTab.scope().pane.selected).toEqual(true);

        var findSecondTab = 0;
        for(var j=0; j<infoPane.length;j++){
            if(infoPane.eq(j).attr('type') == clickSecondTab.scope().pane.type){
                findSecondTab = 1;
                expect(infoPane.eq(j).text()).toContain('click on a tab should select the tab');
                break;
            }
        }
        if(findSecondTab == 0){
            expect('Text does not match').toBe('click on a tab should select the tab. Click the tab again, should de-select the tab');
        }
    });

})