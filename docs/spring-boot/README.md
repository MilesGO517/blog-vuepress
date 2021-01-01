---
title: SpringBoot2
date: 2020-12-30
---

## 参考资料

- 尚硅谷SpringBoot2——2020，https://www.bilibili.com/video/BV19K4y1L7MT
  - 目前看到了P21



## 如何学习SpringBoot？

文档入口：

![image-20201231115600489](https://raw.githubusercontent.com/MilesGO517/images/master/20201231115601.png)

文档导航：

![image-20201231120309322](https://raw.githubusercontent.com/MilesGO517/images/master/20201231120310.png)

附录导航：

![image-20201231120410613](https://raw.githubusercontent.com/MilesGO517/images/master/20201231120411.png)

Configuration Metadata：好像是面向IDE开发人员的？



查看版本新特性；

https://github.com/spring-projects/spring-boot/wiki#release-notes

![image-20201231120821140](https://raw.githubusercontent.com/MilesGO517/images/master/20201231120821.png)



## Spring能做什么？

下面是[官网首页](https://spring.io/)的一张图：

![image-20201231104603689](https://raw.githubusercontent.com/MilesGO517/images/master/20201231104610.png)

Serverless：过去是“构建一个框架运行在一台服务器上，对多个事件进行响应”，Serverless则变为“构建或使用一个微服务或微功能来响应一个事件”，做到当访问时，调入相关资源开始运行，运行完成后，卸载所有开销，真正做到按需按次计费。这是云计算向纵深发展的一种自然而然的过程。

Batch：https://www.cnblogs.com/nizuimeiabc1/p/9338165.html



### spring的生态

https://spring.io/projects/spring-boot，左侧导航栏

![image-20201231104814667](https://raw.githubusercontent.com/MilesGO517/images/master/20201231104815.png)

### Spring5的重大升级

响应式编程，和原来的Servlet技术栈完全不同，是一种新的编程范式；国内用的还比较少，普及率不高，暂时可以不学；

![image-20201231115348935](https://raw.githubusercontent.com/MilesGO517/images/master/20201231115350.png)

Spring5开始使用Java8改写底层源码，例如接口的默认实现，代替了原先使用的适配器模式；P2——9:50



## 为什么用SpringBoot

>Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
>
>能快速创建出生产级别的Spring应用



SpringBoot是一个高层框架，是基于Spring的，可以帮我们整合整个Spring技术栈，从配置地狱中解放出来，是框架的框架；

SpringBoot是整合Spring技术栈的一站式框架；

SpringBoot是简化Spring技术栈的快速开发脚手架；

SpringBoot2是基于Spring5的；

SpringBoot创建微服务，SpringCloud将微服务连接起来，形成云；



### SpringBoot的优点

- Create stand-alone Spring applications

- - 创建独立Spring应用

- Embed Tomcat, Jetty or Undertow directly (no need to deploy WAR files)

- - 内嵌web服务器

- Provide opinionated 'starter' dependencies to simplify your build configuration

- - 自动starter依赖，简化构建配置

- Automatically configure Spring and 3rd party libraries whenever possible

- - 自动配置Spring以及第三方功能

- Provide production-ready features such as metrics, health checks, and externalized configuration

- - 提供生产级别的监控、健康检查及外部化配置

- Absolutely no code generation and no requirement for XML configuration

- - 无代码生成、无需编写XML



### SpringBoot的缺点

- 人称版本帝，迭代快，需要时刻关注变化

- 封装太深，内部原理复杂，不容易精通



## 时代背景：微服务、分布式、云原生

### 微服务

[ames Lewis and Martin Fowler (2014)](https://martinfowler.com/articles/microservices.html)  提出微服务完整概念。https://martinfowler.com/microservices/；[中文版介绍](http://blog.cuicc.com/blog/2015/07/22/microservices/)

> In short, the **microservice architectural style** is an approach to developing a single application as a **suite of small services**, each **running in its own process** and communicating with **lightweight** mechanisms, often an **HTTP** resource API. These services are **built around business capabilities** and **independently deployable** by fully **automated deployment** machinery. There is a **bare minimum of centralized management** of these services, which may be **written in different programming languages** and use different data storage technologies.-- [James Lewis and Martin Fowler (2014)](https://martinfowler.com/articles/microservices.html)

- 微服务是一种架构风格
- 一个应用拆分为一组小型服务
- 每个服务运行在自己的进程内，也就是可独立部署和升级
- 服务之间使用轻量级HTTP交互
- 服务围绕业务功能拆分
- 可以由全自动部署机制独立部署
- 去中心化，服务自治。服务可以使用不同的语言、不同的存储技术



### 分布式

P3——3:07；

将微服务部署到各个独立的服务器后，就会出现各种问题，这就是分布式要解决的问题；

![image-20201231114138290](https://raw.githubusercontent.com/MilesGO517/images/master/20201231114139.png)



**分布式的困难：**

远程调用

服务发现

负载均衡

服务容错

配置管理

服务监控

链路追踪

日志管理

任务调度

......



**分布式的解决方案：**

SpringBoot + SpringCloud

![image-20201231114241870](https://raw.githubusercontent.com/MilesGO517/images/master/20201231114242.png)



### 云原生

P3——7:15

可以理解为分布式微服务的运维？

原生应用如何上云。 Cloud Native

### 上云的困难

- 服务自愈
- 弹性伸缩
- 服务隔离
- 自动化部署
- 灰度发布
- 流量治理
- ......

### 上云的解决

![image-20201231114832686](https://raw.githubusercontent.com/MilesGO517/images/master/20201231114833.png)





## SpringBoot HelloWolrd

### 官方文档

https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started

### maven设置

```xml
<mirrors>
      <mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
      </mirror>
  </mirrors>
 
  <profiles>
         <profile>
              <id>jdk-1.8</id>
              <activation>
                <activeByDefault>true</activeByDefault>
                <jdk>1.8</jdk>
              </activation>
              <properties>
                <maven.compiler.source>1.8</maven.compiler.source>
                <maven.compiler.target>1.8</maven.compiler.target>
                <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
              </properties>
         </profile>
  </profiles>
```

### 创建maven工程

### 引入POM依赖

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.4.RELEASE</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

### 创建主程序

```java
/**
 * 主程序类
 * @SpringBootApplication：这是一个SpringBoot应用
 */
@SpringBootApplication
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class,args);
    }
}
```

### 编写业务

```java
@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String handle01(){
        return "Hello, Spring Boot 2!";
    }
}
```

### 测试

直接运行main方法

### 简化配置

application.properties

```properties
server.port=8888
```

### 简化部署

![image-20201231122205162](https://raw.githubusercontent.com/MilesGO517/images/master/20201231122206.png)

```xml
 <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
 </build>
```

把项目打成jar包，直接在目标服务器执行即可。

注意点：

- 取消掉cmd的快速编辑模式



