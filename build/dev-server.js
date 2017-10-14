'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const ip = getIPAdress()
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const fs = require('fs')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

let routeArr = []

//从config.json中读取api数组
const files = fs.readdirSync(path.resolve(__dirname, '../src/components'))
files.map(function(file, fileIndex){
    let dirPath = path.resolve(__dirname, '../src/components/' + file);
    let stats = fs.statSync(dirPath);
    if(stats.isDirectory()){
        let filePath = path.resolve(__dirname, '../src/components/' + file + '/config.json')
        let configStat = fs.statSync(filePath)
        if(!!configStat && configStat.isFile()){
            let configData = fs.readFileSync(filePath).toString();
            try {
                let parseData = JSON.parse(configData)
                if(!!parseData && !!parseData.api && !!parseData.api.length){
                    routeArr = routeArr.concat(parseData.api)
                }
            } catch(err){
                console.log(err);
            }
        }
    }
})

console.log(routeArr,'routeArr')

//配置路由
routeArr.map(function(apiElem){
    if(apiElem.type.toLowerCase() == 'get'){
        app.get('/baoxian/api' + apiElem.route,function(req,res){
            res.sendFile(path.resolve(__dirname, '../api/'+apiElem.file+'.json'))
        });
    } else {
        app.post('/baoxian/api' + apiElem.route,function(req,res){
            res.sendFile(path.resolve(__dirname, '../api/'+apiElem.file+'.json'))
        });
    }
})

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://' + ip + ':' + port + '/'
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

/**
 * 获取本机IP
 * @return {[string]} [IP地址]
 */
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}


module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
