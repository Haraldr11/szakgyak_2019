module.exports = {
	"/hana": {
		target: "https://oktnb132.inf.elte.hu:51044",
		secure: false,
		changeOrigin: true,
		pathRewrite: {"^/hana": ""},
		onProxyRes(proxyRes,req,res){
			proxyRes.headers["Access-Control-Allow-Origin"] = "*"
		}
		
	}
	
}