---
title: spring-mvc
date: 2020-12-19
---

## 一些配置和惯用法

### 返回的数据结构

```
{
	code: 0,
	message: "",
	data: {
	
	}
}
```

### 全局配置

例如：

```java
// 枚举与静态常量
public class GlobalConfig {
    public static final Boolean Test = false;

    //windows路径
    public static final String BPMN_PathMapping = "file:D:\\WangJianIDEA_Test\\activiti-imooc\\src\\main\\resources\\resources\\bpmn\\";

    //Liunx路径
    //public static final String BPMN_PathMapping = "file:/root/Activiti/";

    public enum ResponseCode {
        SUCCESS(0, "成功"),
        ERROR(1, "错误");

        private final int code;
        private final String desc;

        ResponseCode(int code, String desc) {
            this.code = code;
            this.desc = desc;
        }

        public int getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }
    }
}

```

### 静态资源路径映射

例如：

```java
@Configuration
public class PathMapping implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //String[] resourceLocation = new String[]{"file:D:\\WangJianIDEA_Test\\activiti-imooc\\src\\main\\resources\\resources\\bpmn\\","classpath:/resources/"};
        registry.addResourceHandler("/**").addResourceLocations("classpath:/resources/");//默认也有这个路径映射
        registry.addResourceHandler("/bpmn/**").addResourceLocations(GlobalConfig.BPMN_PathMapping);
    }
}
```

### API的版本

可以写在Controller类的@RequestMapping注解上

```
@RestController
@RequestMapping(value = "/v1")
public class WechatTemplateController {}
```

### RESTful API中返回的Request ID有什么用？

因为现在很多服务都是分布式的，随着系统复杂度的不断提升，Request ID 可以帮助开发运维人员便捷有效地追踪定位问题。

一般来说，在一个完整的请求中（对外暴露的是一个接口，对内的话可能经过 N 多个子服务），每个子服务共用一个相同的、全局唯一的 Request ID，这样当出现问题时，根据 Request ID 就可以检索到请求当时的各个子服务的日志。

应用 Request ID 的前提是，你得先有一套健全的日志系统。

生成Request ID的代码如下：

```java
private static String genRequestId(){
  return UUID.randomUUID().toString();
}
```

### 跨域的解决方案

https://cloud.tencent.com/developer/article/1513473



