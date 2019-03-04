const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const Server = require('./system/core/Server');
let server = new Server();



// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

 async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)
  
    const {
      host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
    } = nuxt.options.server
  
    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }
  
    // Give nuxt middleware to express
    app.use(nuxt.render)
  
    server.run(3000,app)
  
  
  }
  start();



