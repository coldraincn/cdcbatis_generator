'use strict'

const fs = require('fs');
const serviceImplTemp = require('../lib/template/serviceImplTemp')
const stringUtil = require('../lib/utils/stringUtil');

/**
 * 
 * @param {路径} pathName 
 * @param {*} bundleName 
 * @param {数据表前缀} prefix 
 * @param {列字段} cloumns 
 * @param {表明} tablename 
 */

function createServiceImpl(pathName,bundleName, prefix, cloumns, tablename){
    let poName = stringUtil.toHump(tablename.slice(prefix.length));
    let header  = serviceImplTemp.getHeader(bundleName,poName)
    let getFind = serviceImplTemp.getFind(poName)
    let getDlete = serviceImplTemp.getDelete(poName)
    let getInsert = serviceImplTemp.getInsert(poName)
    let getUpdate = serviceImplTemp.getUpdate(poName)
    let getList = serviceImplTemp.getList(poName);
    let getBanchDelete = serviceImplTemp.getBatchDelete(poName)
    let tail = serviceImplTemp.getTail()

    fs.writeFile(`${pathName}${poName}ServiceImpl.java`, header + getFind + getInsert + getUpdate+getDlete+getList+getBanchDelete+tail, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('serviceImpl写入成功');
    })
    
}
module.exports=createServiceImpl