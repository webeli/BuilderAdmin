module.exports = function(app) {
    app.controller('EditProjectController', ['$scope', 'Auth', '$state', '$stateParams', '$firebaseArray', '$timeout', function($scope, Auth, $state, $stateParams, $firebaseArray, $timeout) {

        $scope.categories = 0;
        $scope.items = 0;
        $scope.options = 0;

        // Get project key and project db ref path
        var projectKey = $stateParams.projectKey;
        var projectRef = firebase.database().ref().child(projectKey);

        // Database references
        var categoriesRef = projectRef.child("categories");
        var itemsRef = projectRef.child("categoryItems");
        var itemOptionsRef = projectRef.child("itemOptions");

        // Get data from database
        var categories = $firebaseArray(categoriesRef);
        //$scope.categories = $firebaseArray(categoriesRef);

        // Init first category and item
        categories.$loaded().then(function(){
            console.log("loaded...");
            $scope.getCategoryItems(categories[0].$id);
            $scope.categories = categories;
        });

        $scope.getCategoryItems = function(key) {
            $scope.items = 0;
            var categoryRef = categoriesRef.child(key).child("refs");
            var category = $firebaseArray(categoryRef);
            category.$loaded().then(function(keys){
                getItemsByKeys(keys);
            });
        };

        $scope.getItemOptions = function(key) {
            console.log(key);
        };

        // Get Items By Keys
        function getItemsByKeys(keys) {
            var data = [];

            angular.forEach(keys, function(key) {
                var itemRef = itemsRef.child(key.$id);
                itemRef.on('value', function(snap) {
                    data.push(snap.val());
                    $scope.items = data;
                });
            });
        }

    }]);
}