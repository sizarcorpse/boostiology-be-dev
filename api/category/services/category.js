"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  categoryLists(params, populate) {
    return strapi.query("category").model.find().select({ name: 1, slug: 1 });
  },

  async category(params, query, populate) {
    const category = await strapi
      .query("category")
      .model.findOne({ slug: params.category });
    return {
      name: category.name,
      excerpt: category.excerpt,
      cover: category.cover,
      slug: category.slug,
      meta: category.meta[0].ref,
    };
  },

  async contents(params, query, populate) {
    let _page;
    let _limit;
    let _sort;
    query._page ? (_page = query._page) : (_page = 1);
    query._limit ? (_limit = query._limit) : (_limit = 1);
    query._sort ? (_sort = query._sort) : (_sort = "createdAt");

    const item = await strapi
      .query("category")
      .model.findOne({ slug: params.category })
      .populate({
        path: "blogs",
        populate: {
          path: "categories comments",
        },
        match: { published_at: { $ne: null } },
        options: {
          sort: { [_sort]: -1 },
          skip: (_page - 1) * _limit,
          limit: _limit,
        },
      });

    return item.blogs;
  },
};
