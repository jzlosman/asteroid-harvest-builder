(function (app) {
  'use strict';

  app.registerModule('chat', ['core', 'cards', 'cards.services']);
  app.registerModule('chat.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
