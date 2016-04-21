var assert = require('chai').assert;

var calc = require('./calc.js');

function strLatLng(latLng) {
    return '('+latLng.lat+','+latLng.lng+')';
}

describe('calc', function() {

    it('must be defined', function() {
        assert.isDefined(calc);
    });

    describe('calc.distance', function() {

        it('must be defined', function() {
            assert.isDefined(calc.distance);
        });

        var tests = [
            {
                a: {lat: 0, lng: 1},
                b: {lat: 1, lng: 1},
                expectedDistance: 1
            },
            {
                a: {lat: 0, lng: 0},
                b: {lat: 0, lng:-1},
                expectedDistance: 1
            },
            {
                a: {lat: 0, lng: 0},
                b: {lat: 1, lng: 1},
                expectedDistance: Math.sqrt(2)
            }
        ];

        tests.forEach(function(test) {
            it('must return '+test.expectedDistance+' given '+strLatLng(test.a)+' and '+strLatLng(test.b), function() {
                assert.strictEqual(calc.distance(test.a, test.b), test.expectedDistance);
            });
        });
    });

    describe('calc.geometricDegreesToGeographic', function() {

        it('must be defined', function() {
            assert.isDefined(calc.geometricDegreesToGeographic);
        });

        var tests = [
            {
                expected: 90,
                given: 0
            },
            {
                expected: 0,
                given: 90
            },
            {
                expected: 270,
                given: 180
            },
            {
                expected: 180,
                given: 270
            },
            {
                expected: 90,
                given: 360
            },
        ];

        tests.forEach(function(test) {
            it('must return '+test.expected+' given '+test.given, function() {
                assert.strictEqual(calc.geometricDegreesToGeographic(test.given), test.expected);
            });
        });
    });

    describe('calc.heading', function() {

        it('must be defined', function() {
            assert.isDefined(calc.heading);
        });

        tests = [
            {
                a: {lat: 1, lng: 1},
                b: {lat: 0, lng: 1},
                expectedHeading: 180
            },
            {
                a: {lat: 0, lng: 1},
                b: {lat: 1, lng: 1},
                expectedHeading: 0
            },
            {
                a: {lat: 1, lng: 2},
                b: {lat: 1, lng: 0},
                expectedHeading: 270
            }
        ]

        tests.forEach(function(test) {
            it('must return '+test.expectedHeading+' given '+strLatLng(test.a)+' and '+strLatLng(test.b), function() {
                assert.strictEqual(calc.heading(test.a, test.b), test.expectedHeading);
            });
        });
    });

    describe('calc.pad', function() {

        it('must be defined', function() {
            assert.isDefined(calc.pad);
        });

        var tests = [
            {
                num: 90,
                digits: 3,
                expected: '090'
            },
            {
                num: 270,
                digits: 3,
                expected: '270'
            },
            {
                num: 1,
                digits: 3,
                expected: '001'

            }
        ];

        tests.forEach(function(test) {
            it('must return '+test.expected+' given '+test.num+' and '+test.digits, function() {
                assert.strictEqual(calc.pad(test.num, test.digits), test.expected);
            });
        });
    });

    describe('calc.time', function() {

        it('must be defined', function() {
            assert.isDefined(calc.time);
        });

        var tests = [
            {
                speed: 300,
                distance: 20,
                expected: 240
            },
            {
                speed: 1,
                distance: 1,
                expected: 3600
            },
            {
                speed: 300,
                distance: 10,
                expected: 120

            }
        ];

        tests.forEach(function(test) {
            it('must return '+test.expected+' given '+test.speed+' and '+test.distance, function() {
                assert.strictEqual(calc.time(test.speed, test.distance), test.expected);
            });
        });
    });

    describe('calc.maxBounds', function() {

        it('must be defined', function() {
            assert.isDefined(calc.maxBounds);
        });

        var tests = [
            {
                given: {
                    latMin: 0,
                    latMax: 10,
                    lngMin: 0,
                    lngMax: 10
                },
                expected: [[-5, -5], [15, 15]]
            },
            {
                given: {
                    latMin: 0,
                    latMax: 100,
                    lngMin: 0,
                    lngMax: 100
                },
                expected: [[-5, -5], [105, 105]]
            }
        ];

        tests.forEach(function(test) {
            it('must return '+test.expected+' given '+strLatLng([test.given.latMin, test.given.lngMin])+
                    ' and '+strLatLng([test.given.latMin, test.given.lngMin]), function() {
                assert.deepEqual(calc.maxBounds(test.given), test.expected);
            });
        });
    });
});