/**
 * Created by i851205 Priya on 2/26/16.
 */
'use strict';

describe('myTabs',function(){

    var compile, scope, directiveElement;
    beforeEach(module('phonecatApp'));

    beforeEach(
        inject(function($compile,$rootScope){
            scope = $rootScope.$new();
            compile = $compile;
            var element = angular.element('<info-tabs><info-pane></info-pane><info-pane></info-pane><info-pane></info-pane></info-tabs>');
            directiveElement = compile(element)(scope);
            scope.$digest();
        }));


    it('should register panes to tabs ',function(){
        var type = directiveElement.find('li');
        //Click the tab
        var anchorElement = type.eq(1).find('a');
        //Get the parent scope of the tab
        var parentScope = anchorElement.scope().$parent;
        expect(parentScope.panes.length).toBe(3);
    });

    it('should test active pane change on click of different pane ',function(){
        var type = directiveElement.find('li');
        var anchorElement = type.eq(1).find('a');
        anchorElement.triggerHandler("click");
        expect(type.eq(0)).not.toHaveClass('active');
        expect(type.eq(1)).toHaveClass("active");
        anchorElement.triggerHandler("click");
        expect(type.eq(1)).not.toHaveClass('active');
    });
});


describe('myPane',function(){

    var compile, scope, directiveElement,element;
    beforeEach(module('phonecatApp'));
    beforeEach(inject(function($compile,$rootScope){
            scope = $rootScope.$new();
            compile = $compile;
            element = angular.element (
                '<info-tabs>'+
                '<info-pane type="info">'+
                '<li>should allow to type text for free text search.</li>'+
                '</info-pane>'+
                '<info-pane type="test">'+
                '<li>'+
                'verify phone list is filtered by free text entered in the input box.'+
                '<a href="https://docs.angularjs.org/guide/controller">click to see protractor test.</a>'+
                '</li>'+
                '</info-pane>'+
                '</info-tabs>'
            );
            directiveElement =compile(element)(scope);
            scope.$digest();
        }));


   it('should have property type',function(){
       var types = directiveElement.find('li');
       var anchorElement = types.eq(1).find('a');
       expect(anchorElement.scope().pane.type).toBeDefined();

    });
});


