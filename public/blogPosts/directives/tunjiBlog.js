(function () {
    "use strict";
    angular.module('TunjiWeb')
        .directive('tunjiBlog', tunjiBlog);

    function tunjiBlog($compile) {
        "use strict";
        return {
            restrict: 'E',
            scope: {
                blogpost: '=',
                snippet: '='
            },
            link: function (scope, elem, attrs) {

                var content = scope.snippet
                    ? getPostSnippet(scope.blogpost)
                    : scope.blogpost.body;

                content = JSON.parse('"' + content + '"')

                elem.append('<div>' + content + '</div>');

                function getPostSnippet(blogpost) {
                    var unescapedString = unescape(blogpost.body);
                    var index = unescapedString.indexOf('!--more--');

                    if (index == -1) {
                        index = unescapedString.indexOf('. ')
                    }

                    var result = unescapedString.substring(0, index) + '...';

                    return result;
                }
            }
        };
    }
})();
