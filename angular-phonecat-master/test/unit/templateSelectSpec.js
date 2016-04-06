/**
 * Created by Wendy Yu 2/27/16.
 */
/* Unit test for dropdown list
 Test case:
 1. Default view: test if default item has been selected. Check both module and view
 2. controller->view binding test: mock controller. Change in the controller should impact on view.
 3. view->controller binding test: change in the view should binding to module value change

 */

'use strict';

describe('Select', function () {
    var scope, formElement, select,$compile;
    beforeEach(function() {
       module('phonecatApp', function($provide, $controllerProvider) {
           $controllerProvider.register('PhoneListCtrl', function($scope) {
               $scope.data = {
                   orderProp: 'age',
                   selectOptions: [
                       {value: 'age', name: 'Newest'},
                       {value: 'name', name: 'Alphabetical'}
                   ]
               };
           });
       });
    });

    beforeEach(inject(function (_$compile_, _$rootScope_, $controller) {
        var $rootScope;
        var templateUrl = '/base' + '/app/partials/';
        var templateHtml = 'phone-list.html';

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $controller('PhoneListCtrl', {
            $scope: scope
        });
        var fullUrl = $.ajax(templateUrl + templateHtml, {async: false, cache: false}).responseText;
        formElement =  angular.element(fullUrl);
        select = formElement.find('select');
        $compile(formElement)(scope);
        scope.$digest();
    }));

    it('should have default item selected', function () {
        expect((scope.data.orderProp)).toEqual("age");
        expect(select.val()).toEqual("age");
        expect(select.prop("selectedIndex")).toEqual(0); //default selected item should be the first one according to ng-module default value
    })

    // controller -> view test
    it('should change to correspondingly item when ng-module change', function () {
        scope.$apply('data.orderProp = "name"');
        expect(select.val()).toEqual("name");
        expect(select.prop("selectedIndex")).toEqual(1);
    })

    // view -> controller test
    it('should change ng-module value when selecting an item', function () {
        select.val('name');
        select.triggerHandler('change');
        expect(select.prop("selectedIndex")).toEqual(1);
        expect(scope.data.orderProp).toEqual('name');

        select.val('age');
        select.triggerHandler('change');
        expect(select.prop("selectedIndex")).toEqual(0);
        expect(scope.data.orderProp).toEqual('age');
    })
})