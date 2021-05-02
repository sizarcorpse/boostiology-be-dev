"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Promise to fetch all records
   *
   * @return {Promise}
   */
  async page(params, populate) {
    let _page;
    let _limit;
    let _sort;
    params._page ? (_page = params._page) : (_page = 1);
    params._limit ? (_limit = params._limit) : (_limit = 1);
    params._sort ? (_sort = params._sort) : (_sort = "createdAt");
    return strapi
      .query("blog")
      .model.find({ published_at: { $ne: null } })
      .populate({
        path: "comments categories",
        match: {
          $or: [{ published_at: { $ne: null } }, { confirmed: true }],
        },
        options: {
          sort: { createdAt: -1 },
        },
      })
      .sort({ [_sort]: -1 })
      .skip((parseInt(_page) - 1) * parseInt(_limit))
      .limit(parseInt(_limit));
  },

  async featured(params, populate) {
    let _limit;
    let _sort;

    params._limit ? (_limit = params._limit) : (_limit = 1);
    params._sort ? (_sort = params._sort) : (_sort = "createdAt");
    return (
      strapi
        .query("blog")
        .model.find({ isFeatured: true, published_at: { $ne: null } })
        .select({ slug: 1, cover: 1, title: 1, _id: 1 })
        // .populate({
        //   path: "comments categories",
        //   match: {
        //     $or: [{ published_at: { $ne: null } }, { confirmed: true }],
        //   },
        //   options: {
        //     sort: { createdAt: -1 },
        //   },
        // })
        .sort({ [_sort]: -1 })
        .limit(parseInt(_limit))
    );
  },
};
