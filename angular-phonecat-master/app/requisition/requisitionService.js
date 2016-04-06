/**
 * Created by i835310 on 3/8/16.
 */
angular.module('requisitionServiceModule', ['ch.filters', 'requisitionModelModule', 'spockConstants'])
    .factory('requisitionService', ['$http', '$q', 'Requisition', 'RequisitionConstant','$filter',
        'ConfigConstants', function ($http, $q, Requisition, RequisitionConstant, $filter, ConfigConstants) {
        var service = {};
        var _pool = {};
        //all req apis work on a single schema named sap to allow multipe users to share same set of data
        var _orgName = 'sap';

        _retrieveInstance = function (reqId, reqData) {
            var instance = _pool[reqId];

            if (instance) {
                instance.setData(reqData);
            } else {
                instance = new Requisition(reqData);
                _pool[reqId] = instance;
            }
            return instance;
        }

        _search = function (reqId) {
            return _pool[reqId];
        }

         _loadReq = function (reqId, deferred) {
            var reqUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqId);
            $http.get(reqUrl)
                .success(function(reqData) {
                    var req = _retrieveInstance(reqId, reqData);
                    deferred.resolve(req);
                })
                .error(function() {
                    deferred.reject();
                });
        }

        /* Public Methods */
        //GET mockbox/example/v0.1/developer1/requisitions/{reqId}
        service.getRequisition = function (reqId, newInstance) {
            var deferred = $q.defer();
            var req = _search(reqId);
            if (req) {
                console.log("CACHE HIT FOUND REQ " + req.id + " return new instance " + newInstance);
                var result = newInstance ? new Requisition(req) : req;
                deferred.resolve(result);
            } else {
                _loadReq(reqId, deferred);
            }
            return deferred.promise;
        }

        //GET mockbox/example/v0.1/developer1/requisitions/{reqId}/lineItems
        service.getRequisitionLineItems = function (reqId) {
            var lineItemsUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}/lineItems',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqId);
            var deferred = $q.defer();
            $http.get(lineItemsUrl)
                .success(function(liArray) {
                    var lineItems = [];
                    liArray.forEach(function(liData) {
                        var li = _retrieveInstance(liData.id, liData);
                        lineItems.push(li);
                    });

                    deferred.resolve(lineItems);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }

        //GET mockbox/example/v0.1/developer1/requisitions/{reqId}/comments
        service.getRequisitionComments = function (reqId) {
            var commentsUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}/comments',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqId);
            var deferred = $q.defer();
            $http.get(commentsUrl)
                .success(function(commentArray) {
                    var comments = [];
                    commentArray.forEach(function(commentData) {
                        var comment = _retrieveInstance(commentData.id, commentData);
                        comments.push(comment);
                    });

                    deferred.resolve(comments);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }

        service.addComment = function (comment) {
            var commentsUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/comments',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName);
            var deferred = $q.defer();
            $http.post(commentsUrl, comment)
                .success(function(newComment) {
                    deferred.resolve(newComment);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }

        service.getRequisitionRecords = function (reqId) {
            var recordUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}/records',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqId);
            var deferred = $q.defer();
            $http.get(recordUrl)
                .success(function(recordArray) {
                    var records = [];
                    recordArray.forEach(function(recData) {
                        var rec = _retrieveInstance(recData.id, recData);
                        records.push(rec);
                    });

                    deferred.resolve(records);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }

        // GET mockbox/example/v0.1/developer1/requisitions/{lineItem.requisitionId}/lineItems/{lineItem.id}/accountings
        service.getAccountings = function (lineItem) {
            var lineItemId = lineItem.id;
            var reqId = lineItem.requisitionId
            var accountingUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}/lineItems/{5}/accountings',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqId, lineItemId);
            var deferred = $q.defer();
            $http.get(accountingUrl)
                .success(function(acctArray) {
                    var accountings = [];
                    acctArray.forEach(function(accountingData) {
                        var accounting = _retrieveInstance(accountingData.id, accountingData);
                        accountings.push(accounting);
                    });

                    deferred.resolve(accountings);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }


        //GET mockbox/example/v0.1/developer1/requisitions
        service.loadAllReqs = function () {
            var reqListUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName);
            var deferred = $q.defer();
            $http.get(reqListUrl)
                .success(function(reqArray) {
                    var reqs = [];
                    reqArray.forEach(function(reqData) {
                        var req = _retrieveInstance(reqData.id, reqData);
                        reqs.push(req);
                    });

                    deferred.resolve(reqs);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }

        //PUT mockbox/example/v0.1/developer1/requisitions/{reqId}
        service.setReq = function (reqData) {
            var reqUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqData.id);
            $http.put(reqUrl, reqData)
                .success(function (newReqData) {
                    //ytang for some reason, put request returns an old data back
                    var req = _search(reqData.id);
                    if (req) {
                        req.setData(reqData);
                    }
                    else {
                        console.warn("req service lost the req. add it back");
                        req = _retrieveInstance(req);
                    }
                    return req;
                })
                .error(function () {
                    alert("Failed to update " + reqData); //todo handle error
                    return null;
                });
        }

        service.getComments = function (lineItem) {
            var lineItemId = lineItem.id;
            var reqId = lineItem.requisitionId
            var commentUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions/{4}/lineItems/{5}/comments',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, _orgName, reqId, lineItemId);
            var deferred = $q.defer();
            $http.get(commentUrl)
                .success(function(commentArray) {
                    var comments = [];
                    commentArray.forEach(function(commentData) {
                        var comment = _retrieveInstance(commentData.id, commentData);
                        comments.push(comment);
                    });

                    deferred.resolve(comments);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }

        return service;

    }])


