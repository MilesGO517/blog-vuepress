---
title: Activiti
date: 2020-12-19
---

## Activti基本介绍

Activiti项目是基于Apache License的开源项目；

Activiti7新特性介绍：

- 与SpringBoot更好的原生支持

- 引入SpringSecurity作为用户与角色的默认安全机制，activiti7的maven依赖会自动加入spring security的依赖

- 核心API进行了封装（使用这些API才会经过SpringSecurity的保护）

- 对云发布，分布式支持等

![image-20201219001819855](https://raw.githubusercontent.com/MilesGO517/images/master/20201219001820.png)

可选流程设计器：

- BPMN-JS官方example以及github上各种相关的开源项目（目前来说唯一的推荐）
- [Eclipse安装Activiti插件](https://blog.csdn.net/lovemenghaibin/article/details/50568858)
- [IDEA安装Activiti插件（actiBPM）](https://blog.csdn.net/x15011238662/article/details/86488754)
- Activiti Explorer

SpringBoot整合Activiti7：

- maven依赖，https://activiti.gitbook.io/activiti-7-developers-guide/getting-started/getting-started-activiti-core
- application.yml/.properties中的少量配置（Spring需要在classpath下放置activiti.cfg.xml配置文件）

```properties
spring.activiti.history-level: full
spring.activiti.db-history-used: true
spring.activiti.check-process-definitions: false #自动部署bpmn文件夹下的流程定义文件，这个功能应该关闭
```



在阿里云Maven仓库中搜索Activiti

![image-20201219002031060](https://raw.githubusercontent.com/MilesGO517/images/master/20201219002031.png)



## 不好归类的知识点

流程定义文件里各个元素的id到activiti中就是definitionKey，而activiti中的id是生成的唯一标识（例如uuid）；

 

deployment和processdefinition是一对多的关系（这是activiti的设计，实际上可以设计成一对一的，这样这两个表可以合二为一）；

 

删除processdefinition是通过删除deployment来进行的；



如何合并查ProcessDefinition和Deployment的信息？

自己写sql？

ProcessDefinition的部署时间在Deployment表中



completeTask，Activiti是否会检查当前用户是任务的Assignee？

Activiti中的任务分为待接受任务和待办任务，如果在前端页面去区分这两种任务，用户体验不好，应该在用户提交任务之前，由代码自动完成claim的操作



DueDate?到期后自动执行脚本任务等；



任务的多实例配置

![image-20201219005635694](https://raw.githubusercontent.com/MilesGO517/images/master/20201219005636.png)



## Activiti7新API的使用

ProcessRuntime、TaskRuntime；为了与这两个新API交互，当前登录用户需要有ACTIVITI_USER这个角色；

官方参考资料：https://activiti.gitbook.io/activiti-7-developers-guide/getting-started/getting-started-activiti-core



### 如何在单元测试中获取访问新API的权限

在单元测试的方法中，调用SecurityUtil.logInAs()方法即可；

```java
@Component
public class SecurityUtil {

    private Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    @Autowired
    private UserDetailsService userDetailsService;

    public void logInAs(String username) {

        UserDetails user = userDetailsService.loadUserByUsername(username);
        if (user == null) {
            throw new IllegalStateException("User " + username + " doesn't exist, please provide a valid user");
        }
        logger.info("> Logged in as: " + username);
        SecurityContextHolder.setContext(new SecurityContextImpl(new Authentication() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return user.getAuthorities();
            }

            @Override
            public Object getCredentials() {
                return user.getPassword();
            }

            @Override
            public Object getDetails() {
                return user;
            }

            @Override
            public Object getPrincipal() {
                return user;
            }

            @Override
            public boolean isAuthenticated() {
                return true;
            }

            @Override
            public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

            }

            @Override
            public String getName() {
                return user.getUsername();
            }
        }));
        org.activiti.engine.impl.identity.Authentication.setAuthenticatedUserId(username);
    }
}
```

下面的代码展示了ProcessRuntime的使用：

```java
@SpringBootTest
public class Part8_ProcessRuntime {

    @Autowired
    private ProcessRuntime processRuntime;

    @Autowired
    private SecurityUtil securityUtil;

    //获取流程实例
    @Test
    public void getProcessInstance() {
        securityUtil.logInAs("bajie");
        Page<ProcessInstance> processInstancePage = processRuntime
                .processInstances(Pageable.of(0,100));
        System.out.println("流程实例数量："+processInstancePage.getTotalItems());
        List<ProcessInstance> list = processInstancePage.getContent();
        for(ProcessInstance pi : list){
            System.out.println("-----------------------");
            System.out.println("getId：" + pi.getId());
            System.out.println("getName：" + pi.getName());
            System.out.println("getStartDate：" + pi.getStartDate());
            System.out.println("getStatus：" + pi.getStatus());
            System.out.println("getProcessDefinitionId：" + pi.getProcessDefinitionId());
            System.out.println("getProcessDefinitionKey：" + pi.getProcessDefinitionKey());
        }
    }

    //启动流程实例
    @Test
    public void startProcessInstance() {
        securityUtil.logInAs("bajie");
        ProcessInstance processInstance = processRuntime.start(ProcessPayloadBuilder
                .start()
                .withProcessDefinitionKey("myProcess_ProcessRuntime")
                .withName("第一个流程实例名称")
                //.withVariable("","")
                .withBusinessKey("自定义bKey")
                .build()
        );
    }

    //删除流程实例
    @Test
    public void delProcessInstance() {
        securityUtil.logInAs("bajie");
        ProcessInstance processInstance = processRuntime.delete(ProcessPayloadBuilder
                .delete()
                .withProcessInstanceId("6fcecbdb-d3e0-11ea-a6c9-dcfb4875e032")
                .build()
        );
    }

    //挂起流程实例
    @Test
    public void suspendProcessInstance() {
        securityUtil.logInAs("bajie");
        ProcessInstance processInstance = processRuntime.suspend(ProcessPayloadBuilder
                .suspend()
                .withProcessInstanceId("1f2314cb-cefa-11ea-84aa-dcfb4875e032")
                .build()
        );
    }

    //激活流程实例
    @Test
    public void resumeProcessInstance() {
        securityUtil.logInAs("bajie");
        ProcessInstance processInstance = processRuntime.resume(ProcessPayloadBuilder
                .resume()
                .withProcessInstanceId("1f2314cb-cefa-11ea-84aa-dcfb4875e032")
                .build()
                );
    }

    //流程实例参数
    @Test
    public void getVariables() {
        securityUtil.logInAs("bajie");
        List<VariableInstance> list = processRuntime.variables(ProcessPayloadBuilder
                .variables()
                .withProcessInstanceId("2b2d3990-d3ca-11ea-ae96-dcfb4875e032")
                .build()
        );
        for(VariableInstance vi : list){
            System.out.println("-------------------");
            System.out.println("getName：" + vi.getName());
            System.out.println("getValue：" + vi.getValue());
            System.out.println("getTaskId：" + vi.getTaskId());
            System.out.println("getProcessInstanceId：" + vi.getProcessInstanceId());
        }
    }
}
```

下面的代码展示了TaskRuntime的使用：

```java
@SpringBootTest
public class Part9_TaskRuntime {
    @Autowired
    private SecurityUtil securityUtil;

    @Autowired
    private TaskRuntime taskRuntime;

    //获取当前登录用户任务
    @Test
    public void getTasks() {
        securityUtil.logInAs("wukong");

        Page<Task> tasks = taskRuntime.tasks(Pageable.of(0,100));
        List<Task> list=tasks.getContent();
        for(Task tk : list){
            System.out.println("-------------------");
            System.out.println("getId："+ tk.getId());
            System.out.println("getName："+ tk.getName());
            System.out.println("getStatus："+ tk.getStatus());
            System.out.println("getCreatedDate："+ tk.getCreatedDate());
            if(tk.getAssignee() == null){
                //候选人为当前登录用户，null的时候需要前端拾取
                System.out.println("Assignee：待拾取任务");
            }else{
                System.out.println("Assignee："+ tk.getAssignee());
            }
        }
    }

    //完成任务
    @Test
    public void completeTask() {
        securityUtil.logInAs("wukong");
        Task task = taskRuntime.task("db9c5f80-d3ae-11ea-99e8-dcfb4875e032");
        if(task.getAssignee() == null){
            taskRuntime.claim(TaskPayloadBuilder.claim()
            .withTaskId(task.getId())
            .build());
        }
        taskRuntime.complete(TaskPayloadBuilder
                .complete()
        .withTaskId(task.getId())
        .build());
        System.out.println("任务执行完成");
    }
}



// 查询单个任务
Task task = taskRuntime.task(taskID);
// claim
if (task.getAssignee() == null) {
    taskRuntime.claim(TaskPayloadBuilder.claim().withTaskId(task.getId()).build());
}
// complete
taskRuntime.complete(TaskPayloadBuilder.complete().withTaskId(task.getId())
                     //.withVariable("num", "2")//执行环节设置变量
                     .build());
```



## UEL表达式

Activiti官方关于UEL表达式的介绍在6.0.0的文档中，https://www.activiti.org/userguide/，4.7. Expressions，其中又指向了JAVE EE6的官方教程的EL表达式部分，http://docs.oracle.com/javaee/6/tutorial/doc/gjddd.html。

这个老师说，后面的赋值表达式不会覆盖前面的赋值表达式。



**UEL表达式的使用是结合流程变量的。**



表达式以`${`开始，以`}`结束，例如${day>100}；

支持逻辑运算符；支持变量与实体类赋值；支持算数运算符；



对应Activiti数据表：act_ru_variable、act_hi_varinst历史参数表。



UEL表达式的保留字：

and, eq, gt, instanceof, div, or, le, false, empty, not, lt, ge



如果流程变量中传入了实体类，老师说实体类的属性名必须是全小写？

**实体类要实现序列化接口**



## BPMN2.0网关

BPMN2.0网关：并行网关、排他网关、包容网关、事件网关

 

包容网关和并行网关相比，前者可以设置条件，后者不行；两者画图时，都是成对出现的，有分叉节点和汇集节点；

包容网关和排他网关相比，前者可以有并行的多条出路，后者有且只有一条

 

排他网关在有多条出路的条件满足时，会按照定义的顺序选择一条；如果没有条件满足，则抛出异常；即排他网关有且只有一条出路；

 

什么是事件网关？







## 动态表单

动态表单的两种合理的设置：

1、 整个流程1个表单，每个节点可以设置表单字段的可见性

2、 每个节点1个表单，每个表单字段可以引用前面表单的字段，并设置只读等



## 流程节点的状态分类/高亮显示

例如：

灰色表示办理过的节点

绿色表示我办理过的节点

黄色表示当前停留的节点



## 自定义SQL查询Activiti数据

![image-20201219003656245](https://raw.githubusercontent.com/MilesGO517/images/master/20201219003657.png)



## BPMN-JS

流程设计器BPMN-JS乱码的解决办法

在index.html中的`<head>`标签中，加入`<meta charset="utf-8">`

### 适配我的工作流项目的版本

https://github.com/milesgo-university-projects/activiti_designer



### 从官方example构建的方案

https://github.com/milesgo-university-projects/bpmn-js-integration



### 利用ID传递信息

这种方法很讨巧，但是也不推荐，主要是BPMN-JS的前端properties-panel的代码改起来有难度；

>Activiti7的FormProperties的FormValue都拿不到了？名称、默认值都拿不到？

这个老师说的这一点存疑，拿不到可能是BPMN-JS的问题吧？很可能没有做好和Activiti流程定义文件的转化工作；

![image-20201219005124181](https://raw.githubusercontent.com/MilesGO517/images/master/20201219005125.png)

把这些“拿不到”的信息都放到了字段id上；

是否参数指的是，是否要将当前字段加入到流程变量中； 



### FormValues的bug

默认状态下，字段有一个属性的配置，如下图：

![image-20201219162352477](https://raw.githubusercontent.com/MilesGO517/images/master/20201219162359.png)

生成的xml代码如下：

```java
        <activiti:formProperty id="FormProperty_3egubdh">
          <activiti:properties>
            <activiti:property id="Property_298egaf" />
            <activiti:property id="Property_3i9qeto" />
            <activiti:property id="Property_1pe9tec" />
          </activiti:properties>
        </activiti:formProperty>
```

查看activiti-bpmn-converter的代码可以发现，并没有解析properties这部分的代码；而是有解析`<activiti:value>`的代码；

因此字段的属性不应该通过上图界面中的“属性”来配置；

我们将字段的类型改成enum，如下图

![image-20201219163806465](https://raw.githubusercontent.com/MilesGO517/images/master/20201219163807.png)

有一个“值”的配置，这个配置对应的xml代码如下：

```java
        <activiti:formProperty id="FormProperty_2m7kbjt" type="multi_check" name="喜欢的电影">
          <activiti:value id="Value_282ulkq" name="星际穿越" />
          <activiti:value id="Value_3s9rtla" name="哈利波特" />
          <activiti:value id="Value_3tmclru" name="信条" />
          <activiti:value id="Value_3lkqt5h" name="盗梦空间" />
          <activiti:value id="Value_3pe6jss" name="禁闭岛" />
        </activiti:formProperty>
```

正是我们需要的；

利用浏览器的检查元素，定位到相关代码如下：

```
// [FormData] form field enum values label
group.entries.push(entryFactory.label({
  id: 'form-field-enum-values-header',
  labelText: translate('Values'),
  divider: true,
  showLabel: function(element, node) {
    var selectedFormField = getSelectedFormField(element, node);

    // return selectedFormField && selectedFormField.type === 'enum';  // 修改前，表示只有在enum的时候显示
    return !!getSelectedFormField(element, node); // 修改后，表示一直显示
  }
}));

// [FormData] form field enum values table
group.entries.push(entryFactory.table({
  id: 'form-field-enum-values',
  labels: [ translate('Id'), translate('Name') ],
  modelProperties: [ 'id', 'name' ],
  addLabel:translate('Add Value'),
  show: function(element, node) {
    var selectedFormField = getSelectedFormField(element, node);

    // return selectedFormField && selectedFormField.type === 'enum';  // 修改前，表示只有在enum的时候显示
    return !!getSelectedFormField(element, node); // 修改后，表示一直显示
  },
  ……
}));


  // [FormData] Properties label
  group.entries.push(entryFactory.label({
    id: 'form-field-properties-header',
    labelText: translate('Properties'),
    divider: true,
    showLabel: function(element, node) {
      // return !!getSelectedFormField(element, node);  // 修改前，表示一直显示
      return false; // 修改后，表示不显示
    }
  }));

  // [FormData] activiti:properties table
  group.entries.push(properties(element, bpmnFactory, {
    id: 'form-field-properties',
    modelProperties: [ 'id', 'value' ],
    labels: [ translate('Id'), translate('Value') ],
    getParent: function(element, node) {
      return getSelectedFormField(element, node);
    },
    show: function(element, node) {
      // return !!getSelectedFormField(element, node);  // 修改前，表示一直显示
      return false; // 修改后，表示不显示
    }
  }, translate));
```





## Activiti7Workflow课程

![image-20201219005536348](https://raw.githubusercontent.com/MilesGO517/images/master/20201219005538.png)



这个老师在代码中获取FormProperty是用的task.formKey

​                               ![image-20201219005703916](C:\Users\16417\AppData\Roaming\Typora\typora-user-images\image-20201219005703916.png)

这样要求在BPMN-JS中，将节点ID复制给表单Key；



## BUG汇总

Activiti7的版本从M5开始会自动insert into ACT_RE_DEPLOYMENT一条记录，其Name字段为SpringAutoDeployment；

这个老师说，taskService的提交任务时，提交流程变量，这个变量的值后面不能再被覆盖；但是用taskRuntime提交任务时，提交的流程变量在后面是可以被覆盖的，所以推荐使用后面这种方法；可以看下源代码分析一下。



## 碰到的问题





## 待学习

Activiti高级应用：边界事件、中间事件、子流程