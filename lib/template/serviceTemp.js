'use strict'

const stringUtil = require('../utils/stringUtil');

function getHeader(bundleName,poName){
    let header = 
`package ${bundleName}.service;

import java.util.List;
import ${bundleName}.entity.po.${poName};
public interface ${poName}Service{

`
return header;

}
function getFind(poName){
    let findString=
`    public ${poName} find(int id);
`
return findString;
}
function getDelete(){
    let deleteString=
`    public int delete(int id);
`
return deleteString;
}
function getUpdate(poName){
    let name = stringUtil.firstLowerCase(poName);
    let updateString=
`    public int update(${poName} ${name});
`
return updateString;
}
function getInsert(poName){
    let name = stringUtil.firstLowerCase(poName);
    console.log("poname:"+poName)
    console.log("name:"+name)
    let insertString=
`    public int insert(${poName} ${name});
`
return insertString;
}
function getList(poName){
    let listString=
`    public List<${poName}> list();
`
return listString;
}
function getBatchDelete(){
    let batchDeleteString=
`    public int batchDelete(String ids);
`
return batchDeleteString;
}
function getTail(){
    let tail=
`/****api************************************************* */

}
`
return tail
}
module.exports={getHeader,getFind,getDelete,getUpdate,getInsert,getList,getBatchDelete,getTail}