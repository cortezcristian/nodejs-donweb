'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:PedidoNewCtrl
 * @description
 * # PedidoNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('PedidoNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('pedidos').post($scope.pedido).then(function(pedido) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/pedido";
      } else {
        $location.path('/crud/pedido');
      }
    });
  }
});
