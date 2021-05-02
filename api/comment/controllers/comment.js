"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    const { blogId } = ctx.params;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      ctx.request.body.published_at = null;
      let newBody = {
        ...ctx.request.body,
      };
      entity = await strapi.services.comment.create(newBody);

      await strapi
        .query("blog")
        .update(
          { id: blogId },
          { $addToSet: { comments: entity.id }, $inc: { commentsCount: +1 } }
        );
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
