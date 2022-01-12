const RedisService = require('./redisService');
const _ = require('lodash');

const createRedisClient = (options) => new RedisService(options);

const getItem = async (instance, key, format = 'json') => {
  const item = await instance.getItem(key, format);
  if (_.isEmpty(item)) return null;

  return item;
};

const setItem = (
  instance,
  key,
  item,
  format = 'json',
  expiryMode = null,
  time = null,
) =>
  instance.setItem(
    key,
    item,
    format,
    expiryMode,
    time,
  );

const unsetItem = (instance, key) => instance.removeItem(key);

module.exports = {
  createRedisClient,
  getItem,
  setItem,
  unsetItem,
};
