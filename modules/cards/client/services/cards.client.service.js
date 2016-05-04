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

  angular
    .module('cards.services')
    .factory('CardsHelper', CardsHelper);

  CardsHelper.$inject = ['$log'];

  function CardsHelper($log) {

    var service = {
      buildHand: buildHand,
      drawCard: drawCard,
      buildDeck: buildDeck
    };

    return service;

    function buildDeck(sourceCards) {
      var cards = _(sourceCards).sortBy('type');
      var deck = [];
      _.each(cards, function(o) {
        var times = 0;
        if (o.type === 'Action') {
          times = 3;
        } else {
          times = 5;
        }
        _.times(times, function() {
          deck.push(o);
        });
      });
      return _.shuffle(deck);
    }

    function buildHand(deck, x) {
      var hand = [];
      var draw;
      _.times(x, function(i) {
        draw = drawCard(deck);
        hand.push(draw[0]);
        deck = draw[1];
      });
      return hand;
    }

    function drawCard(deck) {
      var card = deck.shift();
      return [card, deck];
    }
  }
}());
