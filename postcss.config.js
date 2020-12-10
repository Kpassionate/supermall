module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视图宽度，对应设计稿的宽度
      viewportHeight: 667, // 视图高度，对应设计稿的高度
      unitPrecision: 5, // 指定·px·转换为视窗单位值得小数单位
      viewportUnit: 'vw', // 指定需要转换成的视图单位，建议使用vm
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
      minPixelValue: 1, // 小于或者等于·1px·不转换为视图单位
      mediaQuery: false, // 允许在媒体查询中转换·px·
      // exclude: [/TanBar/], // 必须是正则匹配
    }
  }
}
