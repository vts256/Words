(function() {
  'use strict';

  angular.module('words').factory('authService', ['$resource', '$cookies', 'config', 'userService', function($resource, $cookies, config, userService) {

    var request = function(url, username, password, callback) {
      $resource(url).save({'username': username, 'password': password})
      .$promise.then(function(response) {
        if(response.success) {
          userService.set(username);
          $cookies.put('auth-type', 'basic');
          $cookies.put('token', btoa(username + ':' + response.token));
        }
        callback(response);
      }).catch(callback);
    };

    return {
      login: function(username, password, callback) {
        request(config.apiUrl + '/authenticate/login', username, password, callback);
      },
      registration: function(username, password, callback) {
        request(config.apiUrl + '/authenticate/registration', username, password, callback);
      },
      logout: function() {
        userService.clear();
        $cookies.remove('auth-type');
        $cookies.remove('token');
      }
    };
  }]);
}());
