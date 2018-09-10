'use strict'

const stringUtil = require('../utils/stringUtil');

function getHeader(bundleName,poName){
    let name = stringUtil.firstLowerCase(poName);
    let header=
`package ${bundleName}.service.impl;

import java.util.List;
import ${bundleName}.entity.po.${poName};
import ${bundleName}.jlcj.mapper.${poName}Mapper;
import ${bundleName}.jlcj.service.${poName}Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("${name}Service")
public class ${poName}ServiceImpl implements ${poName}Service {
    @Autowired
    ${poName}Mapper ${name}Mapper;

`
return header
}
function getFind(poName){
    let name = stringUtil.firstLowerCase(poName);
    let findString=
`    @Override
    public ${poName} find(int id) {
    ${poName} data = ${name}Mapper.find(id);
    return data;
}

`
return findString
}
function getDelete(poName){
    let name = stringUtil.firstLowerCase(poName);
    let deleteString=
`    @Override
    public int delete(int id) {
    return ${name}Mapper.delete(id);
}

`
return deleteString
}
function getUpdate(poName){
    let name = stringUtil.firstLowerCase(poName);
    let updateString=
`    @Override
    public int update(${poName} ${name}) {
    return ${name}Mapper.update(${name});
}

`
return updateString
}
function getInsert(poName){
    let name = stringUtil.firstLowerCase(poName)
    let insertString=
`    @Override
    public int insert(${poName} ${name}) {
    ${name}Mapper.insert(${name});
    return ${name}.getId();
}

`
return insertString
}
function getList(poName){
    let name = stringUtil.firstLowerCase(poName)
    let listString=
`    @Override
    public List<${poName}> list() {
    List<${poName}> datas = ${name}Mapper.list();
    return datas;
}

`
return listString
}
function getBatchDelete(poName){
    let name = stringUtil.firstLowerCase(poName)
    let batchDeleteString=
`    @Override
    public int batchDelete(String ids) {
    return ${name}Mapper.batchDelete(ids);

}

`
return batchDeleteString
}
function getTail(){
    let tail=
`/****api************************************************* */
    
}
`
    return tail
}
module.exports={getHeader,getFind,getDelete,getUpdate,getInsert,getList,getBatchDelete,getTail}