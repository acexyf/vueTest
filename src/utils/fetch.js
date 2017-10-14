//封装发送异步函数

import axios from 'axios';

/**
 * options:object
 *     - url:  string
 *     - type: 'post' | 'get'
 *     - data: object
 */

export default (options) => {
  return new Promise((resolve, reject)=>{

    if(typeof options.type == 'undefined'){
      options.type = 'get';
    } else {
      options.type = options.type.toLowerCase();
    }

    let ajaxData = {
      platform:5,
      // code:'oOCyauB7uj7UyqRpasVYevQmUW54'
    }

    if(typeof options.data != 'undefined'){
      Object.assign(ajaxData, options.data);
    }

    if(options.type == 'get'){
        axios.get(options.url,{
          params: ajaxData
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err)=>{
          console.log(err)
          reject(err);
        })
    } else {
      axios({
        url:options.url,
        method: 'post',
        data: ajaxData
      })
      .then((resp)=>{
        resolve(resp.data);
      })
      .catch((err)=>{
        console.log(err)
        reject(err);
      })

      // axios.post(options.url,{
      //   params:options.data || {}
      // })
      // .then((resp)=>{
      //   resolve(resp.data);
      // })
      // .catch((err)=>{
      //     console.log(err)
      //     reject(err);
      //   })
    }
  })
}






