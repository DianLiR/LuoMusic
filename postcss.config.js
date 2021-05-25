const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:\\.]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      // 换算的基数 默认为37.5，一般不建议修改它，使用vant ui框架中也是默认37.5
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      propList: ['*'] //属性的选择器，*表示通用
    }),
    require('tailwindcss'),
    require('autoprefixer')({
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
}
