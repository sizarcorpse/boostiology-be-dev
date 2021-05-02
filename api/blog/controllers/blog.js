"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async page(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.blog.search(ctx.query);
    } else {
      entities = await strapi.services.blog.page(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.blog })
    );
  },

  async featured(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.blog.search(ctx.query);
    } else {
      entities = await strapi.services.blog.featured(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.blog })
    );
  },
};
