(function () {
    "use strict";
    angular.module('TunjiWeb')
        .directive('blogPost', blogPost);

    function blogPost($rootScope, $compile) {
        "use strict";
        return {
            restrict: 'E',
            scope: {
                blogpost: '=',
                snippet: '='
            },
            link: function ($scope, $elem) {
                var content = $scope.snippet
                    ? getPostSnippet($scope.blogpost)
                    : getBlogPostBody($scope.blogpost);

                content = JSON.parse('"' + content + '"');
                content = $rootScope.TunjiWeb.insertLineBreaks(content);

                $elem.append('<div>' + content + '</div>');

                if (!$scope.snippet) {
                    var unCompiled = getTemplate();
                    var compiled = $compile(unCompiled)($scope);
                    $elem.append(compiled);
                }

                function getPostSnippet(blogpost) {
                    var blogPostBody = getBlogPostBody(blogpost);
                    var index = blogPostBody.indexOf('!--more--');

                    if (index == -1) {
                        index = blogPostBody.indexOf('. ')
                    }

                    return blogPostBody.substring(0, index) + '...';
                }

                function getBlogPostBody(blogPost) {
                    return !blogPost
                        ? '.'
                        : !blogPost.body
                        ? '.'
                        : blogPost.body;
                }

                function getTemplate() {
                    return '' +
                        '<div>' +

                        '<br><br><br>' +

                        '<div ng-if="blogpost.tags.length">' +
                        '<span>Tags: </span>' +
                        '<span ng-repeat="tag in blogpost.tags">' +
                        '<a ' +
                        'class="tag"' +
                        'ui-sref="AllPostsController({tag:tag})">' +
                        '{{tag}}' +
                        '</a>' +
                        '<span ng-if="!$last">, </span>' +
                        '</span>' +
                        '</div>' +

                        '<br><br>' +

                        '<div ng-if="blogpost.categories.length">' +
                        '<span>Categories: </span>' +
                        '<span ng-repeat="category in blogpost.categories">' +
                        '<a ' +
                        'class="tag"' +
                        'ui-sref="AllPostsController({category:category})">' +
                        '{{category}}' +
                        '</a>' +
                        '<span ng-if="!$last">, </span>' +
                        '</span>' +
                        '</div>' +

                        '</div>';
                }
            }
        };
    }
})();
