'use strict';

/* Controllers */
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'PhoneSummary',
  'phoneOptionService', '$location', '$route', 'userService',
  function($scope, Phone, PhoneSummary, phoneOptionService, $location, $route, userService) {
    $scope.username = userService.get().userName;
    $scope.phones = Phone.query({userName: $scope.username});
    $scope.data = {
      orderProp: 'age',
      selectOptions: [
      {value: 'age', name: 'Newest'},
      {value: 'name', name: 'Alphabetical'}
      ]
    };
    //$scope.defaultOption= {
    //  item: 'edit'
    //};
    $scope.phoneOptions = phoneOptionService.getOptions();

    $scope.selectItem = function (item, phoneId) {
      //we are using username from scope instead of passing username from direcitve scope. this
      //is because it doesn't work if both username and phoneid are passed to the directive using @
      var userName = $scope.username;
       //alert("Selected" + item.displayName);
      if ('edit' === item.value) {
        $location.path('/phones/update/' + phoneId);
      }
      else if ('delete' === item.value) {
        console.log(userName + ' do delete' + phoneId);
        PhoneSummary.delete({phoneId: phoneId, userName: userName}, function() {
          console.log("deleted successfully");
        }, function (err) {
          console.log("failed to be deleted");
          //todo: due to mockbox failure, the delete returns 500 even though the data are deleted
          $route.reload();
        });
      }
      else {
        alert('do nothing');
      }
    };

  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'PhoneDetail', 'phoneOptionService', 'userService',
  function($scope, $routeParams, PhoneDetail, phoneOptionService, userService) {
    $scope.username = userService.get().userName;
    $scope.phone = PhoneDetail.get({phoneId: $routeParams.phoneId, userName: $scope.username}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
    $scope.phoneOptions = phoneOptionService.getOptions();
    $scope.selectItem = function (item) {
      alert("Details: Selected "+ item.displayName);
    };
  }]);

phonecatControllers.controller('PhoneUpdateCtrl', ['$scope', '$routeParams', 'PhoneSummary', 'userService', '$location',
  function($scope, $routeParams, PhoneSummary, userService, $location) {
    $scope.username = userService.get().userName;
    $scope.phoneId = $routeParams.phoneId;
    $scope.locationService = $location;

    $scope.init = function () {
       PhoneSummary.get({phoneId: $scope.phoneId, userName: $scope.username}, function(phone) {$scope.phone = phone;
      });
    }

    $scope.update = function (phone, userName) {
      //todo issue a mockbox update request to update the phone
      PhoneSummary.update({phoneId: phone.id, userName: userName}, phone, function() {
        console.log("updated successfully");
        $scope.locationService.path('/phones')
      }, function (err) {
        console.log("failed to be updated");
        //todo: sometimes it returns 500 error
        $scope.locationService.path('/phones')
      });
    };

    $scope.init();
  }]);
