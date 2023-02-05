/* eslint-disable prettier/prettier */
const makeLimitOffset = (query) => {
  let limit = +query.limit;
  let offset = +query.offset;
  if (Number.isNaN(limit)) limit = 100;
  else if (limit > 100) limit = 100;
  if (Number.isNaN(offset)) offset = 0;
  else offset *= limit;
  return { limit, offset };
};

module.exports = {
  makeLimitOffset,
};
