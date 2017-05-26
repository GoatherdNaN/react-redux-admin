## 前言
> 本工程主要基于react + redux + ant(2.x) + less + ES6/7 + webpack + fetch + react-router实现的SPA后台管理系统模板。还用了Redux的Redux-saga中间件，来集中处理react架构中的异步处理工作。用mockjs做数据模拟。
## 项目说明
> 此项目是本人空余时间搭建的，比较简单，作为对之前做的一个项目的技术Demo。希望大家提供宝贵的意见和建议，谢谢。
## 下载

```
git clone
cd react-redux-antd-admin
npm i
```
## 启动

```
<!--安装前请先确保已安装node和npm-->
npm start   启动项目并启动mock-server
npm run server  测试环境，需手动配置好代理
npm run build   发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件
```
## 目标功能
- 登陆页面（登陆，记住密码，登出）
- 列表界面（增删改查）
- 图表界面（echarts,折线图和饼图）
## 界面如图
![image](https://github.com/GoatherdNaN/react-redux-antd-admin/blob/master/Project%20interfaces/%E5%85%A5%E5%BA%93%E7%AE%A1%E7%90%86.png)
![image](https://github.com/GoatherdNaN/react-redux-antd-admin/blob/master/Project%20interfaces/%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1.png)
