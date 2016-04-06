/**
 * Created by i835310 on 3/5/16.
 */
angular.module('loginControllerModule', ['userServiceModule'])
    .controller('LoginFormCtrl', ['$scope', '$location', 'userService',
        function ($scope, $location, userService) {
            //this is to simply view data binding
            $scope.user = userService.get();
            $scope.login = function () {
                userService.login($scope.user.userName);
                //todo validate passwords
                $location.path('/requisitions');
            };

        }]);
