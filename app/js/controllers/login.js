angular.module('controllers').controller('LoginController', ['$q', '$log', '$kinvey', '$state', function($q, $log, $kinvey, $state) {

  this.login = function(username, password) {
    $kinvey.User.login(username, password).then(function(user) {
      $log.debug('Successfully logged in to Kinvey.', user);
      $state.go('active');
    }).catch(function(err) {
      $log.error('An error occurred logging in to Kinvey.', err);
    });
  };

  this.loginWithFacebook = function() {
    $kinvey.Defer.resolve().then(function() {
      var deferred = $kinvey.Defer.deferred();

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          return deferred.resolve(response.authResponse);
        }

        FB.login(function(response) {
          if (response.status === 'connected') {
            deferred.resolve(response.authResponse);
          }
          else if (response.status === 'not_authorized') {
            return deferred.reject(new Error('The user did not authorized the application to connect to Facebook.'));
          }
          else {
            return deferred.reject(new Error('Unable to connect to Facebook.'));
          }
        });
      });

      return deferred.promise;
    }).then(function(authResponse) {
      var provider = 'facebook';
      var tokens = {
        'access_token': authResponse.accessToken,
        'expires_in': authResponse.expiresIn
      };

      return $kinvey.User.loginWithProvider(provider, tokens).then(null, function(err) {
        // Attempt to signup as a new user if no user with the identity exists.
        if ($kinvey.Error.USER_NOT_FOUND === err.name) {
          return $kinvey.User.signupWithProvider(provider, tokens);
        }

        return $kinvey.Defer.reject(err);
      });
    }).then(function(user) {
      $log.debug('Successfully connected with Facebook.', user);
      $state.go('active');
    }).catch(function(err) {
      $log.error('An error occurred connecting with Facebook.', err);
    });
  };

  this.loginWithTwitter = function() {
    $kinvey.Social.twitter().then(function(user) {
      $log.debug('Successfully connected with Twitter.', user);
      $state.go('active');
    }).catch(function(err) {
      $log.error('An error occurred connecting with Twitter.', err);
    });
  };
}]);
