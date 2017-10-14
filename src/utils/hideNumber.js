//隐藏邮箱、手机或者证件号码
//type：email邮箱
//      phone手机 
//      card普通证件号码 
//      idcard身份证号码
//number：号码
module.exports = (type = '', numbers = '') => {
    let result = '';
    switch (type) {
        case 'email':
            {
                let index = numbers.indexOf('@');
                if (index > 3) {
                    let head = numbers.substring(0, 2);
                    let tail = numbers.substring(index - 1);
                    result = `${head}****${tail}`;
                } else {
                    let target = numbers.substring(index - 1)
                    result = `****${target}`;
                }
            }
            break;
        case 'phone':
            {
                result = numbers.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
            break;
        case 'card':
            {
                if (numbers.length > 5) {
                    let head = numbers.substr(0, 3);
                    let tail = numbers.substr(-2, 2);
                    result =`${head}****${tail}`;
                } else {
                    result = numbers;
                }
            }
            break;
        case 'idcard':
            {
                let head = numbers.substr(0, 3);
                let tail = numbers.substr(-2);
                result = `${head}*************${tail}`;
            }
            break;
        default:
            break;
    }
    return result;
}