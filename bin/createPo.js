'use strict'
const fs = require('fs');
const linehump = require('../lib/utils/stringUtil');
const poTemp = require('../lib/template/poTemp')

/**
 * 
 * @param {路径} pathName 
 * @param {*} bundleName 
 * @param {数据表前缀} prefix 
 * @param {列字段} cloumns 
 * @param {表明} tablename 
 */
async function createPo(pathName,bundleName, prefix, cloumns, tablename) {
    
    //将字段转化成po驼峰式po名
    let poName = linehump.toHump(tablename.slice(prefix.length));
    //
    let header =poTemp.getHeader(bundleName,poName)

    //字段
    let entity = ``
    let action = ``
    for (let cloumn of cloumns) {
        let type = cloumn.Type.split('(')[0]
        let field = linehump.toHump(cloumn.Field);
        let actionName = linehump.firstUpperCase(field)
        switch (type) {
            case 'int':
            case 'tinyint':
            entity += poTemp.getField('Integer',field);
            action += poTemp.getAction('Integer',actionName,field);
                break;
            case 'varchar':
            case 'text':
            entity += poTemp.getField('String',field);
            action += poTemp.getAction('String',actionName,field);
                break;
            case 'bigint':
            entity += poTemp.getField('Long',field);
            action += poTemp.getAction('Long',actionName,field);
                break;
        }
    }

    let tail =poTemp.getTail()
        
    // var w_data = new Buffer(w_data);
    fs.writeFile(`${pathName}${poName}.java`, header + entity + action + tail, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('po写入成功');
    })

}
module.exports = createPo