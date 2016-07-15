var app = angular.module('app', ['angularModalService']);

app.controller('Controller', function ($scope, ModalService) {
    "use trict";
    //debugger;
    $scope.show = function () {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function (modal) {
            modal.element.modal(); // open modal dialog
            modal.close.then(function (result) {
                $scope.message = result;
            });
        });
    };

});

app.controller('ModalController', function ($scope, close) {
    //debugger;
    $scope.Yes = function () {
        result = "Right, Your name is " + $scope.name;
        close(result, 300); // close, but give 500ms for bootstrap to animate
    };

    $scope.No = function () {
        result = "You choose NO, please try again"
        close(result, 300); // close, but give 500ms for bootstrap to animate
    };

    $scope.Cancel = function () {
        result = "You can't type input";
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
});
