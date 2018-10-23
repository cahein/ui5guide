describe("Address entity object", function() {
    beforeAll(function() {
        oum.do.addresses.addData(oum.fixture.addressesData, true);
    });
    it ("should return the name for an Address", function() {
        const addressData = oum.fixture.addressesData[0];
        const addressName = addressData.firstname + " " + addressData.lastname;
        
        const address = new oum.do.Address(addressData.id);
        expect(typeof address.getName === "function").toBe(true);
        expect(address.getName()).toEqual(addressName);
    });
});
