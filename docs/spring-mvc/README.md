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

