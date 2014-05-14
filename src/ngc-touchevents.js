/*!
 * $PROJECT_NAME$
 * $PROJECT_HOMEPAGE$
 *
 * @version $PROJECT_VERSION$
 * @license $PROJECT_LICENSE$
 */

(function () {
    "use strict";

    /**
     * @constant
     * @type {!string}
     */
    var MODULE_PREFIX = 'ngc';

    /**
     * @constant
     * @type {!string}
     */
    var MODULE_NAME = MODULE_PREFIX + 'Touchevents';

    var module = angular.module(MODULE_NAME, []),
        parts,
        i,

        events = [
            MODULE_PREFIX + 'Touchstart:touchstart MSPointerDown',
            MODULE_PREFIX + 'Touchend:touchend MSPointerUp',
            MODULE_PREFIX + 'Touchmove:touchmove MSPointerMove'
            //MODULE_PREFIX + 'Touchcancel:touchcancel'
        ];

    for (i = 0; i < events.length; i++) {
        parts = events[i].split(':');
        registerDirective(parts[0], parts[1]);
    }

    /**
     *
     * @param {!string} directiveName
     * @param {!string} eventName
     */
    function registerDirective(directiveName, eventName) {

        module.directive(directiveName, touchEventDirectiveFactory);

        touchEventDirectiveFactory.$inject = ['$parse'];

        function touchEventDirectiveFactory($parse) {

            return {
                restrict: 'ACM',

                link: function(scope, element, attributes) {
                    var userHandler = $parse(attributes[directiveName]);

                    element.bind(eventName, function(event) {
                        scope.$apply(function() {
                            userHandler(scope, {$event: event});
                        });
                    });
                }
            };
        }

    }

})();
