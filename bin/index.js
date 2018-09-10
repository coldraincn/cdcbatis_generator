#!/usr/bin/env node
const program = require("commander")
var inquirer = require('inquirer')
const mysql = require("mysql2/promise")
const mkdirsSync = require('../lib/utils/createDir')
const createPo = require('./createPo')
const createProvider = require('./createProvider')
const createMapper = require('./createMapper')
const createService = require('./createService')
const createServiceImpl = require('./createServiceImpl')
const createController = require('./createController')
const stringUtil = require('../lib/utils/stringUtil');
//创建po文件夹
var podir = mkdirsSync('./entity/po', 0777);
console.log(podir);
//mapper文件夹
var mapperdir = mkdirsSync('./mapper/provider', 0777);
console.log(mapperdir);
var servicedir = mkdirsSync('./service/impl', 0777);
console.log(servicedir);
var controllerdir = mkdirsSync('./controller', 0777);
console.log(controllerdir);
//console.log("fdfdfdfdfdf:"+stringUtil.firstLowerCase('AaddddD'))
let questions = [
    {
        type: 'input',
        name: 'host',
        message: 'enter mysql host?',
    },
    {
        type: 'input',
        name: 'port',
        message: 'enter mysql port?',
    },
    {
        type: 'input',
        name: 'user',
        message: 'enter mysql user?',
    },
    {
        type: 'input',
        name: 'password',
        message: 'enter mysql password?',
    },
    {
        type: 'input',
        name: 'database',
        message: 'enter mysql database?',
    }
]
let bundleName = 'com.juluancj.jlcj'
let prefix = 'jl'


program
    .version('0.0.1')
    .option('-h, --host <host>', 'set mysql host')
    .option('-p, --port <port>', 'set mysql port')
    .option('-u, --user <user>', 'set mysql username')
    .option('-w, --password <password>', 'set mysql password')
    .option('-b, --database <database>', 'set mysql database');
program.command('list')
    .description('list database')
    .action(async function () {
        let answers=await inquirer.prompt(questions)
        console.log(answers)
        const connection = await mysql.createConnection({
            host: answers.host,
            user: answers.user,
            password: answers.password,
            port: answers.port,
            database: answers.database,
        })
      
      
        //获取表
        let tables = await connection.query('show table status;')
        //获取表中字段
        for (let table of tables[0]) {
            let cloumns = await connection.query(`show columns from ${table.Name};`)
            //创建po
            createPo('./entity/po/', bundleName, prefix, cloumns[0], table.Name)
            //创建provider
            createProvider('./mapper/provider/', bundleName, prefix, cloumns[0], table.Name)
            //创建mapper
            createMapper('./mapper/', bundleName, prefix, cloumns[0], table.Name)
            //创建service
            createService('./service/', bundleName, prefix, cloumns[0], table.Name)
            //创建serviceImpl
            createServiceImpl('./service/impl/', bundleName, prefix, cloumns[0], table.Name)
            //创建controller
            createController('./controller/', bundleName, prefix, cloumns[0], table.Name)
        }



        // console.log(data2[0])
    })

program.parse(process.argv);

//console.log('use:  --help')
