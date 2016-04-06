'use strict';

describe('service', function() {

    // load modules
    beforeEach(module('phonecatApp'));

    // Test service availability
    it('check the existence of Phone factory', inject(function(Phone, PhoneDetail, PhoneSummary) {
        expect(Phone).toBeDefined();
        expect(PhoneDetail).toBeDefined();
        expect(PhoneSummary).toBeDefined();

    }));

    // Test service availability
    it('check the existence of PhoneSummary factory', inject(function(PhoneSummary) {
        expect(PhoneSummary).toBeDefined();
    }));

});