/**
 * Created by i851205 on 3/15/16.
 */
'use strict';

describe('data driven tabs',function(){

    var compile, scope, directiveElement,utilLib,element;
    beforeEach(module('phonecatApp'));
    beforeEach(module('util'));
    beforeEach(
        inject(function($compile,$rootScope,_utilLib_){
            scope = $rootScope.$new();
            compile = $compile;
            element = angular.element('<info-tabs></info-tabs>');
            utilLib=_utilLib_;
        }));

    function compileElement(){
        directiveElement = compile(element)(scope);
        scope.$digest();
    }

    it('0 pane should not register any pane to tabs ',function(){
        element.append(utilLib.addPanes(0));
        compileElement();
        var type = directiveElement.find('li');
        var pane = type.eq(0).find('a');
        expect(pane).not.toExist();
    });

    it('should register 500 panes to tabs',function(){
        element.append(utilLib.addPanes(500));
        compileElement();
        var type = directiveElement.find('li');
        var pane = type.eq(0).find('a');
        expect(pane).toExist();
        var parentScope = pane.scope().$parent;
        expect(parentScope.panes.length).toBe(500);
    })

});
