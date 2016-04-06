/**
 * Created by i835310 on 3/2/16.
 */
/*
 phonecatControllers.controller("DummyCtrl", ['$scope', function ($scope) {
 $scope.result = 'un_defined_val';
 $scope.rockOn = function(id)
 {
 $scope.result = id + id;
 console.log("XXXXXXXXXrock onXXXXXXX" + "result " + $scope.result);
 }
 }]
 );
 */

/*
 .directive('zippy', function()
 {
 return {
 restrict : "E",
 name: 'ctrl',
 controller: '@',
 // replace: true,
 template:"<div ><h1>Header</h1><button ng-click='rockOn()'>Click me {{data.val}}</button></div>",
 }
 })
 .directive('zippy2', function()
 {
 return {
 restrict : "E",
 name: 'ctrl',
 controller: '@',
 scope : {
 id : '@',
 rockOn: '&'
 },
 // replace: true,
 template:"<div ><h1>Header</h1><button id={{id}} ng-click='rockOn(id)'>Click me {{id}}</button></div>",
 }
 })
 .directive('zippy3', function()
 {
 return {
 restrict : "E",
 scope : {
 id : '@',
 rockOn: '&'
 },
 // replace: true,
 template:"<div ><h1>Header</h1><button id={{id}} ng-click='rockOn()'>Click me {{id}}</button></div>",
 controller :  ['$scope', function(scope) {
 scope.rockOn = function () {
 scope.$parent.rockOn(scope.id);
 };
 }]
 }
 });
 */

//describe("zippy",function() {
//
//    var element;
//    var scope;
//    var ctrl;
//    var mockDummyCtrl;
//
//    //beforeEach(module('phonecatApp'))
//    beforeEach(function() {
//       module('phonecatApp', function($provide, $controllerProvider) {
//           $controllerProvider.register('PhoneListCtrl', function($scope) {
//               //$scope.rockOn = function()
//               //{
//               //    console.log("ZZZZZrock onZZZZZ");
//               //};
//               //
//               //$scope.id = "xyz";
//           });
//       });
//    });
//
//    describe("button click by passing to directive a controller dynamically", function () {
//        beforeEach(inject(function ($compile, $rootScope) {
//            scope = $rootScope.$new();
//            var elem = angular.element('<zippy ctrl="DummyCtrl"></zippy>');
//            element = $compile(elem)(scope);
//            scope.$digest();
//            var val=angular.mock.dump(scope);
//            console.log("1" + val);
//            val=angular.mock.dump(element);
//            console.log("2" + val);
//            //ctrl = element.controller("zippy");  this only works when you attach the instance of the controller instead of via $scope
//
//        }));
//        it("should click on ctrl on ", function () {
//
//            //ctrl.rockOn= jasmine.createSpy();
//            scope.rockOn= jasmine.createSpy();
//            var button = element.find("button");
//            button.triggerHandler("click");
//            expect(scope.rockOn).toHaveBeenCalled();
//        })
//    })
//
//    describe("button click by using directive scope and mock the controller", function () {
//        beforeEach(inject(function ($compile, $rootScope, $controller) {
//            scope = $rootScope.$new();
//            scope.id = "outside_a";
//            var val=angular.mock.dump(scope);
//            console.log("0" + val);
//
//            mockDummyCtrl = $controller('DummyCtrl', {
//                $scope: scope
//            });
//           // var elem = angular.element('<zippy2 ctrl="DummyCtrl" id="a" rockOn="rockOn()"></zippy2>');
//            var elemStr= '<div ng-controller="DummyCtrl">' +
//                            '<zippy3 id="a" rockOn="rockOn()"></zippy3>' +
//                          '</div>'
//            var elem = angular.element(elemStr);
//            element = $compile(elem)(scope);
//            scope.$digest();
//
//
//            val=angular.mock.dump(element.scope().rockOn);
//            console.log("1" + val);
//            val=angular.mock.dump(element);
//            console.log("2" + val);
//            val=angular.mock.dump(scope);
//            console.log("3" + val);
//            val=angular.mock.dump(element.scope());
//            console.log("4" + val);
//
//            //elem = angular.element('<zippy2 ctrl="DummyCtrl" id="b" rockOn="rockOn(id)"></zippy2>');
//            //element = $compile(elem)(scope);
//            //scope.$digest();
//            //val=angular.mock.dump(scope);
//            //console.log("3.b" + val);
//            //val=angular.mock.dump(element.scope());
//            //console.log("4.b" + val);
//            ctrl = element.controller("zippy2")
//            val=angular.mock.dump(ctrl);
//            console.log("6" + val);
//
//
//        }));
//        it("should click on rockon ", function () {
//            //ctrl.rockOn= jasmine.createSpy();
//            //jasmine.spyOn();
//            var button = element.find("button");
//            //val=angular.mock.dump(button.scope().rockOn);
//            //console.log("7" + val);
//
//
//            //button.scope().rockOn = jasmine.createSpy();
//            button.triggerHandler("click");
//
//            val=angular.mock.dump(button.scope());
//            console.log("8" + val);
//            val=angular.mock.dump(scope);
//            console.log("9" + val);
//            //
//            expect(button.scope().$parent.result).toBe("aa"); //is there a way to spy and give an implementation?
//           // expect(button.scope().rockOn).toHaveBeenCalled();
//        })
//    })
//});