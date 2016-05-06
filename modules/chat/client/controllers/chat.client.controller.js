(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$log', '$scope', '$state', 'Authentication', 'Socket', 'CardsService', 'CardsHelper'];

  function ChatController($log, $scope, $state, Authentication, Socket, CardsService, CardsHelper) {
    var vm = this;

    vm.messages = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    vm.game = {
      user: {
      },
      asteroids: []
    };


    init();

    function init() {
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
        if (o.occupied !== undefined && o.occupied === occupied) {
          o.occupied = 0;
        }
      });
      _.each(vm.game.asteroids, function(o, i, l) {
        if (i === position) {
          if (o.occupied !== undefined && o.occupied === occupied) {
            return;
          }
          o.occupied = occupied;
        }
      });
      if (isYou) {
        $log.log('sending move');
        Socket.emit('move', { position: position });
      }
    }

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
