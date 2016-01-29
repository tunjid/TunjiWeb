(function () {
    "use strict";
    angular.module('TunjiWeb')
        .directive('fabTransform', fabTransform);

    function fabTransform() {
        "use strict";
        return {
            restrict: 'A',
            link: function ($scope) {

                var previousScroll = 0;
                var scale = 1;

                var scrollContainer = angular.element(document.querySelector('#scroll-container'));
                var fab = angular.element(document.querySelector('.app-fab'));


                /* Scroll event listener */
                scrollContainer.bind("scroll", function () {
                    var currentScroll = scrollContainer.scrollTop();

                    if (currentScroll > previousScroll) { // scrolling down
                        /*if (!fab.hasClass('hide')) {
                            fab.addClass('hide');
                        }*/
                      scale =  scale - 0.01 < 0 ? 0 : scale - 0.01;
                    }
                    else { // Scrolling up
                        /*if (fab.hasClass('hide')) {
                            fab.removeClass('hide');
                        }*/
                        scale = scale + 0.01 > 1 ? 1 : scale + 0.01;
                    }
                    //fab.css('transform', 'scale(' + scale + ',' + scale + ')');

                    //fab.css('top', currentScroll + 'px');

                    previousScroll = currentScroll;
                    $scope.$apply();
                });

            }
        };
    }
})();
