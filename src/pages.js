/**
 * Generate HTML Plugins
 */

const path = require('path');
const fs = require('fs');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

const directories = []
function walkDir(dir, parrent = '') {
    const files = fs.readdirSync(dir)
    for(let x in files){
        let next = path.join(dir,files[x]);
        if(fs.lstatSync(next).isDirectory()==true){
            walkDir(next, parrent+'/'+files[x]);
        }else{
            directories.push([path.parse(files[x]).name, (parrent+'/').slice(1)])
        }
    }
    return directories
}

const pages = {
  generatePages: function generatePages(pagesPath) {

    return walkDir(pagesPath).map(
        name =>
            new NunjucksWebpackPlugin({
                templates: [{
                    from: `${pagesPath}/${name[1]}${name[0]}.njk`,
                    to: `${name[1]}${name[0]}.html`
                }]
            }),
        );
  }
};

module.exports = pages;
