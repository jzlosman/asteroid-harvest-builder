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
      return _.chain(sourceCards).filter(function(o) {
        return (types.indexOf(o.type) !== -1);
      }).map(function(o) {
        o.count = amounts[types.indexOf(o.type)];
        return o;
      }).value();
    }

    function buildHand(deck, x) {
      var hand = [];
      _.times(x, function(i) {
        hand.push(drawCard(deck));
      });
      return hand;
    }

    function drawCard(deck) {
      var card = _.chain(deck).shuffle().sample().value();
      card.copies -= 1;
      if (card.copies === 0) {
        $log.log('we are out of this card now!');
        deck = _.without(deck, card);
        $log.log('vm deck', deck);
      }
      return card;
    }
  }

}());
