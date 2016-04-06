'use strict';

describe('phoneOption directives', function () {

    // load the directive's module by loading the entire app
   beforeEach(module('phonecatApp'));
    var element,
        scope

    beforeEach(function() {
        module('phonecatApp', function($provide, $controllerProvider) {
            $controllerProvider.register('PhoneListCtrl', function($scope) {
            });
        });
    });

    it('should compile and should show a button with text equal to data in scope', inject(function ($compile,$rootScope) {
        scope = $rootScope.$new();
        scope.item = {value: 'edit', displayName: 'Edit Phone'};
        scope.phone = {
            "age": '1',
            "id": "xyz",
            "hide": false,
            "imageUrl": "img/phones/motorola-xoom.0.jpg",
            "name": "MOTOROLA XOOM",
            "snippet": "nice MOTOROLA XOOM"
        };
        element  =  angular.element('<phone-option data="item" id="{{phone.id}}" ctrl="PhoneListCtrl" action="selectItem(x, y)"></phone-option>');
        element = $compile(element)(scope);
        scope.$digest();
        var buttonTxt = (element.find('button')).text();
        expect(buttonTxt).toBe("Edit Phone");
    }));

    it('should trigger calling selectItem with item and id parameters on click', inject (function($compile,$rootScope){
        element  =  angular.element('<phone-option data="item" id="{{phone.id}}" ctrl="PhoneListCtrl" action="selectItem(x, y)"></phone-option>');
        scope = $rootScope.$new();

        //define method to spy on
        scope.selectItem = function (item, id) {
        }
        //define arguments to pass to the spied method
        scope.item = {value: 'edit', displayName: 'Edit Phone'};
        scope.phone = {
            "age": '1',
            "id": "xyz",
            "hide": false,
            "imageUrl": "img/phones/motorola-xoom.0.jpg",
            "name": "MOTOROLA XOOM",
            "snippet": "nice MOTOROLA XOOM"
        };

        element = $compile(element)(scope);
        scope.$digest();

        var buttonElement = element.find("button");
        //we can't use createSpy on Jasmine because it doesn't allow to create a spy method with arguemtns directly on a class
        //instead, we use spyOn to spy the method on the scope
        spyOn(scope, 'selectItem');
        expect(scope.selectItem).not.toHaveBeenCalled();
        buttonElement.triggerHandler("click");
        expect(scope.selectItem).toHaveBeenCalled();
        expect(scope.selectItem).toHaveBeenCalledWith(scope.item, scope.phone.id);
    }));


});
