'use strict'
const linehump = require('../utils/linehump');

function getHeader(bundleName, tableName, poName) {
    let name = linehump.firstLowerCase(poName);
    let header =
`package ${bundleName}.mapper.provider;

import ${bundleName}.entity.po.${poName};
import org.apache.ibatis.jdbc.SQL;

public class ${poName}Provider {
    public String update(${poName} ${name}) {
        String sql= new SQL() {
            {
                UPDATE("${tableName}");
`
    return header;

}
function getSetbody(cloumnName,poName,field){
    let name = linehump.firstLowerCase(poName);
    let action = linehump.firstUpperCase(field)
    let setbody=
`                if (${name}.get${action}() != null) {
                    SET("${cloumnName} = #{${field}}");
                }
`
return setbody
}
function getTail(tableName){
    let tail=
`                WHERE("id=#{id}");
            }

        }.toString();
        return sql;
    }
    public String batchDelete(String ids) {
        String deletesql="DELETE FROM ${tableName} where id in ("+ids+")";
        return deletesql;
    }

}
`
return tail
}
module.exports={getHeader,getSetbody,getTail}