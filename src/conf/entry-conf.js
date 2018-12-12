const path = require("path");
const fs = require("fs");
const JsonUtil = require('../util/JsonUtil');

/**
 * 依据指定路径下查找指定文件
 * @param {string} p 路径
 * @param {Array<string>} exclude 排除文件
 */
const search = (p, exclude) => {
    let results = {};
    const stats = fs.statSync(p);
    if(stats.isFile()){
        const file_name = path.basename(p);
        const r = exclude.findIndex(i => {
            return i === file_name;
        });
        if(r === -1){//排除
            return p;
        }else{
            return null;
        }
    }
    if(stats.isDirectory()){
        const ps = fs.readdirSync(p);
        for(let i = 0; i < ps.length; i++){
            const res = search(p + "\\" + ps[i], exclude);
            if(typeof res  === "string"){//只处理文件,路径则忽略
                let entry_key = path.basename(res, path.extname(res));
                if(entry_key === "index") {
                    let new_key_array = res.match(/\w+\\\w+\.(jsx|js)/g);
                    new_key = new_key_array[0].replace("/","_").replace("\\","_").replace(/(.jsx|.js)/g, "");
                    entry_key = new_key;
                }
                results[entry_key] = res;
            }
        }
    }
    return results;
}

/**
 * 依据指定路径和后缀名称查找webpack的entry值
 * @param {string} p 查找根路径
 * @param {Array<string>} exclude 排除文件
 */
const entrys = (p, exclude = []) => {
    let entrys = {};
    const components_ps = fs.readdirSync(p);
    for(let i = 0; i < components_ps.length; i++){
        const new_entry = search(p + "\\" + components_ps[i], exclude);
        entrys = JsonUtil.jsonObjectMerge(entrys, new_entry);
    }
    return entrys;
};

module.exports = entrys;
