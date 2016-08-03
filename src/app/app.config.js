module.exports = function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login/',
                templateUrl: require('./Login/login.html'),
                controller: 'LoginController'
            })
            .state('admin', {
                url: '/admin/',
                templateUrl: require('./Admin/admin.html'),
                controller: 'AdminController',
                resolve: {
                    // controller will not be loaded until $requireSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["Auth", function(Auth) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Auth.$requireSignIn();
                    }]
                }
            })
            .state('admin.dashboard', {
                url: 'dashboard',
                templateUrl: require('./Admin/Dashboard/dashboard.html'),
                controller: 'DashboardController'
            })
            .state('admin.projects', {
                url: 'projects',
                templateUrl: require('./Admin/Projects/projects.html'),
                controller: 'ProjectsController'
            })
            .state('admin.editproject', {
                url: 'edit-project',
                templateUrl: require('./Admin/Projects/edit-project.html'),
                controller: 'EditProjectController'
            });

        $urlRouterProvider.otherwise('/admin/dashboard');
    }]);
}