const JsonUtil = require("./JsonUtil");
module.exports.getFileName = path => {
    let name = null;
    if(typeof path !== 'string') return name;
    let results = [];
    let temp_chars = [];
    for(let i=0; i<path.length; i++){
        let temp_char = path.charAt(i);
        if(temp_char === "\\" || temp_char === "/"){
            if(temp_chars.length > 0) results.push(temp_chars);
            temp_chars = [];
        }else{
            temp_chars.push(temp_char);
        }
        if(i == (path.length -1) && temp_chars.length > 0) results.push(temp_chars);
    }
    if(results.length > 0){
        name = results[results.length-1].join("");
        const last = name.lastIndexOf(".");
        if(last != -1){
            name = name.substring(0,last);
        }
    }
    return name;
}
