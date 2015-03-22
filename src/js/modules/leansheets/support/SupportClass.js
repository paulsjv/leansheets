/**
 * The support/ directory should not include any angular components.
 *
 * Instead, it should only house standalone javascript classes designed to support
 * the internals of the angular components.
 *
 * Naming Convention:
 *
 * 1. Never include `di-` prefix for namespacing
 * 2. ClassStyleCamelCaseNaming
 * 3. No mandatory suffix
 */
define(['angular'], function (ng) {
    'use strict';

    var SupportClass = function (noun) {
        this.noun = noun;
    };

    SupportClass.prototype.sayHello = function () {
        return "Hello, " + this.noun + "! (from SupportClass)";
    };

    return SupportClass;

});
