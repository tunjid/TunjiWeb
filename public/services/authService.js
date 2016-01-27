(function () {
    "use strict";
    angular.module('TunjiWeb').factory('authService', AuthService);

    AuthService.$inject = ['$location', '$http', '$cookies', '$mdDialog'];

    function AuthService($location, $http, $cookies, $mdDialog) {

        var authService = {
            signedInUser: null,
            signUp: signUp,
            signIn: signin,
            logout: logout
        };

        return authService;

        function signUp(newUser) {
            var url = /*$location.host() + */'http://localhost:3000/signup';

            $http.post(url, newUser)
                .success(function (createdUser) {
                    console.log(createdUser)
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
                    console.log(oldUser)
                    authService.signedInUser = oldUser;
                })
                .error(function (data) {
                    console.log(data);
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
    }
})();