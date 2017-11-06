'use strict';

module.exports = {
  handler: async (ctx) => {
    ctx.log.debug(`User ID: ${ctx.state.user.id} logout... `);
    ctx.logout();
    ctx.redirect('/');
  },
};
