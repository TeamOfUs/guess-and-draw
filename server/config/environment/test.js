'use strict';

// 测试环境独有的配置
// ===========================
module.exports = {
  // MongoDB 连接选项
  mongo: {
    uri: 'mongodb://localhost/guess-and-draw-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
