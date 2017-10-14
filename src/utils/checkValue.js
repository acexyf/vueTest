let regs = {
    //手机号
    phone: /^[1][34578][0-9]{9}$/,
    //邮箱
    mail: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    //身份证
    idcard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    //姓名
    username: /^[\u4e00-\u9fa5\sa-zA-Z]{2,100}$/,
    //企业名称
    enterprisename: /^[\u4e00-\u9fa5\sa-zA-Z（）()]{2,}$/,
    //航班号
    flight: /^([a-zA-z]|\d){5,7}$/,
    //登录密码
    loginpwd: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/
};

/**
 * 校验对应的值是否正确
 * 
 * @param {String} type 
 * @param {String} values 
 * @returns Boolean
 */
function checkValue(type, values) {
    let flag = false;
    switch (type) {
        case 'phone':
            flag = regs.phone.test(values);
            break;
        case 'mail':
            flag = regs.mail.test(values);
            break;
        case 'idcard':
            flag = regs.idcard.test(values);
            break;
        case 'username':
            flag = regs.username.test(values);
            break;
        case 'enterprisename':
            flag = regs.enterprisename.test(values);
            break;
        case 'flight':
            flag = regs.flight.test(values);
            break;
        case 'empty':
            flag = !!values;
            break;
        case 'loginpwd':
            flag = regs.loginpwd.test(values);
            break;
        default:
            break;
    }
    return flag;
}


module.exports = checkValue;