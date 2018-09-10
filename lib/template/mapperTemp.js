'use strict'
const linehump = require('../utils/stringUtil');

function getHeader(bundleName,poName){
    let header=
`package ${bundleName}.mapper;
import java.util.List;

import ${bundleName}.entity.po.${poName};
import ${bundleName}.mapper.provider.${poName}Provider;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.UpdateProvider;

@Mapper
public interface ${poName}Mapper{
`
return header
}
function getFind(tableName,poName){
    let findString=
`    @Select(value = { "SELECT * FROM ${tableName} WHERE id = #{id}" })
    ${poName} find(int id);

`
    return findString
    
}
function getInsert(tableName,poName,cloumns){
    let pofields=[...cloumns]
    pofields.shift()
    
    let pofieldString=pofields.map(field=>'#{'+linehump.toHump(field.Field)+'}').join()

    //pofieldString=pofields.map('#{'+linehump.toHump+'}').join()
    let fields=[...cloumns]
    fields.shift()
    let fieldString=fields.map(field=>field.Field).join()
    let name = linehump.firstLowerCase(poName);
    let insertString=
`    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert(value = { "INSERT INTO ${tableName}(${fieldString}) VALUES (${pofieldString})" })
    Integer insert(${poName} ${name});

`
return insertString
}
function getUpdate(poName){
    let name = linehump.firstLowerCase(poName);
    let updateString=
`    @UpdateProvider(type=${poName}Provider.class,method="update")
    int update(${poName} ${name});

`
return updateString
}
function getDelete(tableName){
    let deleteString =
`    @Delete(value = { "DELETE FROM ${tableName} WHERE id=#{id}" })
    int delete(int id);

`
return deleteString
}
function getList(tableName,poName){
    let listString =
`    @Select(value = { "SELECT * FROM ${tableName}" })
    List<${poName}> list();

`
return listString
}
function getBatchDelete(poName){
    let dbString=
`    @DeleteProvider(type=${poName}Provider.class,method="batchDelete")
    int batchDelete(String ids);

`
return dbString
}
function getTail(){
    let tailString=
`}`
return tailString
}
module.exports={getHeader,getFind,getInsert,getUpdate,getDelete,getList,getBatchDelete,getTail}