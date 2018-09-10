#!/usr/bin/env node
const program = require("commander")
const mysql = require("mysql2/promise")
const mkdirsSync=require('../lib/utils/createDir')
const createPo = require('./createPo')
const createProvider = require('./createProvider')
const createMapper = require('./createMapper')
//创建po文件夹
var podir = mkdirsSync('./entity/po', 0777);
console.log(podir);
//mapper文件夹
var mapperdir = mkdirsSync('./mapper/provider', 0777);
console.log(mapperdir);
console.log(...[1, 2, 3])


program
    .version('0.0.1')
    .option('-h, --host <host>', 'set mysql host')
    .option('-p, --port', 'set mysql port')
    .option('-u, --user', 'set mysql username')
    .option('-p, --password', 'set mysql password')
    .option('-b, --database', 'set mysql database');
program.command('list')
    .description('list database')
    .action(async function () {
        // const connection=await mysql.createConnection({     
        //     host     : program.host,       
        //     user     : program.user,              
        //     password : program.password,       
        //     port: program.port,                   
        //     database: program.database, 
        //   })
        const connection=await mysql.createConnection({     
            host     : '127.0.0.1',       
            user     : 'root',              
            password : 'jlcj1234',       
            port: '3306',                   
            database: 'jlcj', 
          })
          //获取表
        let data = await connection.query('show table status;')
          //获取表中字段
         let cloumns = await connection.query(`show columns from ${data[0][0].Name};`)
        
         //创建po
        createPo('./entity/po/','com.juluancj.jlcj','jl',cloumns[0],data[0][0].Name)
         //创建provider
         createProvider('./mapper/provider/','com.juluancj.jlcj','jl',cloumns[0],data[0][0].Name)
         //创建mapper
          //创建provider
        createMapper('./mapper/','com.juluancj.jlcj','jl',cloumns[0],data[0][0].Name)
       // console.log(data2[0])
    })

program.parse(process.argv);


