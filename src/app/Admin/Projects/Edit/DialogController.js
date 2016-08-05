module.exports = function(app) {
    app.controller('DialogController', ['$scope', '$firebaseArray', '$mdDialog', function($scope, $firebaseArray, $mdDialog) {
        console.log("modal....");
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