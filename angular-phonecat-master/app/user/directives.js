/**
 * Created by i835310 on 3/6/16.
 */
angular.module('user.directives', ['userServiceModule'])
    .directive('logOut', function () {
        return {
            restrict: 'E',
            scope: {
            },
            controller: ('$scope', 'userService', function($scope, userService) {
                $scope.logout = function() {
                    userService.logout();
                }
            }),
            template: '&emsp;<a href="" ng-click="logout()" target="_self"><small>Log Out</small></a>'
        };
    })
    .directive('userProfile', function () {
        return {
            restrict: 'E',
            scope: {
            },
            controller: ('$scope', 'userService', function($scope, userService) {
                var user = userService.get();
                $scope.userName = user.userName;
                $scope.orgName = user.organization;
            }),
            template: '<small>Welcome {{userName}} @ {{orgName}}</small>'
        };
    })

