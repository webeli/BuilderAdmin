module.exports = function(app) {
    app.controller('DialogController', ['$scope', '$firebaseArray', '$stateParams', '$mdDialog', '$timeout', '$mdToast',
        function($scope, $firebaseArray, $stateParams, $mdDialog, $timeout, $mdToast) {

        // Get project key and project db ref path
        var projectKey = $stateParams.projectKey;
        var projectRef = firebase.database().ref().child(projectKey);

        // Database references
        var categoriesRef = projectRef.child("categories");
        var itemsRef = projectRef.child("categoryItems");
        var itemOptionsRef = projectRef.child("itemOptions");

        // Scope init variables
        $scope.categories = $firebaseArray(categoriesRef);
        $scope.items = $firebaseArray(itemsRef);

        // Scope functions
        $scope.addCategory = function(category) {
            if (!category || category.title === "") { return; }
            var newCategory = categoriesRef.push();
            newCategory.set({
                title:category.title
            });
            var toastMsg = "Added " +category.title;
            $scope.openToast(toastMsg);
        };
        $scope.addItem = function(category, item) {
            if (!item || item.title === "") { return; }
            var newItem = itemsRef.push();
            var newItemKey = newItem.key;
            newItem.set({
                title:item.title,
                key:newItemKey
            });
            categoriesRef.child(category.$id).child("refs").child(newItemKey).set(newItemKey);
            var toastMsg = "Added item: " +item.title+" to category: "+category.title;
            $scope.openToast(toastMsg);
        };
        $scope.addOption = function(item, option) {
            if (!option || option.title === "") { return; }
            var newOption = itemOptionsRef.push();
            var newOptionKey = newOption.key;
            newOption.set({
                active: "true",
                attribute: "",
                default: false,
                desc: "",
                image: "https://cdn.filestackcontent.com/rndtkrHDRSqCBUC74UNs",
                key:newOptionKey,
                price:option.price || 0,
                title:option.title
            });
            itemsRef.child(item.$id).child("refs").child(newOptionKey).set(newOptionKey);
            var toastMsg = "Added option: " +option.title+" to item: "+item.title;
            $scope.openToast(toastMsg);
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

        $scope.openToast = function(message) {
            $mdToast.show($mdToast.simple().textContent(message).position('bottom right'));
        };
    }]);
}