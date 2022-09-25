//Create proxy because of 1-cors 2-send cookie

import { createProxyMiddleware } from "http-proxy-middleware";

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
