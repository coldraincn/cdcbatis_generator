'use strict'

const fs = require('fs');
const controllerTemp = require('../lib/template/controllerTemp')
const stringUtil = require('../lib/utils/stringUtil');

/**
 * 
 * @param {路径} pathName 
 * @param {*} bundleName 
 * @param {数据表前缀} prefix 
 * @param {列字段} cloumns 
 * @param {表明} tablename 
 */
function createController(pathName,bundleName, prefix, cloumns, tablename){
    let poName = stringUtil.toHump(tablename.slice(prefix.length));
    let header  = controllerTemp.getHeader(bundleName,poName)
    let getFind = controllerTemp.getFind(poName)
    let getDelete = controllerTemp.getDelete(poName)
    let getInsert = controllerTemp.getInsert(poName)
    let getUpdate = controllerTemp.getUpdate(poName)
    let getListPage = controllerTemp.getListPage(poName);
    let getBanchDelete = controllerTemp.getBatchDelete(poName)
    let tail = controllerTemp.getTail()

    fs.writeFile(`${pathName}${poName}Controller.java`, header + getFind + getInsert + getUpdate+getDelete+getListPage+getBanchDelete+tail, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('controller写入成功');
    })
    
}
module.exports=createController