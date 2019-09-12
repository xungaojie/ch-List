const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  publicPath: "/ch-list/",
  productionSourceMap: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    process.env.IS_ANALYZ &&
      config
        .plugin("webpack-report")
        .use(BundleAnalyzerPlugin, [{ analyzerMode: "static" }]);
  }
};
