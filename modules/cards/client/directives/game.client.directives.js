(function () {
  'use strict';

  angular.module('cards')
    .directive('gameboard', game);

  game.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$log', 'Authentication', 'Socket', 'CardsService', 'CardsHelper', 'Game'];

  function game($rootScope, $timeout, $interpolate, $state, $log, Authentication, Socket, CardsService, CardsHelper, Game) {
    var directive = {
      retrict: 'E',
      link: link,
      scope: {
        source: '=',
        game: '='
      },
      template: '' +
      '<div>' +
        'Player: {{game.players[game.turn].hero.name}}  |   Magic: {{game.players[game.turn].magic[1]}}/{{game.players[game.turn].magic[0]}}  |  ' +
        '<strong>{{game.decks.drawables.pile.length}} cards</strong> in draw pile.<br/>' +
        '<button ng-click="endTurn()">End Turn</button> <button ng-click="sendDecks()">Send Decks</button>' +
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
          scope.game.decks.asteroids.pile = CardsHelper.buildExistingPartialDeck(scope.source, deck.ids, { occupied: 0 });
        });

        Socket.on('sendDrawables', function (deck) {
          if (Authentication.user.username === deck.username) {
            return;
          }
          scope.game.decks.drawables.pile = CardsHelper.buildExistingPartialDeck(scope.source, deck.ids, {});
        });

        Socket.on('removeDrawable', function (event) {
          if (Authentication.user.username === event.username) {
            return;
          }
          scope.game.decks.drawables.pile = CardsHelper.removeCard(scope.cards.drawables.pile, event.id);
        });
      }

      scope.source = [];

      function getSources() {
        CardsService.query(function(cards) {
          scope.source = cards;
          scope.game.prepareGame(scope.source);
          scope.game.startGame([{ name: 'Jeremy' }, { name: 'Timmy' }], [{ name: 'Atticus O\'Sullivan' }, { name: 'Owen' }]);
        });
      }

      scope.endTurn = function() {
        scope.game.endTurn();
      };

      scope.sendDecks = function() {
        var asteroidIds = CardsHelper.getDeckIds(scope.cards.asteroids.pile);
        var drawableIds = CardsHelper.getDeckIds(scope.cards.drawables.pile);
        Socket.emit('sendAsteroids', { type: 'Asteroids', ids: asteroidIds });
        Socket.emit('sendDrawables', { type: 'Drawables', ids: drawableIds });
      };

      init();
    }
  }
}());
