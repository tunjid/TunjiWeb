(function () {
    "use strict";
    angular.module('TunjiWeb').factory('authService', AuthService);

    AuthService.$inject = ['$location', '$http', '$mdDialog'];

    function AuthService($location, $http, $mdDialog) {

        var authService = {
            signedInUser: null,
            url: getUrl($location),
            signUp: signUp,
            signIn: signin,
            logout: logout,
            getSession: getSession
        };

        return authService;

        function signUp(newUser) {
            $http.post(authService.url  + '/signup', newUser)
                .success(function (createdUser) {
                    if (createdUser._id)
                        authService.signedInUser = createdUser;
                })
                .error(function (data) {
                    console.log(data);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('There was an error signing up')
                            .ok('Okay')
                    );
                });
        }

        function signin(oldUser) {
            $http.post(authService.url + '/signin', oldUser)
                .success(function (oldUser) {
                    authService.signedInUser = oldUser;
                })
                .error(function () {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('There was an error signing in')
                            .ok('Okay')
                    );
                });
        }

        function logout() {

        }

        function getSession() {
            $http.get(authService.url + '/session')
                .success(function (data) {
                    if (data._id)
                        authService.signedInUser = data;
                })
                .error(function () {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Error')
                            .textContent('There was an error signing up')
                            .ok('Okay')
                    );
                });
        }

        function getUrl(location) {
            var parts = location.absUrl().split('/');
            return parts[0] + '//' + parts[2];
        }
    }
})();