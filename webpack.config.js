const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = function (env) {
  return [
    // generate(env, ".desktop", [
    //   "electron >= 11",
    // ]),
    // generate(env, ".ie11", [
    //   "ie >= 11",
    // ]),
    generate(env, "", [
      "last 2 chrome versions",
      "last 2 safari versions",
      "last 2 edge versions",
    ]),
  ];
};


module.exports = function (_env) {
  return {
    context: path.resolve(__dirname),
    entry: {
      "babel-7.13.3-sourcemaps-issue": path.resolve(__dirname, "src", "index.ts"),
    },
    mode: "production",
    target: false,
    devtool: "hidden-source-map",
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      chunkFormat: false, // use Webpack < 5.41 default (see https://github.com/webpack/webpack/compare/v5.40.0...v5.41.1#diff-c0078e4713a0e7a24dbc56d6dfda3cf139376325fc65ea70a8389d4d30b27f04L642)
      filename: `[name].js`,
      path: path.resolve(__dirname, "app"),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: { // use Webpack's default options: https://github.com/webpack/webpack/blob/ccecc17c01af96edddb931a76e7a3b21ef2969d8/lib/config/defaults.js#L1121
            compress: {
              passes: 2,
            },
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    plugins: [],
    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", {
                    targets: [
                      "last 2 chrome versions",
                      "last 2 safari versions",
                      "last 2 edge versions",
                    ],
                    bugfixes: true,
                    debug: false,
                    useBuiltIns: "usage",
                    corejs: "3.8",
                  }],
                ],
                sourceType: "unambiguous",
              },
            },
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: path.resolve(__dirname, "src", "tsconfig.json"),
                compilerOptions: {
                  declaration: true,
                  declarationDir: path.resolve(__dirname, "types"),
                },
              },
            },
          ],
        },
      ],
    },
  };
}
