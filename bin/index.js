#!/usr/bin/env node

for(var i in process.argv){
    if(i>1){
        console.log(process.argv[i]);
    }
}
