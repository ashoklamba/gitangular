/**
 * Created by i835310 on 3/7/16.
 */
describe('requisition model tests', function() {
    beforeEach(module('requisitionModelModule'));

    describe('RequisitionModel', function() {
        var req;
        beforeEach(inject(function(Requisition) {
            req = new Requisition(
                {
                    "id": "PR10",
                    "title": "Small Computer Equipment",
                    "totalCost": "$29.70",
                    "submitDate": "Fri Mar 07 10:36:55 PST 2015",
                    "lastModified": "Fri Mar 07 10:36:55 PST 2015",
                    "requesterId": "cnoll",
                    "approverId": "arooney",
                    "status": "Submitted"
                }
            );
        }));

        it('should be approved when status is approved', inject(function (Requisition) {

            expect(req.isApproved()).toBeFalsy();
            req.status = 'Approved';
            expect(req.isApproved()).toBeTruthy();
        }));

        it('should have 1 requester cnoll', inject(function (Requisition) {

            expect(req.getRequester().id).toBe('cnoll');
        }))

    });
})
