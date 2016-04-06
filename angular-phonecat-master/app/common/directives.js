
/**
 * Created by i835310 on 3/6/16.
 */
angular.module('navi.directive', [])
    .directive('infoTabs', function() {
        var tabController = ['$scope', function($scope) {
            //alert('tabController');
            var panes = $scope.panes = [];
            $scope.clickIconToggle = function(pane) {
                if (pane.clickIcon === 'chevron_right') {
                    pane.clickIcon = 'expand_more';
                }
                else {
                    pane.clickIcon = 'chevron_right';
                }
            };

            $scope.toggle = function(pane) {
                angular.forEach(panes, function(p) {
                    if (p.id !== pane.id) {
                        if (p.selected) {
                            p.selected = false;
                        }
                        if (p.clickIcon === 'expand_more') {
                            p.clickIcon = 'chevron_right';
                        }
                    }
                })
                pane.selected = !pane.selected;
            };

            this.addPane = function(pane) {
                pane.clickIcon = 'chevron_right';
                pane.id = panes.length + 1;
                //pane.customizedSort = true;
                panes.push(pane);
            };

            this.sortPane = function(panes) {
                $scope.panes.reverse();

            }
        }];
        return {
            restrict: 'E',
            transclude: true,
            scope: {
         //       customizedSort : '@',
            },


            controller: tabController,
            //controller: ('$scope', function($scope) {

            template: '<br><span>' +
            '<ul class="pagination">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
            '<a ng-click="toggle(pane);clickIconToggle(pane)">' +
            '{{pane.type}}' +
            '<ng-md-icon icon="{{pane.clickIcon}}" style="fill: blue" size="16"></ng-md-icon>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '</span>' +
            '<span ng-transclude></span>'
        };
    })
    .directive('infoPane', function() {
        return {
            require: '^^infoTabs',
            restrict: 'E',
            transclude: true,
            scope: {
                id: '@',
                type: '@',
                clickIcon: '@',
                selected: '@',
                customizedSort: '@'
            },
            controller: ('$scope', function($scope) {
                $scope.selected = false;
                $scope.customizedSort = false;
            }),
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
                if(scope.customizedSort == true) {
                    tabsCtrl.sortPane(scope);
                }
            },

            template: '<span ng-show="selected" class="info">' +
            '<small><span ng-transclude></span></small>' +
            '</span>'
        };
    })
    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,

            // Wendy Todo: use transclude 'element' to make transclude more flexible
            //link: function postLink(scope, element, attrs, transclude) {
            //
            //    transclude(scope, function(clone){
            //        clone.requisition-images('background-color','red');
            //
            //        elem.after(clone);
            //    });

            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    });
