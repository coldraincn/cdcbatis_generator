'use strict'
const stringUtil = require('../utils/stringUtil');

function getHeader(bundleName,poName){
    let name = stringUtil.firstLowerCase(poName);
    let header=
`package ${bundleName}.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import com.juliancj.jlcj.entity.po.${poName};
import com.juliancj.jlcj.service.${poName}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class ${poName}Controller{
    @Autowired
    ${poName}Service ${name}Service;

`
return header
}
function getFind(poName){
    let name = stringUtil.firstLowerCase(poName)
    let findString=
`    @RequestMapping(value = "/admin/${name}/{id}",method=RequestMethod.GET)
    public Result<${poName}> find(@PathVariable(name="id",required=false) int id){
        ${poName} data=${name}Service.find(id);
        Result<${poName}> result=new Result<${poName}>(true,"ok",data);
        return result;
    }

`
return findString
}
function getInsert(poName){
    let name = stringUtil.firstLowerCase(poName)
    let insertString=
`    @RequestMapping(value = "/admin/${name}",method=RequestMethod.POST)
    public Result<Integer> insert(${poName} ${name}){
        ${name}.setCreateTime(Instant.now().toEpochMilli());
        ${name}.setUpdateTime(Instant.now().toEpochMilli());
        int data =${name}Service.insert(${name});
        Result<Integer> result=new Result<Integer>(true,"ok",data);
       return result;
    }

`
return insertString
}
function getUpdate(poName){
    let name = stringUtil.firstLowerCase(poName)
    let updateString=
`    @RequestMapping(value="/admin/${name}/{id}",method=RequestMethod.PUT)
    public Result<Integer> update(${poName} ${name}){
        long updatetime=Instant.now().toEpochMilli();
        ${name}.setUpdateTime(updatetime);
        int data= ${name}Service.update(${name});
        Result<Integer> result=new Result<Integer>(true,"ok",data);
        return result;
    }

`
return updateString
}
function getDelete(poName){
    let name = stringUtil.firstLowerCase(poName)
    let deleteString=
`    @RequestMapping(value="/admin/${name}/{id}",method=RequestMethod.DELETE)
    public Result<Integer> delete(@PathVariable(name="id") int id){
        int data=  ${name}Service.delete(id);
        Result<Integer> result=new Result<Integer>(true,"ok",data);
        return result;
    }

`
return deleteString

}
function getListPage(poName){
    let name = stringUtil.firstLowerCase(poName)
    let pageString=
`    @RequestMapping(value="/admin/${name}",method=RequestMethod.GET)
    public Result<PageInfo<${poName}>> getByPage(@RequestParam("page") int page,@RequestParam("pagesize") int pagesize){
        PageHelper.startPage(page, pagesize);
        List<${poName}> datas = ${name}Service.list();
        PageInfo<${poName}> pageinfo = new PageInfo<${poName}>(datas);
        Result<PageInfo<${poName}>> result=new Result<PageInfo<${poName}>>(true,"ok",pageinfo);
       return result;
  
    }

`
return pageString
}
function getBatchDelete(poName){
    let name = stringUtil.firstLowerCase(poName)
    let deletesString=
`    @RequestMapping(value = "/admin/${name}/deletes",method=RequestMethod.POST)
    public Result<Integer> deletes(String ids){
        int data =${name}Service.batchDelete(ids);
        Result<Integer> result=new Result<Integer>(true,"ok",data);
       return result;
    }

`
return deletesString
}
function getTail(){
    let tail=
    `/****api************************************************* */
        
    }
    `
    return tail
}
module.exports={getHeader,getFind,getDelete,getUpdate,getInsert,getListPage,getBatchDelete,getTail}