const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const JsonUtil = require('../util/JsonUtil');

/**
 * 依据指定路径下查找指定文件
 * @param {string} p 路径
 * @param {Array<string>} include 包含文件
 */
const search = (p, include) => {
    let results = [];
    const stats = fs.statSync(p);
    if(stats.isFile()){
        const file_name = path.basename(p);
        const r = include.findIndex(i => {
            let regex = new RegExp("\w?" + i);
            return regex.test(file_name);
        });
        if(r > -1){//包含
            return p;
        }else{
            return null;
        }
    }
    if(stats.isDirectory()){
        const ps = fs.readdirSync(p);
        for(let i = 0; i < ps.length; i++){
            const res = search(p + "\\" + ps[i], include);
            if(typeof res === "string"){//只处理文件,路径则忽略
                let new_key_array = res.match(/\w+\\\w+\.(jsx|js)/g);
                let new_key = new_key_array[0].replace("/","_").replace("\\","_").replace(/(.jsx|.js)/g, "");
                results.push(new HtmlWebpackPlugin({
                    template: "./src/template.html",
                    filename: "html/" + new_key + ".html",
                    chunks: [new_key]
                }));
            }
        }
    }
    return results;
}

/**
 * 依据指定路径和后缀名称查找webpack的htmlwebpackplugin值
 * @param {string} p 查找根路径
 * @param {Array<string>} include 包含文件
 */
const htmls = (p, include = []) => {
    let results = [];
    const components_ps = fs.readdirSync(p);
    for(let i = 0; i < components_ps.length; i++){
        const new_htmls = search(p + "\\" + components_ps[i], include);
        if(new_htmls instanceof Array){
            results = JsonUtil.jsonArrayMerge(results, new_htmls)
        }
    }
    return results;
};

module.exports = htmls;
