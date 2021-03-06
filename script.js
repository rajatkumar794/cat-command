#!/usr/bin/env node

let fs = require("fs");
let cmd = process.argv.slice(2);

function removeLargeSpaces(arr)
{   
    let ans = []
    let flag=0
    for(let x=0; x<arr.length; ++x)
    {
        if(arr[x]=="" || arr[x]=='\r')
        {
            if(flag==0)
            {
                ans.push(arr[x])
                flag=1;
            }
        }
        else
        {
            ans.push(arr[x])
            flag=0
        }
    }
    return ans
}

function executeN(arr)
{   
    for(x in arr)
    arr[x]=(Number(x)+1) +" "+arr[x];
    return arr;
}
function executeB(arr)
{   let num=1;
    for(x in arr)
    {
        if(arr[x]!="\r")
            arr[x]=((num++)+" ")+arr[x];
    }
    return arr;
}
(function () {
    let options = [];
    let files =[];
    let str = "";
    for(let x in cmd)
    {
        if(cmd[x].startsWith('-') && cmd[x].length==2)
            options.push(cmd[x])
        else if(!fs.existsSync(cmd[x]))
        {
            console.log(x+" does not exist");
            return;
        }
        else
            files.push(cmd[x])
    }

    if(files.length==0)
    {
        console.log("No files passed");
        return;
    }
    for(x of files)
    str+=fs.readFileSync(x).toString();
    str=str.split("\n")

    // -s: will remove multiple new lines
    if(options.includes('-s'))
        str=removeLargeSpaces(str)

    // -n : will number all the lines
    // -b : will number text lines
    if(options.includes('-n') && options.includes('-b'))
    {
        if(options.indexOf('-b')<options.indexOf('-n'))
        {
            str=executeB(str);
        }
        else
        {
            str=executeN(str);
        }

    }
    else
    {
        if(options.includes('-n'))
        {
            str=executeN(str);
        }
        else if(options.includes('-b'))
        {
            str=executeB(str);
        }
    }
    // console.log(options);
    // console.log(files);
    console.log(str.join("\n"));
})();
