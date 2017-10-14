//上传静态文件资源
let fs = require('fs');
let glob = require('glob');
let Bagpipe = require('bagpipe');
let uploadfile = require('./upload-single-file');

exports.uploadStaticAsset = () => {
    glob('dist/**',{
      nodir: true
    },(err, files) => {
      let bagpipe = new Bagpipe(100);
    
      files.map((file)=>{
        bagpipe.push(uploadfile, file, (err, data) => {
          if(bagpipe.active == 0){
            console.log('上传完成...');
          }
        })
      })
    })
}




