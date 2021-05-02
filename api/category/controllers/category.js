"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async categoryLists(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.category.search(ctx.query);
    } else {
      entities = await strapi.services.category.categoryLists(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.category })
    );
  },

  async category(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.category.search(ctx.query);
    } else {
      entities = await strapi.services.category.category(ctx.params, ctx.query);
    }

    return sanitizeEntity(entities, { model: strapi.models.category });
  },

  async contents(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.category.search(ctx.query);
    } else {
      entities = await strapi.services.category.contents(ctx.params, ctx.query);
    }

    return sanitizeEntity(entities, { model: strapi.models.category });
  },
};

// {
//   "method": "GET",
//   "path": "/categories/:id",
//   "handler": "category.findOne",
//   "config": {
//     "policies": []
//   }
// },
