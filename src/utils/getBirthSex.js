//根据身份证号码获取生日和性别
module.exports =  (idCardNo) => {
    var tmpStr = '',
        sexStr = '';
    idCardNo = $.trim(idCardNo);
    if (idCardNo.length == 15) {
        tmpStr = idCardNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(idCardNo.substr(14, 1), 10) % 2 ? "M" : "F";
    } else {
        tmpStr = idCardNo.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
        sexStr = parseInt(idCardNo.substr(16, 1), 10) % 2 ? "M" : "F";
    }
    return {
        birth: tmpStr,
        sex: sexStr
    };
};