#!/usr/bin/env node

if(process.argv.length>2){
    for(var i in process.argv){
        if(i>1){
            console.log(process.argv[i]);
        }
    }
}else{
    console.log('help');
}
