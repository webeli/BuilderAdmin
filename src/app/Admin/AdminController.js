module.exports = function(app) {
  app.controller('AdminController', ['$scope', '$state', '$firebaseObject', 'Auth', '$timeout', '$mdSidenav', '$log',
    function($scope, $state, $firebaseObject, Auth, $timeout, $mdSidenav, $log) {

      /*
       ** Database References
       */
      var categoriesRef = firebase.database().ref().child("categories");
      var categoryItemsRef = firebase.database().ref().child("categoryItems");
      var itemOptions = firebase.database().ref().child("itemOptions");

      /*
       ** Starters
       */
      $scope.auth = Auth;
      $scope.user = Auth.$getAuth();
      $scope.categories = $firebaseObject(categoriesRef);

      /*
       ** $scope functions
       */
      $scope.toggle = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width > 960) { return; }

        $mdSidenav('left').toggle().then(function () {
          $log.debug("close LEFT is done");
        });
      };
      $scope.addItemOption = function(item) {
        productsRef.push(item);
        $scope.item = "";
      };
      $scope.addCategory = function(category) {
        categoriesRef.push(category);
        $scope.category = "";
      };
      $scope.signOut = function() {
        console.log("Logout....");
        Auth.$signOut();
        $state.go("login");
      };

    }]);
}