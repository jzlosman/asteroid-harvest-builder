(function () {
  'use strict';

  angular
    .module('cards.services')
    .factory('Deck', DeckService);

  DeckService.$inject = ['$log', 'CardsHelper', 'Socket'];

  function DeckService($log, CardsHelper, Socket) {
    var Deck = function(source, types, copies) {
      this.source = source;
      this.types = types;
      this.copies = copies;
      this.pile = [];
      this.discards = [];
    };

    Deck.prototype = {
      build: function() {
        this.pile = CardsHelper.buildPartialDeck(this.source, this.types, this.copies, {});
        $log.log('updated deck', this);
      },

      draw: function() {
        var card = this.pile.shift();
        Socket.emit('removeDrawable', { id: card.id });
        $log.log('card drawn', card);
        $log.log('deck reduced ', this.pile.length);
        return card;
      },

      discard: function(card) {
        this.discards.push(card);
        $log.log('card added to discard pile', card);
      },

      shuffle: function() {
        _.shuffle(this.pile);
      }
    };

    return {
      create: function(source, types, copies) {
        return new Deck(source, types, copies);
      }
    };
  }
}());
