const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://frontend-test.getsandbox.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/", // remove base path
      },
    })
  );
};
