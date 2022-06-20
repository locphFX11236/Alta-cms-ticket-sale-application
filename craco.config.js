const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#FFB800",
              "@border-radius-base": "12px"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};