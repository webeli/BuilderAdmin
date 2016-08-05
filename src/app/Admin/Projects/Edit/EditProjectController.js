module.exports = function(app) {
    app.controller('EditProjectController', ['$scope', 'Auth', '$state', '$stateParams', '$firebaseArray', '$timeout', '$mdDialog', function($scope, Auth, $state, $stateParams, $firebaseArray, $timeout, $mdDialog) {

        $scope.categories = 0;
        $scope.items = 0;
        $scope.options = null;
        $scope.selectedValue = null;

        // Get project key and project db ref path
        var projectKey = $stateParams.projectKey;
        var projectRef = firebase.database().ref().child(projectKey);

        // Database references
        var categoriesRef = projectRef.child("categories");
        var itemsRef = projectRef.child("categoryItems");
        var itemOptionsRef = projectRef.child("itemOptions");

        // Get data from database
        var categories = $firebaseArray(categoriesRef);

        // Init first category and item
        categories.$loaded().then(function(){
            $scope.getCategoryItems(categories[0].$id);
            $scope.categories = categories;
        });

        $scope.getCategoryItems = function(categoryKey, categoryTitle) {
            $scope.items = 0;
            $scope.options = null;
            $scope.selectedValue = {key:categoryKey,title:categoryTitle};
            var categoryRef = categoriesRef.child(categoryKey).child("refs");
            var category = $firebaseArray(categoryRef);
            category.$loaded().then(function(keys){
                getItemsByKeys(keys, categoryKey);
            });
        };

        $scope.getItemOptions = function(itemKey, itemTitle) {
            $scope.options = 0;
            $scope.selectedValue = {key:itemKey, title:itemTitle};
            var optionRefs = itemsRef.child(itemKey).child("refs");
            var options = $firebaseArray(optionRefs);
            options.$loaded().then(function(keys){
                getOptionsByKeys(keys, itemKey);
            });
        };


        function getItemsByKeys(keys, categoryKey) {
            var data = [];

            angular.forEach(keys, function(key) {
                var ref = itemsRef.child(key.$id);
                ref.on('value', function(snap) {
                    data.push({...snap.val(),categoryKey:categoryKey});
                    $scope.items = data;
                    console.log("ITEMS: ", $scope.items);
                });
            });
        }

        function getOptionsByKeys(keys, itemKey) {
            var data = [];

            angular.forEach(keys, function(key) {
                var ref = itemOptionsRef.child(key.$id);
                ref.on('value', function(snap) {
                    data.push({...snap.val(),itemKey:itemKey});
                    $scope.options = data;
                    console.log("OPTIONS: ", $scope.options);
                });
            });
        };


        $scope.dialogNewValue = function(ev) {
            console.log(ev);
            $mdDialog.show({
                controller: 'DialogController',
                template: require('./dialog_newvalue.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.dialogEditValue = function(ev) {
            console.log(ev);
            $mdDialog.show({
                controller: 'DialogController',
                template: require('./dialog_editvalue.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.dialogProjectSettings = function(ev) {
            console.log(ev);
            $mdDialog.show({
                controller: 'DialogController',
                template: require('./dialog_projectsettings.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.dialogDeleteValue = function(ev) {
            console.log(ev);
            $mdDialog.show({
                controller: 'DialogController',
                template: require('./dialog_deletevalue.html'),
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

    }]);
}