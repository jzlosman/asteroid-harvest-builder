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
      _.times(x, function(i) {
        hand.push(drawCard(deck));
      });
      return hand;
    }

    function drawCard(deck) {
      var card = _.chain(deck).shuffle().sample().value();
      // vm.hand.push(card);
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
