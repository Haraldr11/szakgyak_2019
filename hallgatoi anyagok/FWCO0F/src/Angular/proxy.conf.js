module.exports = {
  "/hana": {
    target: "https://oktnb132.inf.elte.hu:51054",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: { "^/hana": "" },
    onProxyRes(proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    }
  }
};
