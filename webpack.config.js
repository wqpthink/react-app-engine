const path = require("path");
const fs = require("fs");
const webpackNodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const StringUitl = require("./src/util/StringUtil");

const release_name = "react-app-engine";
const root_path = process.cwd() + "\\src\\component";

/**
 * 包装配置文件
 * @param {*} entry_value
 * @param {*} filename_value
 */
const wrapped_conf = (entry_value, filename_value) => ({
    mode: "none",
    entry: entry_value,
    output: {
        path: path.resolve(__dirname, release_name + "\\dist"),
        filename: filename_value,
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|woff|eot|svg|ttf)$/,
                use: {
                    loader: "url-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
        ]
    },
    externals: [webpackNodeExternals()],
    plugins: []
});

/**
 * 依据指定路径单个进行配置数据
 * @param {string} p
 * @param {Array<string>} exclude
 */
const conf_pack = (p, exclude=[]) => {
    const results = [];
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
            const res = conf_pack(p + "\\" + ps[i], exclude);
            if(typeof res === "string"){//只处理文件,路径则忽略
                let rela_p = res.replace(root_path,"").replace("\\","/");
                const cur_path = path.dirname(rela_p).replace("/","");
                const name = StringUitl.getFileName(rela_p);
                let entry_obj = {};
                entry_obj[name] = res;
                const _conf_ = wrapped_conf(entry_obj, cur_path + "/[name].js");
                results.push(_conf_);
            }
        }
    }
    return results;
}

/**
 * 依据根路径查找生成配置数据
 * @param {string} dir
 * @param {Array<string>} exclude
 */
const conf_handle = (dir,exclude=[]) => {
    const results = [];
    const fs_path_list = fs.readdirSync(dir);
    for(let i=0;i<fs_path_list.length;i++){
        let ps = dir + "\\" + fs_path_list[i];
        const stats = fs.statSync(ps);
        if(stats.isDirectory()){
            const conf = conf_pack(ps, exclude);
            results.push(...conf);
        }
        if(stats.isFile()){
            const _conf_ = wrapped_conf(ps,path.basename(ps));
            results.push(_conf_);
        }
    }
    return results;
}

let confs = conf_handle(root_path,["index.js","style.js"]);
let plugins_new = [
    new CleanWebpackPlugin([release_name]),
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, "package.json"),
            to: path.resolve(__dirname, release_name),
            toType: 'dir',
            transform: (pa) => {
                let package_json = JSON.parse(pa);
                let pa_json = {
                    "name": package_json.name,
                    "version": package_json.version,
                    "author": package_json.author,
                    "license": package_json.license,
                    "main": package_json.main,
                    "devDependencies": package_json.devDependencies,
                    "dependencies": package_json.dependencies,
                    "keywords": package_json.keywords
                }
                return JSON.stringify(pa_json, "\t");
            }
        },
        {
            from: path.resolve(__dirname, "LICENSE"),
            to: path.resolve(__dirname, release_name),
            toType: 'dir'
        },
        {
            from: path.resolve(__dirname, "README.md"),
            to: path.resolve(__dirname, release_name),
            toType: 'dir'
        }
    ])
];
if(confs.length > 0) confs[0].plugins.push(...plugins_new);

module.exports = confs;
