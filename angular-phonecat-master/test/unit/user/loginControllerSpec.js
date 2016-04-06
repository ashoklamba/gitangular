/**
 * Created by i835310 on 3/6/16.
 */
describe('user controllers', function() {
    beforeEach(module('userModule'));
    describe('LoginFormCtrl', function(){
        var scope, ctrl, userSvc;

        beforeEach(inject(function($rootScope, $controller, userService) {
            userService.clearCookie();
            userSvc = userService;
            scope = $rootScope.$new();
            ctrl = $controller;

        }));
        afterEach(inject(function(userService) {
            userService.clearCookie();
        }));

        it('should get no user initially', function() {
            ctrl('LoginFormCtrl', {
                $scope: scope,
                userService: userSvc
            });
            expect(userSvc.get().userName).toBe('');
        })

        it('should get set user after login', function() {
            ctrl('LoginFormCtrl', {
                $scope: scope,
                userService: userSvc
            });
            scope.user = {userName: 'ytang'};
            scope.login();
            expect(userSvc.get()).not.toBeNull();
            expect(userSvc.get().userName).toBe('ytang');
        })

        it('should get set user in cookie after login', function() {
            ctrl('LoginFormCtrl', {
                $scope: scope,
                userService: userSvc,
            });
            scope.user = {userName: 'ytang'};
            scope.login();
            expect(userSvc.getCookie()).not.toBeNull();
            expect(userSvc.getCookie()).toBe('ytang');
        })
    });

});
