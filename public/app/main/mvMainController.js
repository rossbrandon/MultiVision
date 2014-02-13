app.controller('mvMainController', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();
});