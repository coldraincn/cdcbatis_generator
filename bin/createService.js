'use strict'
const fs = require('fs');
const serviceTemp = require('../lib/template/serviceTemp')
const stringUtil = require('../lib/utils/stringUtil');

/**
 * 
 * @param {路径} pathName 
 * @param {*} bundleName 
 * @param {数据表前缀} prefix 
 * @param {列字段} cloumns 
 * @param {表明} tablename 
 */

function createService(pathName,bundleName, prefix, cloumns, tablename){
    let poName = stringUtil.toHump(tablename.slice(prefix.length));
    let header  = serviceTemp.getHeader(bundleName,poName)
    let getFind = serviceTemp.getFind(poName)
    let getDlete = serviceTemp.getDelete()
    let getInsert = serviceTemp.getInsert(poName)
    let getUpdate = serviceTemp.getUpdate(poName)
    let getList = serviceTemp.getList(poName);
    let getBanchDelete = serviceTemp.getBatchDelete()
    let tail = serviceTemp.getTail()

    fs.writeFile(`${pathName}${poName}Service.java`, header + getFind + getInsert + getUpdate+getDlete+getList+getBanchDelete+tail, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('service写入成功');
    })
    
}
module.exports=createService