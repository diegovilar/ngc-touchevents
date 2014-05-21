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
    
    var START_EVENT_NAME = 'ontouchstart'    in document ? 'touchstart' :
                           'onpointerdown'   in document ? 'pointerdown' :
                           'onmspointerdown' in document ? 'MSPointerDown' :
                           'mousedown';
    
    var END_EVENT_NAME = 'ontouchend'    in document ? 'touchend' :
                         'onpointerup'   in document ? 'pointerup' :
                         'onmspointerup' in document ? 'MSPointerUp' :
                         'mouseup';
                              
    var MOVE_EVENT_NAME = 'ontouchmove'     in document ? 'touchmove' :
                          'onpointermove'   in document ? 'pointermove' :
                          'onmspointermove' in document ? 'MSPointerMove ' :
                          'mousemove';

    var module = angular.module(MODULE_NAME, []),
        parts,
        i,

        events = [
            MODULE_PREFIX + 'Touchstart:' + START_EVENT_NAME,
            MODULE_PREFIX + 'Touchend:'   + END_EVENT_NAME,
            MODULE_PREFIX + 'Touchmove:'  + MOVE_EVENT_NAME
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
