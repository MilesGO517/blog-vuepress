---
title: kafka
date: 2020-12-18
---

kafka，a distributed streaming platform，并不是一个纯粹的消息系统，只不过我们可以把它当做消息系统用；

基于zookeeper；具有高吞吐率、高性能、实时及高可靠等特点；



![image-20201218060932557](https://raw.githubusercontent.com/MilesGO517/images/master/20201218060933.png)

![image-20201218061018742](https://raw.githubusercontent.com/MilesGO517/images/master/20201218061019.png)



![image-20201218061159051](https://raw.githubusercontent.com/MilesGO517/images/master/20201218061200.png)



安装环境：

![image-20201218064340838](C:\Users\16417\AppData\Roaming\Typora\typora-user-images\image-20201218064340838.png)

1、jdk的安装略；

2、zookeeper解压到安装目录，从conf/zoo-sample.cfg复制得到配置文件zoo.cfg，./bin/zkServer.sh start启动

3、kafka解压到安装目录，修改配置文件中的必要内容

1、启动Kafka
bin/kafka-server-start.sh config/server.properties &

2、停止Kafka
bin/kafka-server-stop.sh

3、创建Topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic jiangzh-topic

4、查看已经创建的Topic信息
bin/kafka-topics.sh --list --zookeeper localhost:2181

5、发送消息
bin/kafka-console-producer.sh --broker-list 175.24.53.169:9092 --topic jiangzh-topic

6、接收消息
bin/kafka-console-consumer.sh --bootstrap-server 175.24.53.169:9092 --topic jiangzh-topic --from-beginning

{"orderId":"002","price":"80"}



启动zookeeper碰到的问题，8080端口被占用

https://blog.csdn.net/gloriaied/article/details/103188940

启动kafka碰到的问题，内存不足

https://www.cnblogs.com/zjfjava/archive/2004/01/13/10325523.html





熟练掌握构建Kafka之Java客户端

了解Kafka客户端类型及其区别

熟练掌握Kafka客户端的基本操作



![image-20201218074353567](C:\Users\16417\AppData\Roaming\Typora\typora-user-images\image-20201218074353567.png)

![image-20201218074405825](C:\Users\16417\AppData\Roaming\Typora\typora-user-images\image-20201218074405825.png)