/**
 * Created by i835310 on 3/5/16.
 */
angular.module('userModelModule', [])
    .factory('User', function () {

    /**
     * Constructor, with class name
     * simply use the same name as the factory
     */
    function User(userName, orgName) {
        // Public properties, assigned to the instance ('this')
        this.userName = userName;
        this.organization = orgName;
        //todo store password
        this.password = '';
    }

    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    User.build = function (data) {
        if (data) {
            if (!data.userName) {
                userName = '';
            }
            if (!data.organization) {
                data.organization = 'SAP';
            }
            return new User(
                data.userName,
                data.organization
            );
        }
        else {
            return new User('', 'SAP');
        }
    };

    /**
     * Return the constructor function
     */
    return User;
})