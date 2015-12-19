// Contrived class to show ES6 support
class Helpers {

    verifyHeaderElementText(headerType, headerText) {
        it('should verify the text of a header element', () => {
            var typeOfHeader = element(by.css(headerType));
            expect(typeOfHeader.getText()).toEqual(headerText);
        });
    }

}

describe('todo homepage', () => {

    var helpers = new Helpers();

    beforeEach(function() {
        browser.get('/');
    });

    helpers.verifyHeaderElementText('h1', 'Index.html');

});
