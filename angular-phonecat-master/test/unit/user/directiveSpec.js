/**
 * Created by Priay on 3/6/16.
 */
describe('user directives', function () {
    beforeEach(module('userModule'));
    describe('Directive:Logout',function(){

        beforeEach(module('userModule'));

        it('should clear the user and reset path to login on logout',inject(function($rootScope,$compile,_$location_,_userService_){
            var scope,compiledElement,element,userService,$location,originalLocation;
            element = angular.element('<log-out></log-out>');
            scope = $rootScope.$new();
            compiledElement= $compile(element)(scope);
            scope.$digest();
            spyOn(_$location_, 'path');
            var logout= compiledElement.find("a");
            logout.triggerHandler("click");
            expect(_$location_.path).toHaveBeenCalledWith('/login');
            expect(_userService_.get().userName).toBe('');
        }));

    });

})
