'use strict'

function getHeader(bundleName,poName){
    let header=
`package ${bundleName}.entity.po;

import java.io.Serializable;

public class ${poName} implements Serializable{
    private static final long serialVersionUID = 1L;
`
    return header
}
function getField(type,name){
    let field = `    private ${type} ${name};\n`;
    return field;
}
function getAction(type,actionName,name){
    let action = 
`    public ${type} get${actionName}() {
        return this.${name};
    }

    public void set${actionName}(${type} ${name}) {
        this.${name} = ${name};
    }\n`;
    return action;
}
function getTail(){
    return `}`
}
module.exports={getHeader,getField,getAction,getTail}

