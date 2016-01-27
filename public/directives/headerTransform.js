(function () {
    "use strict";
    angular.module('TunjiWeb')
        .directive('headerTransform', headerTransform);

    function headerTransform($window) {
        "use strict";
        return {
            restrict: 'A',
            link: function ($scope, $element) {

                var scrollContainer = document.querySelector('#scroll-container');
                /* header DOM element with md-page-header attribute */
                var header = document.querySelector('[md-page-header]');
                /* Store header dimensions to initialize header styling */
                var baseDimensions = header.getBoundingClientRect();
                /* DOM element with md-header-title attribute (title in toolbar) */
                var title = angular.element(document.querySelector('[md-header-title]'));
                /* DOM element with md-header-picture attribute (picture in header) */
                var picture = angular.element(document.querySelector('[md-header-picture]'));
                /* The height of a toolbar by default in Angular Material */
                var legacyToolbarH = 64;
                /* The zoom scale of the toolbar title when it's placed at the bottom of the header picture */
                var titleZoom = 3;
                /* The primary color palette used by Angular Material */
                var primaryColor = [39, 50, 56];

                function styleInit() {
                    title.css('padding-left', '16px');
                    title.css('position', 'relative');
                    title.css('transform-origin', '24px');
                }

                function handleStyle(dim) {
                    var resolvedRatio = ratio(dim);

                    if ((dim.bottom - baseDimensions.top) > 0) {
                        $element.css('height', (dim.bottom - baseDimensions.top + legacyToolbarH) + 'px');

                        title.innerHTML = 'Hello :)';
                        title.css('top', (((dim.bottom - baseDimensions.top) ) * 0.6) + 'px');
                        title.css('left', resolvedRatio * 160 + 'px');
                        title.css('transform', 'scale(' + ((titleZoom - 1) * resolvedRatio + 1) + ',' + ((titleZoom - 1) * resolvedRatio + 1) + ')');

                    } else {
                        $element.css('height', legacyToolbarH + 'px');

                        title.innerHTML = 'Home';
                        title.css('top', '0px');
                        title.css('left', '0px');
                        title.css('transform', 'scale(1,1)');
                    }

                    $element.css('background-color', 'rgba(' + primaryColor[0] + ',' + primaryColor[1] + ',' + primaryColor[2] + ',' + (1 - resolvedRatio) + ')');
                    picture.css('background-position', '50% ' + (resolvedRatio * 50) + '%');

                    /* Uncomment the line below if you want shadow inside picture (low performance) */
                    //element.css('box-shadow', '0 -'+(dim.height*3/4)+'px '+(dim.height/2)+'px -'+(dim.height/2)+'px rgba(0,0,0,'+ratio(dim)+') inset');
                }

                function ratio(dim) {
                    var r = (dim.bottom - baseDimensions.top) / dim.height;
                    if (r < 0) return 0;
                    if (r > 1) return 1;
                    return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
                }

                styleInit();
                handleStyle(baseDimensions);

                /* Scroll event listener */
                angular.element(scrollContainer).bind("scroll", function () {
                    var dimensions = header.getBoundingClientRect();
                    handleStyle(dimensions);
                    $scope.$apply();
                });

                /* Resize event listener */
                angular.element($window).bind('resize', function () {
                    baseDimensions = header.getBoundingClientRect();
                    var dimensions = header.getBoundingClientRect();
                    handleStyle(dimensions);
                    $scope.$apply();
                });
            }
        };
    }
})();
