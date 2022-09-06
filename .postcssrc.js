// 所有的post插件都是函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    pxToRem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*']
    })
  ]
}
