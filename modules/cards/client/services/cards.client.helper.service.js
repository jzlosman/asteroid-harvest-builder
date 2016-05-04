(function () {
  'use strict';

  angular
    .module('cards.services')
    .factory('CardsHelper', CardsHelper);

  CardsHelper.$inject = ['$log'];

  function CardsHelper($log) {

    var service = {
      buildHand: buildHand,
      drawCard: drawCard,
      buildPartialDeck: buildPartialDeck
    };

    return service;

    function buildPartialDeck(sourceCards, types, amounts) {
      var deck = [];
      _.chain(sourceCards).filter(function(o) {
        return (types.indexOf(o.type) !== -1);
      }).each(function(o) {
        var times = amounts[types.indexOf(o.type)];
        _.times(times, function() {
          deck.push(o);
        });
      }).value();
      return _.shuffle(deck);
    }

    function buildHand(deck, x) {
      var hand = [];
      _.times(x, function(i) {
        var result = drawCard(deck);
        hand.push(result.card);
        deck = result.deck;
      });
      return {
        hand: hand,
        deck: deck
      };
    }

    function drawCard(deck) {
      var card = deck.shift();
      return {
        card: card,
        deck: deck
      };
    }
  }

}());
