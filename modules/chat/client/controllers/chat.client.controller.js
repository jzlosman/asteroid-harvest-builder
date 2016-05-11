(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$log', '$scope', '$state', 'Authentication', 'Socket', 'CardsService', 'CardsHelper', 'Game'];

  function ChatController($log, $scope, $state, Authentication, Socket, CardsService, CardsHelper, Game) {
    var vm = this;

    vm.messages = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    vm.game = {};


    init();

    function init() {

      vm.game = Game.create();
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.on('move', function(message) {
        if (Authentication.user.username !== message.username) {
          $log.log('receiving move');
          vm.movePlayer(message.position, false);
        }
      });
      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }

    vm.movePlayer = function(position, isYou) {
      var occupied = 2;
      if (isYou) {
        occupied = 1;
      }
      _.each(vm.game.asteroids, function(o) {
        if (o.properties.occupied !== undefined && o.properties.occupied === occupied) {
          o.properties.occupied = 0;
        }
      });
      vm.game.asteroids[position].properties.occupied = occupied;
      if (isYou) {
        Socket.emit('move', { position: position });
      }
    };

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        text: vm.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      vm.messageText = '';
    }
  }
}());
