module.exports = function(app) {
  app.controller('ProjectsController', ['$scope', 'Auth', '$state', '$firebaseObject', '$mdDialog',
    function($scope, Auth, $state, $firebaseObject, $mdDialog) {

      /*
       ** Database References
       */
      var projectsRef = firebase.database().ref();

      /*
       ** Starters
       */
      $scope.projects = $firebaseObject(projectsRef);

      /*
       ** $scope functions
       */
      $scope.createProject = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Create New Project')
            .placeholder('Enter project name')
            .ariaLabel('Enter project name')
            .targetEvent(ev)
            .ok('Create')
            .cancel('Close');
        $mdDialog.show(confirm).then(function(result) {
          if (!result) { return; }
          projectsRef.push({
            pName: result
          }, function() {
            console.log("Done....");
          });
        }, function() {
          console.log("Cancel");
        });
      };

    }]);
}