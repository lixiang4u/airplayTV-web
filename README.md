# airplayTV

## 配置前端代码
- 拉取前端代码`git clone git@github.com:lixiang4u/airplayTV-web.git`
- 找到文件`src/main.js` 替换 `axios.defaults.baseURL`后的服务器地址

## 前端构建
```code
npm install
npm run build
```

## 配置nginx
- 将web根目录指向 `dist/` 目录

## 启动api服务
- 拉取接口代码`git clone git@github.com:lixiang4u/airplayTV.git`
- 构建并启动服务
```code
go get
go build
chmod +x ./airplayTV
./airplayTV serve
```
