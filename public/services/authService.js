(function () {
    "use strict";
    angular.module('TunjiWeb').factory('authService', AuthService);

    AuthService.$inject = ['$location', '$http', '$mdDialog'];

    function AuthService($location, $http, $mdDialog) {

        var authService = {
            signedInUser: null,
            signUp: signUp,
            signIn: signin,
            logout: logout,
            getSession: getSession
        };

        return authService;

        function signUp(newUser) {
            var url = /*$location.host() + */'http://localhost:3000/signup';

            $http.post(url, newUser)
                .success(function (createdUser) {
                    if(createdUser._id)
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
            var url = /*$location.host() + */'http://localhost:3000/signin';

            $http.post(url, oldUser)
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
            var url = /*$location.host() + */'http://localhost:3000/session';

            $http.get(url)
                .success(function (data) {
                    if(data._id)
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
    }
})();