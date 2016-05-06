(function () {
  'use strict';

  angular.module('cards')
    .directive('game', game);

  game.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$log', 'Authentication', 'Socket', 'CardsService', 'CardsHelper'];

  function game($rootScope, $timeout, $interpolate, $state, $log, Authentication, Socket, CardsService, CardsHelper) {
    var directive = {
      retrict: 'E',
      link: link,
      scope: {
        cards: '=',
        source: '=',
        field: '=',
        user: '='
      },
      template: '' +
      '<div>' +
        '<strong>{{drawables.length}} cards</strong> in draw pile.  <button ng-click="buildDecks()">Create Decks</button>  <button ng-click="sendDecks()">Send Decks</button>' +
        '' +
      '</div>'
    };

    return directive;

    function link(scope, element) {
      function init() {
        getSources();

        Socket.on('sendAsteroids', function (deck) {
          if (Authentication.user.username === deck.username) {
            return;
          }
          scope.cards.asteroids.pile = CardsHelper.buildExistingPartialDeck(scope.source, deck.ids, { occupied: 0 });
        });

        Socket.on('sendDrawables', function (deck) {
          if (Authentication.user.username === deck.username) {
            return;
          }
          scope.cards.drawables.pile = CardsHelper.buildExistingPartialDeck(scope.source, deck.ids, {});
        });

        Socket.on('removeDrawable', function (event) {
          if (Authentication.user.username === event.username) {
            return;
          }
          scope.cards.drawables.pile = CardsHelper.removeCard(scope.cards.drawables.pile, event.id);
        });
      }

      scope.cards = {
        drawables: {
          pile: [],
          discard: []
        },
        resources: {
          pile: [],
          discard: []
        },
        asteroids: {
          pile: [],
          field: [],
          discard: []
        }
      };

      scope.source = [];

      function getSources() {
        CardsService.query(function(cards) {
          scope.source = cards;
        });
      }

      scope.sendDecks = function() {
        var asteroidIds = CardsHelper.getDeckIds(scope.cards.asteroids.pile);
        var drawableIds = CardsHelper.getDeckIds(scope.cards.drawables.pile);
        Socket.emit('sendAsteroids', { type: 'Asteroids', ids: asteroidIds });
        Socket.emit('sendDrawables', { type: 'Drawables', ids: drawableIds });
      };

      scope.buildDecks = function() {
        scope.cards.drawables.pile = CardsHelper.buildPartialDeck(scope.source, ['Action'], [6], {});
        scope.cards.asteroids.pile = CardsHelper.buildPartialDeck(scope.source, ['Asteroid'], [3], { occupied: 0 });
        scope.cards.resources.pile = CardsHelper.buildPartialDeck(scope.source, ['Resource'], [6], { used: 0 });

        $log.log('drawables: ', scope.cards.drawables);
        $log.log('asteroids: ', scope.cards.asteroids);
        $log.log('resources: ', scope.cards.resources);
      };
      init();
    }
  }
}());
