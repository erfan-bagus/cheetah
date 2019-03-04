const path = require('path');
const config_file = require('./../../application/config/config');
const Filefinder = require('./Filefinder');
let filefinder = new Filefinder();
class Config{
    default_router(){
        return config_file.DEFAULT_CONTROLLER;
    }
    list(name,bool){
        if(name=='controller'){
            return filefinder.findFiles(config_file.CONTROLLER_DIR, '.js', bool);
        }else if(name=='model'){
            return filefinder.findFiles(config_file.MODELS_DIR, '.js', bool);
        }else if(name=='view'){
            return filefinder.findFiles(config_file.VIEWS_DIR, '.js', bool);
        }
    }
    link_dir(name){
        if(name=='controller'){
            return filefinder.path_join(path.dirname(require.main.filename),config_file.CONTROLLER_DIR);
        }else if(name=='model'){
            return filefinder.path_join(path.dirname(require.main.filename),config_file.MODELS_DIR);
        }else if(name=='view'){
            return filefinder.path_join(path.dirname(require.main.filename),config_file.VIEWS_DIR); 
        }
    }
}
module.exports=Config;