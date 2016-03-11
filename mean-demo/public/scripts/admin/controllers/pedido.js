'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:PedidoCtrl
 * @description
 * # PedidoCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('PedidoCtrl', function ($scope, Restangular) {
   $scope.pedidos = Restangular.all("pedidos").getList().$object;
  });
