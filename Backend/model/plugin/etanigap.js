/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (options) {
    const filter = {};
    if (options.searchValue && options.searchFields && Array.isArray(options.searchFields)) {
      const searchFilter = options.searchFields.map(field => {

        if (field === 'userId' || field === 'from' || field === 'loginType' || field === 'title' || field === 'userAddress' || field === 'ip' || field === 'referralAddress') {
          const numericSearchValue = parseInt(options.searchValue, 10);
          // Only search for numeric values if parsing is successful and numericSearchValue is not NaN
          if (!isNaN(numericSearchValue)) {
            return {
              [field]: { $in: [options.searchValue, numericSearchValue] },
            };
          } else {
            return { [field]: { $regex: options.searchValue, $options: 'i' } }; // Match string values only
          }
        } else {
          return { [field]: { $regex: options.searchValue, $options: 'i' } }; // Match string values
        }
      });
      filter['$or'] = searchFilter;
    }

    const skip = (options.page - 1) * options.limit;
    const page = options.page
    const limit = options.limit
    const totalResults = await this.countDocuments(filter);
    const totalPages = Math.ceil(totalResults / options.limit);
    const query = this.find(filter).sort(options.sortBy).skip(skip).limit(options.limit);
    const results = await query.exec();

    return {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
  };
};


module.exports = paginate;
