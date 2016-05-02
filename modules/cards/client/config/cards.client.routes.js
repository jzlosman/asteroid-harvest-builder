(function () {
  'use strict';

  angular
    .module('cards.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cards', {
        abstract: true,
        url: '/cards',
        template: '<ui-view/>'
      })
      .state('cards.list', {
        url: '',
        templateUrl: 'modules/cards/client/views/list-cards.client.view.html',
        controller: 'CardsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cards List'
        }
      })
      .state('cards.create', {
        url: '/create',
        templateUrl: 'modules/cards/client/views/form-cards.client.view.html',
        controller: 'CardsController',
        controllerAs: 'vm',
        resolve: {
          cardResolve: newCard
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Cards Create'
        }
      })
      .state('cards.edit', {
        url: '/:cardId/edit',
        templateUrl: 'modules/cards/client/views/form-cards.client.view.html',
        controller: 'CardsController',
        controllerAs: 'vm',
        resolve: {
          cardResolve: getCard
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Card {{ cardResolve.label }}'
        }
      })
      .state('cards.view', {
        url: '/:cardId',
        templateUrl: 'modules/cards/client/views/view-card.client.view.html',
        controller: 'CardsController',
        controllerAs: 'vm',
        resolve: {
          cardResolve: getCard
        },
        data: {
          pageTitle: 'Card {{ cardResolve.label }}'
        }
      });
  }

  getCard.$inject = ['$stateParams', 'CardsService'];

  function getCard($stateParams, CardsService) {
    return CardsService.get({
      articleId: $stateParams.cardId
    }).$promise;
  }

  newCard.$inject = ['CardsService'];

  function newCard(CardsService) {
    return new CardsService();
  }
}());
