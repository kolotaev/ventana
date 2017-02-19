
require('../src/client.js');

var SugarTest = {};

(function(test) {

    test.storage = {};
    test.keyValueStore = {
        set: function(key, value) {
            test.storage[key] = value;
        },
        get: function(key) {
            return test.storage[key];
        },
        cut: function(key) {
            delete test.storage[key];
        },
    };

    test.waitFlag = false;
    test.wait = function() { waitsFor(function() { return test.waitFlag; }); };
    test.resetWaitFlag = function() { this.waitFlag = false; };
    test.setWaitFlag = function() { this.waitFlag = true; };
    test.dispose = function() {
        if (this.server && this.server.restore) this.server.restore();
    };

}(SugarTest));

beforeEach(function(){
    SugarTest.storage = {};
    SugarTest.resetWaitFlag();
});

afterEach(function() {
    SugarTest.dispose();
});

window.SugarTest = SugarTest;

var testsContext = require.context('./', true, /client\.js/);
testsContext.keys().forEach(testsContext);