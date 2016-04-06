'use strict';

/* Directives */
angular.module('phonecatDirectives', [])
    .directive('phoneOption', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=data',
                id: '@', //todo can we bind more than one value using @?
                action: '&'

            },
            //todo: need to inject templateUrl for unit test. use template to make it easier for unit test
            //templateUrl: 'partials/phone-option.html',
            template: '<button class="btn-xs btn-primary" ng-click="action({x : data, y : id})">{{data.displayName}}</button>',

            controller: function ($scope) {
                //alert('XXX' + $scope.data.displayName);
            },


        };
    });


