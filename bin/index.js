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

//console.log("fdfdfdfdfdf:"+stringUtil.firstLowerCase('AaddddD'))
let questions = [
    {
        type: 'input',
        name: 'bundleName',
        message: 'enter project bundleName?',
    },
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
    ,
    {
        type: 'input',
        name: 'prefix',
        message: 'enter mysql table prefix?',
    }
]



program
    .version('0.0.1')
    .option('-h, --host <host>', 'set mysql host')

program.command('list')
    .description('list database')
    .action(async function () {
        let answers = await inquirer.prompt(questions)
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
        let tableNames=tables[0].map(table=>table.Name);
        let choicequestions = [{
            type: 'checkbox',
            name: 'tables',
            message: 'choose tables which you want to generator?',
            choices: tableNames,
        }]
        let tableanswers = await inquirer.prompt(choicequestions)
        console.log(tableanswers)
        let confirmquestion = [{
            type: 'confirm',
            name: 'generator',
            message: 'do you want to generator?',
        }]
        let confirmanswers = await inquirer.prompt(confirmquestion)
        console.log(confirmanswers)

        // //创建po文件夹
        // var podir = mkdirsSync(__dirname+'./entity/po', 0777);
        // console.log('create ./entity/po' + podir);
        // //mapper文件夹
        // var mapperdir = mkdirsSync('./mapper/provider', 0777);
        // console.log('create ./mapper/provider' + mapperdir);
        // var servicedir = mkdirsSync('./service/impl', 0777);
        // console.log('create ./service/impl' + servicedir);
        // var controllerdir = mkdirsSync('./controller', 0777);
        // console.log('create ./controller' + controllerdir);

         //创建po文件夹
         var podir = mkdirsSync(__dirname+'/entity/po', 0777);
         console.log('create ./entity/po' + podir);
         //mapper文件夹
         var mapperdir = mkdirsSync(__dirname+'/mapper/provider', 0777);
         console.log('create ./mapper/provider' + mapperdir);
         var servicedir = mkdirsSync(__dirname+'/service/impl', 0777);
         console.log('create ./service/impl' + servicedir);
         var controllerdir = mkdirsSync(__dirname+'/controller', 0777);
         console.log('create ./controller' + controllerdir);

        
        //获取表中字段
        for (let table of tableanswers.tables) {
            let cloumns = await connection.query(`show columns from ${table};`)
            //创建po
            createPo(__dirname+'/entity/po/', answers.bundleName, answers.prefix, cloumns[0], table)
            //创建provider
            createProvider(__dirname+'/mapper/provider/', answers.bundleName, answers.prefix, cloumns[0], table)
            //创建mapper
            createMapper(__dirname+'/mapper/', answers.bundleName, answers.prefix, cloumns[0], table)
            //创建service
            createService(__dirname+'/service/', answers.bundleName, answers.prefix, cloumns[0], table)
            //创建serviceImpl
            createServiceImpl(__dirname+'/service/impl/', answers.bundleName, answers.prefix, cloumns[0], table)
            //创建controller
            createController(__dirname+'/controller/', answers.bundleName, answers.prefix, cloumns[0], table)
        }



        // console.log(data2[0])
    })

program.parse(process.argv);

//console.log('use:  --help')
