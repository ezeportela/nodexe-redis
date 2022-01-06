const Redis = require('ioredis');
const {conversions} = require('@nodexe/common');

const _ = require('lodash');

class RedisService {
  constructor(connection) {
    this.instance = new Redis(connection);
  }

  async getItem(key, format = 'plain') {
    const item = await this.instance.get(key);
    if (_.isEmpty(item)) return null;

    /* eslint-disable */
    switch (format) {
      case 'plain':
        return item;
      case 'json':
        return conversions.parseJSON(item);
      default:
        throw new Error('Invalid format');
    }
    /* eslint-enable */
  }

  setItem(
    key,
    content,
    format = 'plain',
    expiryMode = null,
    time = null,
  ) {
    let value;
    /* eslint-disable */
    switch (format) {
      case 'plain':
        value = content;
        break;
      case 'json':
        value = conversions.stringifyJSON(content);
        break;
      default:
        throw new Error('Invalid format');
    }
    /* eslint-enable */

    return this.instance.set(
      key,
      value,
      expiryMode,
      time,
    );
  }

  removeItem(key) {
    return this.instance.unlink(key);
  }

  close() {
    return this.instance.disconnect();
  }
}

module.exports = RedisService;
