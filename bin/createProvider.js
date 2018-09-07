'use strict'
const fs = require('fs');
const linehump = require('../lib/utils/linehump');
const providerTemp = require('../lib/template/providerTemp')
/**
 * 
 * @param {路径} pathName 
 * @param {*} bundleName 
 * @param {数据表前缀} prefix 
 * @param {列字段} cloumns 
 * @param {表明} tablename 
 */
function createProvider(pathName,bundleName, prefix, cloumns, tablename){
     //将字段转化成po驼峰式po名
     let poName = linehump.toHump(tablename.slice(prefix.length));
     let header =providerTemp.getHeader(bundleName,tablename,poName)
     let setBody=''
     //去除id
    
     let newCloumns=linehump.curtail(cloumns)
     for(let cloumn of newCloumns){
        let field = linehump.toHump(cloumn.Field);
        setBody+=providerTemp.getSetbody(cloumn.Field,poName,field)
     }
     let tail =providerTemp.getTail(tablename)

     fs.writeFile(`${pathName}${poName}Provider.java`, header +setBody + tail, 'utf8', function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('provider写入成功');
    })
}
module.exports=createProvider