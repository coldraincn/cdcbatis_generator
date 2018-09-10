'use strict'
const fs = require('fs');
const mapperTemp = require('../lib/template/mapperTemp')
const linehump = require('../lib/utils/linehump');
/**
 * 
 * @param {路径} pathName 
 * @param {*} bundleName 
 * @param {数据表前缀} prefix 
 * @param {列字段} cloumns 
 * @param {表明} tablename 
 */

function createMapper(pathName,bundleName, prefix, cloumns, tablename){
    let poName = linehump.toHump(tablename.slice(prefix.length));
    let header  = mapperTemp.getHeader(bundleName,poName)
    let getFind = mapperTemp.getFind(tablename,poName)
    let getInsert = mapperTemp.getInsert(tablename,poName,cloumns)
    let getUpdate = mapperTemp.getUpdate(poName)
    let getDlete = mapperTemp.getDelete(tablename)
    let getList = mapperTemp.getList(tablename,poName);
    let getBanchDelete = mapperTemp.getBatchDelete(poName)
    let tail = mapperTemp.getTail()

    fs.writeFile(`${pathName}${poName}Mapper.java`, header + getFind + getInsert + getUpdate+getDlete+getList+getBanchDelete+tail, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('mapper写入成功');
    })
}
module.exports = createMapper