const express = require('express');
const http = require('http');
const Cheetah = require('./Cheetah');



class Server extends Cheetah{
    
    run(port,app){
       
        let defaut_controllers =this.config().default_router();
        let controllers =this.config().list('controller',false);
        let dir_view =this.config().link_dir('view');
        console.log('\x1Bc');
        const info_router = [];
        var i = 0, j = 0;
        info_router['index'] = [];
        info_router['isi'] = [];
    
       
        controllers.list.forEach(function (val, index) {
              
            let controller = require(controllers.path + '/' + val);
    
            if (val === defaut_controllers) {
                app.use('/', controller);
                info_router['index'][i] = controller.stack[0].route.stack[0].method + ' ' + controller.stack[0].route.path;
                i++;
            } else {
                app.use('/' + val.replace('.js', '') + '/', controller);
                info_router['isi'][j] = controller.stack[0].route.stack[0].method + ' ' + val.replace('.js', '') + controller.stack[0].route.path
                j++;
            }
    
        });

        console.log('List Router :');

        info_router['index'].forEach(function (val, index) {
            console.log(val);
        });
    
        info_router['isi'].forEach(function (val, index) {
            console.log(val);
        });

        app.use(function (req, res, next) {
            // var err = new Error('Not Found');
            // err.status = 404;
            // next(err);
            res.send('not found 404');
        });
        
        global.views = function (url_file) {
            return dir_view + '/' + url_file;
        }

        http.createServer(app).listen(port, function () {
            console.log('\x1b[33m' + 'Express server listening on port : ' + '\x1b[32m' + port + '\x1b[0m');
        });
    }
}

module.exports = Server;