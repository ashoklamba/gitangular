/**
 * Created by i835310 on 3/5/16.
 */
angular.module('userServiceModule', ['ngCookies', 'userModelModule'])
    .constant('UserConstant', {
        'COOKIE_DOMAIN': 'spock'
    })
    .factory('userService', ['UserConstant', '$cookies', 'User', '$location', function (UserConstant, $cookies, User, $location) {
        var service = {};
        var _user = User.build();

        _load = function (userName) {
            //todo load user object from backend. For now, just return an User object with default values
            if (userName) {
                _user = User.build({
                    userName: userName
                })
            }
        }

        _find = function (userName) {
           if (userName) {
               _load(userName);
               if (userName != _user.userName) {
                   alert("cached user out-of-dated, updating user!");
                   _load(userName);
               }
           }
           return _user;
        }

        _getCookieName = function() {
            return UserConstant.COOKIE_DOMAIN + ".userName";
        }

        //for unit test only
        service.clearCookie = function() {
            $cookies.remove(_getCookieName());
        }

        //for unit test only
        service.getCookie = function() {
            return $cookies.get(_getCookieName());
        }

        service.get = function () {
            var userName = $cookies.get(_getCookieName());
            return _find(userName);
        }

        service.login = function (userName) {
            var user = _find(userName);
            if (user) {
                $cookies.put(_getCookieName(), user.userName);
            }
        }

        service.logout = function () {
            _user = User.build();
            this.clearCookie();
            $location.path('/login');
        }

        service.save = function (newUser) {
            //todo to post new user to backend
            _user = User.build(newUser);
        }

        service.mockUser = function (userData) {
            if (!userData) {
                userData = {
                    userName : 'dummyUser',
                    organization: 'dummyOrg'
                }
            }
            _user = User.build(userData);
        }

        return service;
    }])