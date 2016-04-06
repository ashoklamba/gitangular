/**
 * Created by i835310 on 3/8/16.
 */
angular.module('requisitionControllerModule', ['requisitionServiceModule', 'userModule', 'ng'])
    .controller('RequisitionListCtrl', ['$scope', 'requisitionService', 'userService',
        function ($scope, requisitionService, userService) {
            $scope.user = userService.get();
            $scope.data = {
                orderProp: 'id',
                selectOptions: [
                    {value: 'status', name: 'Status'},
                    {value: 'title', name: 'Title'},
                    {value: 'id', name: 'Requisition ID'},
                ]
            };
            requisitionService.loadAllReqs().then(function(reqList) {
                $scope.requisitions = reqList;
            });
            $scope.approve = function (id) {
                var req;
                requisitionService.getRequisition(id, true).then(function(reqData) {
                    reqData.approve();
                    requisitionService.setReq(reqData);
                });
            }

            $scope.deny = function (id) {
                var req;
                requisitionService.getRequisition(id, true).then(function(reqData) {
                    reqData.deny();
                    requisitionService.setReq(reqData);
                });

            }

        }])
    .controller('RequisitionDetailCtrl', ['$scope', 'requisitionService', '$routeParams', 'userService', '$filter',
        function ($scope, requisitionService, $routeParams, userService, $filter) {
            var id = $routeParams.reqId;

            $scope.user = userService.get();

            requisitionService.getRequisition(id).then(function(reqData) {
                $scope.requisition = reqData;
            });

            requisitionService.getRequisitionLineItems(id).then(function(lineItemData){
                $scope.lineItems = lineItemData;
            });

            requisitionService.getRequisitionRecords(id).then(function(recordData){
                $scope.records = recordData;
            });

            $scope.getRequisitionComments = function () {
                requisitionService.getRequisitionComments(id).then(function(commentsData){
                    $scope.reqComments = commentsData;
                });
            }

            $scope.getAccountings = function (lineItem) {
                requisitionService.getAccountings(lineItem).then(function(accountingData) {
                    $scope.accountings = accountingData;
                });
            }

            $scope.getComments = function (lineItem) {
                requisitionService.getComments(lineItem).then(function(commentData) {
                    $scope.comments = commentData;
                });

            }

            //comments submit
            $scope.comment = {text: ''};
            $scope.submit = function() {
                if ($scope.comment.text) {
                    var now = new Date();
                    $scope.comment.id = $scope.reqComments.length;
                    $scope.comment.date = $filter('date')(now, 'medium');
                    $scope.comment.userId = $scope.user.userName;
                    $scope.comment.requisitionId = id;
                    $scope.comment.lineItemId = 0;
                    $scope.reqComments.push($scope.comment);
                    requisitionService.addComment($scope.comment);
                    $scope.comment = {text: ''};
                }
            };

            //view data to control modal
            $scope.showModal = false;
            $scope.toggleModal = function(){
                $scope.showModal = !$scope.showModal;
            };
        }]);