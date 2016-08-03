module.exports = function(app) {
  app.controller('LoginController', ['$scope', 'Auth', '$state',
    function($scope, Auth, $state) {

      // Check if user is loggedin
      /*var user = Auth.$getAuth();
       if (user) {
       $state.go("admin");
       }*/

      /*
       ** $scope functions
       */
      $scope.login = function(user) {
        $scope.loggingIn = true;
        Auth.$signInWithEmailAndPassword(user.email, user.password)
            .then(function(firebaseUser) {
              console.log("user", firebaseUser);
              $scope.loggingIn = false;
              $state.go('admin.dashboard');
            }).catch(function(error) {
              $scope.loggingIn = false;
              $scope.error = error.message;
            });
      };

    }]);
}