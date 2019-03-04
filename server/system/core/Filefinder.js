const fs = require('fs');
const path = require('path');
const url_path = path.dirname(require.main.filename)+'/';

class Filefinder{
    findFiles(url, ext, monitoring) {
        var listmonitoring = [];
        listmonitoring['list'] = [];

        listmonitoring['path'] = url_path + url;
        fs.readdirSync(url_path + url).forEach(function (file, index) {
            if (file.substr(-3) == ext) {

                listmonitoring['list'].push(file);
            }
        });
        if (monitoring == true) { console.log(listmonitoring); }
        return listmonitoring;
    };

    path_join(url1, url2) {
        return path.join(url1, url2);
    };
}

module.exports=Filefinder;