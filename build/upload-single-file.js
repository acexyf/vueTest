//上传单个文件

let fs = require('fs');
let fetch = require('node-fetch');
let FormData = require('form-data');
let config = require('../config/file.upload');
let path = require('path');


function uploadfile(filePath, callback){

  // console.log(filePath);

  //线上相对路劲地址
  let onLinePath = filePath.replace(/dist/,'');
  //本地文件的绝对地址
  let nativePath = path.resolve(filePath).replace(/\\/g,'/');

  let form = new FormData();
  form.append('bucketName',config.bucketName)
  form.append('key', `${config.projectName}${onLinePath}`);
  form.append('pId',config.pId)
  form.append('file',fs.readFileSync(nativePath).toString('base64'));
  form.append('userToken', config.userToken);

  fetch('http://leonidapi.17usoft.com/v1/leonid/static/uploadfile',{
    method: 'put',
    body: form
  })
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    callback(null, data)
  })
  .catch(function(err){
    callback(err, null);
  })

}

module.exports = uploadfile;