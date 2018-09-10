'use strict'

// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}
//首字母大写
function firstUpperCase(str) {
    return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }
//首字母小写
function firstLowerCase(str) {
    return str.replace(/( |^)[A-Z]/g, (L) => L.toLowerCase());
  }

module.exports = {toHump,toLine,firstUpperCase,firstLowerCase};



