var initialized = false;

var app = angular.module('Connect', [
  'ui.router',
  'kinvey',
  'config',
  'controllers'
]);

app.config(['$logProvider', function($logProvider) {
  // Enable log
  $logProvider.debugEnabled(true);
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: 'app/views/welcome.html',
      controller: 'WelcomeController',
      controllerAs: 'vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('logout', {
      url: '/logout',
      controller: ['$kinvey', '$state', function($kinvey, $state) {
        $kinvey.User.logout().then(function() {
          $state.go('login');
        });
      }],
      data: {
        requiresAuthorization: true
      }
    })
    .state('active', {
      url: '/active',
      templateUrl: 'app/views/active.html',
      controller: 'ActiveController',
      controllerAs: 'vm',
      resolve: {
        user: ['$kinvey', function($kinvey) {
          return $kinvey.getActiveUser();
        }]
      },
      data: {
        requiresAuthorization: true
      }
    });

  $urlRouterProvider.otherwise('/');
}]);

app.run(['$rootScope', '$kinvey', '$state', 'kinveyConfig', function($rootScope, $kinvey, $state, kinveyConfig) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    toState.data = toState.data || {
      requiresAuthorization: false
    };

    if (!initialized) {
      event.preventDefault();

      // Initialize Kinvey
      $kinvey.init(kinveyConfig).then(function() {
        initialized = true;
        $state.go(toState.name, toParams);
      });
    } else {
      var activeUser = $kinvey.getActiveUser();

      if (toState.data.requiresAuthorization && !$kinvey.getActiveUser()) {
        event.preventDefault();
        $state.go('login');
      } else if (!toState.data.requiresAuthorization && $kinvey.getActiveUser()) {
        event.preventDefault();
        $state.go('active');
      }
    }
  });
}]);
