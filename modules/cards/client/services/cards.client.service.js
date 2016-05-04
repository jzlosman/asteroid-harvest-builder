(function () {
  'use strict';

  angular
    .module('cards.services')
    .factory('CardsService', CardsService);

  CardsService.$inject = ['$resource'];

  function CardsService($resource) {
    return $resource('api/cards/:articleId', {
      cardId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
