(function () {
  'use strict';

  angular
    .module('cards.services')
    .factory('CardsHelper', CardsHelper);

  CardsHelper.$inject = ['$log', 'Socket'];

  function CardsHelper($log, Socket) {

    var service = {
      buildHand: buildHand,
      drawCard: drawCard,
      removeCard: removeCard,
      buildPartialDeck: buildPartialDeck,
      buildExistingPartialDeck: buildExistingPartialDeck,
      getDeckIds: getDeckIds
    };

    return service;

    function buildPartialDeck(sourceCards, types, amounts, base) {
      var deck = [];
      _.chain(sourceCards).filter(function(o) {
        return (types.indexOf(o.type) !== -1);
      }).each(function(o) {
        var times = amounts[types.indexOf(o.type)];
        _.times(times, function() {
          deck.push({ id: _.uniqueId(), source: o, properties: _.clone(base) });
        });
      }).value();
      return _.shuffle(deck);
    }

    function buildExistingPartialDeck(sourceCards, ids, base) {
      var deck = [];
      _.each(ids, function(o) {
        var card = _.find(sourceCards, function(c) {
          return c._id === o[0];
        });
        deck.push({ id: o[1], source: card, properties: _.clone(base) });
        $log.log('deck rebuilder is now ',deck);
      });
      return deck;
    }

    function getDeckIds(deck) {
      return _.map(deck, function(o) {
        return [o.source._id, o.id];
      });
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

    function removeCard(deck, id) {
      deck = _.reject(deck, function(o) {
        return (o.id === id);
      })
      return deck;
    }

    function drawCard(deck) {
      var card = deck.shift();
      Socket.emit('removeDrawable', { id: card.id });
      return {
        card: card,
        deck: deck
      };
    }
  }

}());
