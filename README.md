# shop
### 这几天没时间更新文档，存在一些别的问题要处理我已经申请了一个域名[georgette.top](http://georgette.top/)没有备案，有时候不能访问

## [Node](https://nodejs.org/)基础的[介绍](https://www.runoob.com/nodejs/nodejs-tutorial.html)

[](https://nodejs.org/en/download/releases/)Node

## [MongoDB](https://www.mongodb.com/)

- 官网提供了一种[安装方式](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)按照提示安装即可，不过得电脑提前安装好[Homebrew](https://brew.sh/)才能使用`brew`命令
- 我用的安装方式

  ***

  1.[官网下载](https://www.mongodb.com/download-center/community)安装包，或者使用
  `sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.2.1.tgz` 命令下载

  2.下载完成后的.tgz 安装包放在`/usr/local`目录下面
  使用命令 `sudo mv ~/Downloads/mongodb-macos-x86_64-4.2.1.tgz /usr/local` 移动到安装目录然后使用`sudo tar -zxvf mongodb-macos-x86_64-4.2.1.tgz`解压,最后重命名`sudo mv mongodb-macos-x86_64-4.2.1/ mongodb`

  上面添加[sudo](https://man.linuxde.net/sudo)表示给这个操作添加权限，需要输入开机密码后才能继续

* 启动数据库前创建一个数据库存储目录`sudo mkdir -p /data/db`
* 启动 mongon 在终端进入到`cd /usr/local/mongodb/bin`执行
  `sudo ./mongod`

* 看到终端最后打印出来类似
  `2019-11-29T22:48:38.808+0800 I NETWORK [conn44] end connection 127.0.0.1:55089 (3 connections now open)`表示 MongoDB 正常启动

## 项目的目录结构


```
shop
├── README.md                                   项目描述
├── config                                      基本配置
│   ├── base.js                                 
│   └── mongo.js                                
├── doc                                         文档
│   └── 运行环境.md
├── log4js.json                                 log4j日志
├── logs
│   └── log4jsconnect.log
├── nginx.config                                nginx配置
├── package-lock.json
├── package.json                                package管理
├── server.js                                   程序入口
├── src                                         主要代码
│   ├── common                                  通用目录
│   │   └── validateSchema.js                   参数校验中间件
│   ├── connect
│   │   ├── mongoDB.js                          链接数据库
│   │   └── mongoooseSchema.js                  通用schaema
│   ├── controller                              控制器
│   │   ├── author.js
│   │   ├── shop.js
│   │   └── test.js
│   ├── middleware                              参数middleware
│   │   ├── author.js
│   │   ├── shop.js
│   │   └── test.js
│   ├── model                                   schmea model
│   │   ├── author.js
│   │   └── shop.js
│   ├── router                                  路由接口定义
│   │   ├── author.js
│   │   ├── index.js
│   │   ├── index1.js
│   │   └── shop.js
│   ├── service                                 service
│   │   ├── author.js
│   │   ├── shop.js
│   │   └── test.js
│   └── tool                                    工具函数
│       └── queryDeal.js
├── test.html
└── tree.md                                     整体项目目录
```
