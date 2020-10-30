#!/usr/bin/env node
let _ = require('7zip-min'), 
    path =  require('path'),
    meow = require('meow'),
    sp = require('cli-spinner').Spinner,
    chalk = require("chalk"),
    boxen = require("boxen")

const greeting = chalk.hex("#41b883").bold('> VueLite!')

const boxenOptions = {
    margin: {
        top : 1 , 
        bottom : 1 , 
        left: 30
    },
    padding : {
        
    top : 1, 
    bottom : 1 ,
        left: 15, 
        right : 15
    }, 
    borderColor: "#0F0"
};
const msgBox = boxen( greeting, boxenOptions );
let cli  = meow(msgBox)

console.log(cli.help)
let Nm = cli.input[0] , name , spinner

if (Nm) {
    name = chalk.yellow(Nm)
    spinner = new sp(chalk.green('[+] creating app : '+name+' ')+chalk.red.bold(' %s'))
    buid()
}else console.log(chalk.red('[!!] no app name matched '))

function success(){
    spinner.stop(true)
    console.log(`
[+] creating is succesfuly
================================
run :   cd ${name}
        npm start
to start the app 
================================
[!] note : to view the app just serve the dist folder
================================
`)
}

function buid(){
    spinner.setSpinnerString('|/-\\')
    spinner.start()
    _.unpack(
        path.join(__dirname ,'assets','default.7z') , 
        path.join(process.cwd(), Nm) , 
        err=> {
            if (err) throw err
            success()
        })
}