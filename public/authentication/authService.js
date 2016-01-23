(function () {
    "use strict";
    angular.module('TunjiWeb').factory('authService', AuthService);

    AuthService.$inject = ['$location', '$http', '$cookies', '$mdDialog'];

    function AuthService($location, $http, $cookies, $mdDialog) {

        return {
            signUp: signUp,
            signIn: signin,
            logout: logout
        };

        function signUp(newUser) {
            var url = /*$location.host() + */'http://localhost:3000/signup';
            console.log(url)

            $http.post(url, newUser)
                .success(function (createdUser) {
                    console.log(createdUser)
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

        function signin() {

        }

        function logout() {

        }
    }
})();