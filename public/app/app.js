var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function(mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainController'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListController',
            resolve: routeRoleChecks.admin
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'mvSignupController'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'mvProfileController',
            resolve: routeRoleChecks.user
        })
        .when('/courses', {
            templateUrl: '/partials/courses/course-list',
            controller: 'mvCourseListController'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/courses/course-details',
            controller: 'mvCourseDetailController'
        });
});

app.run(function($rootScope, $location) {
   $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
       if(rejection === 'not authorized') {
           $location.path('/');
       }
   })
});

