module.exports = function(app) {
  app.controller('ProjectsController', ['$scope', 'Auth', '$state', '$firebaseArray', '$mdDialog', '$mdToast',
    function($scope, Auth, $state, $firebaseArray, $mdDialog, $mdToast) {


      /*
       ** Database References
       */
      var projectsRef = firebase.database().ref();

      /*
       ** Starters
       */
      $scope.projects = $firebaseArray(projectsRef);
      console.log($scope.projects);

      /*
       ** $scope functions
       */
      $scope.editProject = function(key) {
        if (key) {
          $state.go("admin.editproject", {"projectKey" : key})
        }
      };
      $scope.viewProject = function(key) {
        if (key) {
          window.location.href = "https://tival.se/#/project/"+key;
        }
      };

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
            var toastMsg = "Created project: "+result;
            $scope.openToast(toastMsg);
          });
        }, function() {
          console.log("Cancel");
        });
      };

      $scope.deleteProject = function(ev, project) {
        console.log(project);
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Sure you want to delete this project?')
            .textContent('Everything will get permanently lost, for ever and ever!')
            .ariaLabel('Delete project')
            .targetEvent(ev)
            .ok('Yes, delete')
            .cancel('No, abort');
        $mdDialog.show(confirm).then(function() {
          var thisProject = projectsRef.child(project.$id);
          thisProject.remove()
              .then(function() {
                var toastMsg = "Deleted project: "+project.pName;
                $scope.openToast(toastMsg);
              })
              .catch(function(error) {
                console.log("Remove failed: " + error.message)
              });
        }, function() {
          console.log('You decided not to delete.');
        });
      };

      $scope.openToast = function(message) {
        $mdToast.show($mdToast.simple().textContent(message).position('bottom right'));
      };

    }]);
}