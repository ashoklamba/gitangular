/**
 * Created by i835310 on 3/6/16.
 */
angular.module('requisitionModelModule', [])
    .factory('Requisition', function () {
        function Requisition(reqData) {
            if (reqData) {
                this.setData(reqData);
            }
        };
        Requisition.prototype = {
            setData: function(reqData) {
                angular.extend(this, reqData);
            },
            isApproved: function() {
                return this.status === 'Approved';
            },

            approve: function() {
                //if (this.status === 'Submitted') {
                    this.status = 'Approved';
                //}
            },

            deny: function() {
                //if (this.status === 'Submitted') {
                    this.status = 'Denied';
                //}
            },

            getRequester: function() {
                //todo submit 2 http requests to get requester of the requisition by this.requesterId
                //requestions/id
                //requesters/req.requesterId
                //for now, mock it
                return {
                    "id": "cnoll",
                    "realm": "p2pTeSg-10",
                    "name": "Chad Noll",
                    "emailAddress": "cnoll@ariba.com",
                    "phone": "000-000-0001"
                }
            }
            //todo how do we model lineItems, comments?
        };
        return Requisition;
    })
    .constant('RequisitionConstant', {
        'PR10': {
            "id": "PR10",
            "title": "Small Computer Equipment",
            "totalCost": "$29.70",
            "submitDate": "Fri Mar 07 10:36:55 PST 2015",
            "lastModified": "Fri Mar 07 10:36:55 PST 2015",
            "requesterId": "cnoll",
            "approverId": "arooney",
            "status": "Submitted"
        },
        'PR11' : {
            "id": "PR11",
            "title": "Office Equipment and Accessories and Supplies",
            "totalCost": "$359.96",
            "submitDate": "Wed Mar 19 14:41:01 PDT 2015",
            "lastModified": "Wed Mar 19 14:41:01 PDT 2015",
            "requesterId": "cnoll",
            "approverId": "arooney",
            "status": "Approved"
        },
        'PR12' : {
            "id": "PR12",
            "title": "Game pads or joy sticks",
            "totalCost": "$200",
            "submitDate": "Wed Mar 19 08:50:18 PDT 2015",
            "lastModified": "Wed Mar 19 08:50:18 PDT 2015",
            "requesterId": "aagassi",
            "approverId": "adavis",
            "status": "Denied"
        },
        'cnoll' : {
            "id": "cnoll",
            "realm": "p2pTeSg-10",
            "name": "Chad Noll",
            "emailAddress": "cnoll@ariba.com",
            "phone": "000-000-0001"
        },
        'arooney' : {
            "id": "arooney",
            "realm": "p2pTeSg-10",
            "name": "Archie Rooney",
            "emailAddress": "arooney@ariba.com",
            "phone": "000-000-0002"
        },
        'PR10_LI_1' : {
            "id": "1",
            "requisitionId": "PR10",
            "description": "INTEGRATED KEYBOARD",
            "quantity" : "2",
            "amount" : "$20.00"
        },
        'PR10_LI_2' : {
            "id": "2",
            "requisitionId": "PR10",
            "description": "TRACKBALL OPAL",
            "quantity" : "1",
            "amount" : "$9.70"
        },
        'PR11_LI_1' : {
            "id": "3",
            "requisitionId": "PR11",
            "description": "Office Equipment and Accessories and Supplies",
            "quantity" : "4",
            "amount" : "$89.99"
        },
        'PR10_LI_1_ACT_1' : {
            "id": "1",
            "requisitionId": "PR10",
            "lineItemId": "1",
            "percentage": "50",
            "quantity" : "2",
            "amount" : "$10.00"
        },
        'PR10_LI_1_ACT_2' : {
            "id": "2",
            "requisitionId": "PR10",
            "lineItemId": "1",
            "percentage": "50",
            "quantity" : "2",
            "amount" : "$10.00"
        },
        'PR11_LI_1_ACT_1' : {
            "id": "3",
            "requisitionId": "PR11",
            "lineItemId": "3",
            "percentage": "100",
            "quantity" : "4",
            "amount" : "$359.96"
        },
        'PR10_LI_1_CMT_1' : {
            "id": "1",
            "text": "Approve INTEGRATED KEYBOARD",
            "requisitionId": "PR10",
            "date" : "Fri Mar 07 10:36:55 PST 2015",
            "lineItemId" : "1",
            "userId": "cnoll"
        },
        'PR10_LI_2_CMT_2' : {
            "id": "2",
            "text": "Approve TRACKBALL OPAL",
            "requisitionId": "PR10",
            "date" : "Fri Mar 07 10:36:55 PST 2015",
            "lineItemId" : "2",
            "userId": "cnoll"
        },
        'PR11_LI_3_CMT_3' : {
            "id": "3",
            "text": "PR11 submitted for approval .. Approve soon.",
            "requisitionId": "PR11",
            "date" : "Wed Mar 19 15:01:01 PDT 2015",
            "lineItemId" : "3",
            "userId": "cnoll"
        },
        'PR11_LI_3_CMT_4' : {
            "id": "4",
            "text": "PR11 Approved.",
            "requisitionId": "PR11",
            "date" : "Wed Mar 19 17:01:01 PDT 2015",
            "lineItemId" : "3",
            "userId": "arooney"
        },
        'PR12_LI_4_CMT_5' : {
            "id": "5",
            "text": "PR12 submitted..Approve",
            "requisitionId": "PR12",
            "date" : "Wed Mar 19 08:50:18 PDT 2015",
            "lineItemId" : "4",
            "userId": "aagassi"
        },
        'PR12_LI_4_CMT_6' : {
            "id": "6",
            "text": "PR12 for gaming updated",
            "requisitionId": "PR12",
            "date" : "Wed Mar 19 08:50:18 PDT 2015",
            "lineItemId" : "4",
            "userId": "aagassi"
        },
        'PR12_LI_4_CMT_7' : {
            "id": "7",
            "text": "PR12 more updates",
            "requisitionId": "PR12",
            "date" : "Wed Mar 19 08:50:18 PDT 2015",
            "lineItemId" : "4",
            "userId": "aagassi"
        },
        'PR12_LI_5_CMT_8' : {
            "id": "8",
            "text": "PR12 game time",
            "requisitionId": "PR12",
            "date" : "Wed Mar 19 08:50:18 PDT 2015",
            "lineItemId" : "5",
            "userId": "aagassi"
        },
        'PR12_LI_5_CMT_9' : {
            "id": "9",
            "text": "PR12 budget exceeded for quarter",
            "requisitionId": "PR12",
            "date" : "Wed Mar 19 08:50:18 PDT 2015",
            "lineItemId" : "5",
            "userId": "adavis"
        },
        'PR12_LI_5_CMT_10' : {
            "id": "10",
            "text": "PR12 denied",
            "requisitionId": "PR12",
            "date" : "Wed Mar 19 08:50:18 PDT 2015",
            "lineItemId" : "5",
            "userId": "adavis"
        },
        'PR13_LI_6_CMT_11' : {
            "id": "11",
            "text": "PR13 new requisition",
            "requisitionId": "PR13",
            "date" : "Wed Mar 18 18:50:18 PDT 2015",
            "lineItemId" : "6",
            "userId": "aagassi"
        }

    });