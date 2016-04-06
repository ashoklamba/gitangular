/**
 * Created by i851205 on 3/17/16.
 */

'use strict';

describe('modal window', function () {
    var scope, element,compiledElement;
    beforeEach(module('requisitionModule'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        var $compile, $rootScope;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        element = angular.element('<modal title="{{requisition.id}}: Line Item {{$index+1}} - {{lineItem.description}}" visible="showModal">'+
            '<p class="row">'+
            '<h4>Summary</h4>'+
            '</p>'+
            '<table class="table table-striped table-bordered">'+
            '<thead>'+
            '<tr>'+
            '<th>Id</th>'+
            '<th>Description</th>'+
            '<th>Justification</th>'+
            '<th>Amount</th>'+
            '<th>Quantity</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>{{ lineItem.id }}</td>'+
            '<td>{{ lineItem.description }}</td>'+
            '<td>{{ lineItem.justification }}</td>'+
            '<td>{{ lineItem.amount }}</td>'+
            '<td>{{ lineItem.quantity }}</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>'+
            '</modal>');
       scope.requisition =
       {
           "id": "PR12",
           "title": "Game pads or joy sticks",
           "totalCost": "$200",
           "submitDate": "Wed Mar 19 08:50:18 PDT 2015",
           "lastModified": "Wed Mar 19 08:50:18 PDT 2015",
           "requesterId": "aagassi",
           "approverId": "adavis",
           "status": "Denied"
       };
        scope.lineItem =
        {
            "id": 1,
            "description": "Samsung 60 inch TV with stand",
            "justification": "Demo our work on common TV",
            "amount": 20,
            "quantity":4
        }
        compiledElement=$compile(element)(scope);
        scope.$digest();
    }));

    it('should contain description in summary section of modal window',function(){
        var tbody = compiledElement.find('tbody');
        var tr = tbody.find('tr');
        var td = tr.find('td');
        expect(td.eq(1).text()).toEqual('Samsung 60 inch TV with stand');
    });
})