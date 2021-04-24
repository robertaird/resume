const webpack = require('webpack');

module.exports = function ({ env }) {
  return {
    webpack: {
      plugins: [
        new webpack.DefinePlugin({
          ...env.stringified,
          __NAME: webpack.DefinePlugin.runtimeValue((v) => {
            const res = v.module.resource;
            return JSON.stringify(res); // Strings need to be wrapped in quotes
          }, []),
        }),
      ],
    },
  };
};
