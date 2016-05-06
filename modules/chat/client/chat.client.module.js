(function (app) {
  'use strict';

  app.registerModule('chat', ['core', 'cards', 'cards.services', 'users.services']);
  app.registerModule('chat.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
