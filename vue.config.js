module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      countyData: 'W50_County'
    }
  }
}