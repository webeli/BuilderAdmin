module.exports = function(app) {
    app.controller('DialogController', ['$scope', '$firebaseArray', '$stateParams', '$mdDialog', '$timeout', function($scope, $firebaseArray, $stateParams, $mdDialog, $timeout) {

        // Get project key and project db ref path
        var projectKey = $stateParams.projectKey;
        var projectRef = firebase.database().ref().child(projectKey);

        // Database references
        var categoriesRef = projectRef.child("categories");
        var itemsRef = projectRef.child("categoryItems");
        var itemOptionsRef = projectRef.child("itemOptions");

        // Scope init variables
        $scope.categories = null;
        $scope.items = null;

        // Scope functions
        $scope.getCategories = function() {
            $scope.categories = $firebaseArray(categoriesRef);
        };
        $scope.getItems = function() {
            $scope.items = $firebaseArray(itemsRef);
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }]);
}