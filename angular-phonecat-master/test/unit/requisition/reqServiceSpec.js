/**
 * Created by i835310 on 3/8/16.
 */
describe('requisition service tests', function() {
    beforeEach(module('requisitionServiceModule'));
    beforeEach(module('userModule'));
    beforeEach(module('ngRoute'));
    beforeEach(module('ch.filters'));

    describe('requisitionService', function() {
        var reqSvc, httpBackend;
        var reqs = [];
        var reqListUrl, reqUrl;
        var username;

        beforeEach(inject(function(requisitionService, RequisitionConstant, ConfigConstants,
                                   _$httpBackend_, $filter) {
            reqSvc = requisitionService;
            httpBackend = _$httpBackend_;

            //mock return data
            reqs.push(RequisitionConstant.PR10);
            reqs.push(RequisitionConstant.PR11);
            reqs.push(RequisitionConstant.PR12);
            username = 'sap';

            //url
            reqListUrl = $filter('format')('{0}:{1}/mockbox/example/{2}/{3}/requisitions',
                ConfigConstants.url, ConfigConstants.port, ConfigConstants.version, username);
            reqUrl = $filter('format')('{0}/{1}', reqListUrl, "PR10");

            //all trained responses
            httpBackend.when('GET', reqListUrl).respond(200, reqs);
            httpBackend.when('GET', reqUrl).respond(200, RequisitionConstant.PR10);
        }));

        it('should load at least 5 requisitions', function () {
            httpBackend.expectGET(reqListUrl);
            var result = [];
            reqSvc.loadAllReqs(username).then(function(reqList) {
                result = reqList;
            });
            httpBackend.flush();
            console.log(result[0]);
            expect(result[0].id).toBe('PR10');
            expect(result.length).toBeGreaterThan(2);


        });

        it('should trigger PUT with new req as parameter when setReq is called and req ref is updated',
                inject(function (Requisition) {
            var req1;
            reqSvc.getRequisition('PR10').then(function(req) {
                expect(req.isApproved()).toBeFalsy();
                req1 = req;
            });
            httpBackend.flush();

            spyOn(Requisition.prototype, 'setData').and.callThrough();
            httpBackend.expectPUT(reqUrl, function(requestBody) {
                return requestBody == JSON.stringify(req1);
            }).respond(200, {});
            req1.approve();
            reqSvc.setReq(req1);
            httpBackend.flush();
            expect(Requisition.prototype.setData).toHaveBeenCalled();

            //calling get requisition retrieves the req reference and it's updated
            reqSvc.getRequisition('PR10').then(function(newReq) {
                expect(newReq.isApproved()).toBeTruthy();
                expect(newReq === req1).toBeTruthy();
            });
        }));

        afterEach(inject(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        }));
    });
})

