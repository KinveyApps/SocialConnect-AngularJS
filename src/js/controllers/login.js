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
          deferred.resolve(response.authResponse);
        });
      });

      return deferred.promise;
    }).then(function(authResponse) {
      return $kinvey.User.loginWithProvider('facebook', {
        'access_token': authResponse.accessToken,
        'expires_in': authResponse.expiresIn
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
