angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('AppCtrl', function ($scope, $mdDialog) {
    $scope.name = "MINH";
    $scope.openFromLeft = function () {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Opening from the left')
            .textContent('Closing to the right!')
            .ariaLabel('Left to right demo')
            .ok('Nice!')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
    };

    $scope.openOffscreen = function () {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Opening from offscreen' + $scope.name)
            .textContent('Closing to offscreen')
            .ariaLabel('Offscreen Demo')
            .ok('Amazing!')
            // Or you can specify the rect to do the transition from
            .openFrom({
                top: -50,
                width: 30,
                height: 80
            })
            .closeTo({
                left: 1500
            })
        );
    };
});


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/
