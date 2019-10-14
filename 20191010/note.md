## 服务器部署

### 服务器部署步骤

- 购买自己的域名
- 域名备案
- 购买服务器
- 配置服务器应用环境
- 安装配置服务器
- 项目远程部署和发布与更新

### 服务器

- 连接服务器
```
    ssh root@IP公网地址
```

- 创建用户
```
    adduser 用户名
```

- 赋予权限 (-a 添加 -d 删除)
```
    gpasswd -a 用户名 sudo
```

- 添加sudo权限
```
    sudo visudo
    vi /etc/sudoers
```
在vim中执行
```
    # User privilege specification
    用户名 ALL=(ALL:ALL) ALL
```

- SSH无密码登录

1.本地生成公钥和私钥
```
    ssh-keygen --help
    cd ~/.ssh
    ssh-keygen -t rsa -b 4096
```

2.开启ssh代理
```
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
```

3.服务器配置
```
    ssh-keygen -t rsa -b 4096
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
```

4.本地公钥上传到服务器授权文件中
```
    vi ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    service ssh restart
```

- 安装软件
```
    apt-get update
    apt-get install wget curl git -y
```

- 安装node
nvm
```
    wget -qO- https:////raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
    . /root/.bashrc
    node -v
    npm i cnpm -g
    npm i nrm -g
```

- 编写node程序

- 启动程序
```
    cnpm install pm2 -g
    pm2 start 服务端文件 --name '名字'
```
pm2常见命令：
```
    pm2 start 启动应用
    pm2 list 查看所有应用
    pm2 restart crawl 重启应用
    pm2 stop crawl 停止应用功能
    pm2 delete crawl 删除应用
```

- nginx

1.安装
```
    apt-get install nginx -y
```

nginx常用命令：
```
    nginx -c /etc/nginx/nginx.conf 启动nginx
    nginx -s stop 关闭nginx
    nginx -s reload -HUP 重启进程
    nginx -s kill -HUP 结束进程号
```