'use strict';

module.exports = {
  handler: async (ctx) => {
    ctx.logout();
    ctx.redirect('/');
  },
};
