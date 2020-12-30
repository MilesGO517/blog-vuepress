---
title: Java并发编程
date: 2020-12-23
---

## 参考学习资料

- 《尚硅谷-Java基础》，https://www.bilibili.com/video/BV1Qb411g7cz，P413~P447
  - 入门，主要是一些小DEMO代码
  - 已看完
- 黑马java并发，https://www.bilibili.com/video/BV16J411h7Rd?from=search&seid=5306595816084117552
  - 进阶学习，一定要做好笔记
  - 看到了P63之前
- 《java并发编程实战》
- 慕课网-Java并发编程与高并发解决方案
- thinking-in-java
- on-java-8



## 引言

并发“具有可论证的确定性，但是实际上具有不可确定性”。通过仔细设计和代码审查，编写能够正确工作的并发程序是可能的。

但是在实际情况中，更容易发生的情况是所编写的并发程序在给定适当条件的时候，将会工作失败。这些条件可能从来都不会实际发生，或者发生得不是很频繁，以至于在测试过程中不会碰上它们。实际上，你可能无法编写出能够针对你的并发程序生成故障条件的测试代码。所产生的故障经常是偶尔发生的，并且经常是以客户抱怨的形式出现的。

并发没有像编译器验证或检查型异常这样的安全网，能够在你犯错的时候告知你。使用并发时，你得自食其力，并且只有变得多疑而自信，才能用Java编写出可靠的多线程代码。



Java的线程机制是抢占式的，这表示调度机制会周期性地中断线程，将上下文切换到另一个线程，从而为每个线程都提供时间片，使得每个线程都会分配到数量合理的时间去驱动它的任务。在协作式系统中，每个任务都会自动地放弃控制，这要求程序员要有意识地在每个任务中插入某种类型的让步语句。协作式系统的优势是双重的：上下文切换的开销通常比抢占式系统要低廉许多，并且对可以同时执行的线程数量在理论上没有任何限制。



用并发解决的问题大体上可分为“速度”和“设计可管理性”两种。

### 更快的执行

因为增加了上下文切换的开销，在单处理器上运行的并发程序很可能会比该程序的所有部分顺序执行的开销大；事实上，从性能的角度看，如果没有任务会在阻塞，那么在单处理器上使用并发就没有任何意义；

使这个问题变得有些不同的是阻塞；如果程序中的某个任务因为该程序控制范围之外的某些条件（特别是I/O）而导致不能继续执行，那么我们说这个任务或线程阻塞了。如果没有并发，整个程序都将停止下来，直至外部条件发生变化；

在单处理器系统中的性能提高的常见示例是事件驱动的编程，例如监听用户界面的事件；

实现并发最直接的方式是在操作系统级别使用进程，操作系统会将进程互相隔离开，因此它们不会彼此干涉，这使得用进程编程相对容易一些；与此相反的是，像Java所使用的这种并发系统会共享诸如内存和I/O这样的资源，因此编写多线程程序最基本的困难在于在协调不同线程驱动的任务之间对这些资源的使用，以使得这些资源不会同时被多个任务访问。

### 改进代码设计

并发提供了一个重要的组织结构上的好处，线程能够使你创建更加松散耦合的设计。





### 线程的创建和使用

创建线程的两种基础方法

1、 继承Thread类

2、 实现Runnable接口



开发中优先选择2，

- 实现接口的方式没有类的单继承的局限性

- 实现接口的方式更适合来处理多个线程有共享数据的情况

联系：public class Thread implements Runnable

相同点：两种方式都需要重写run()，将线程要执行的逻辑声明在run()中；通过Thread对象的start()方法来启动这个线程，而非直接调用run()；



已经start的线程不能再次start，否则会抛出IllegalThreadStateException；



方法1 是把线程和任务合并在了一起，方法2 是把线程和任务分开了
用 Runnable 更容易与线程池等高级 API 配合
用 Runnable 让任务类脱离了 Thread 继承体系，更灵活



### Java线程的调度方法

- 同优先级线程组成先进先出队列，使用时间片策略

- 不同优先级的，采用优先级调度的抢占式策略

线程的优先级等级：

- MAX_PRIORITY：10

- MIN_PRIORITY：1

- NORM_PRIORITY：5

线程创建时继承父线程的优先级，低优先级只是获得调度的概率低，并非一定是在高优先级线程之后才被调用；



线程优先级会提示（hint）调度器优先调度该线程，但它仅仅是一个提示，调度器可以忽略它
如果 cpu 比较忙，那么优先级高的线程会获得更多的时间片，但 cpu 闲时，优先级几乎没作用



yeild()和线程优先级的调度都只是对调度器的一种建议/提示（hint），并不会对调度起到决定性的作用；

运行如下代码，注释/取消注释yeild或者线程优先级的代码，查看运行效果，主要是观察两个线程的数字增长快慢；

```java
@Slf4j(topic = "c.Test9")
public class Test9 {

    public static void main(String[] args) {
        Runnable task1 = () -> {
            int count = 0;
            for (;;) {
                System.out.println("---->1 " + count++);
            }
        };
        Runnable task2 = () -> {
            int count = 0;
            for (;;) {
//                Thread.yield();
                System.out.println("              ---->2 " + count++);
            }
        };
        Thread t1 = new Thread(task1, "t1");
        Thread t2 = new Thread(task2, "t2");
//        t1.setPriority(Thread.MIN_PRIORITY);
//        t2.setPriority(Thread.MAX_PRIORITY);
        t1.start();
        t2.start();
    }
}
```





### 线程的同步

1、 同步代码块

synchronized(同步监视器) {

​    同步代码块

​    ……

​    ……

}

同步监视器，即锁，任何一个类的对象都可以充当锁；

在实现Runnable接口的方式中，考虑使用this（当前对象）充当同步监视器；

在继承Thread类的方式中，慎用this充当同步监视器，考虑使用当前类充当监视器

 

2、 同步方法

如果操作共享数据的代码完整的声明在一个方法中，我们不妨将此方法声明为同步方法；

同步方法仍然涉及到同步监视器，只是不需要我们显式的声明

静态的同步方法，默认使用的同步监视器是当前类

非静态的同步方法，默认使用的同步监视器是当前对象

 

所有的非静态同步方法用的都是同一把锁——实例对象本身，也就是说如果一个实例对象的非静态同步方法获取锁后，该实例对象的其他非静态同步方法必须等待获取锁的方法释放锁后才能获取锁，可是别的实例对象的非静态同步方法因为跟该实例对象的非静态同步方法用的是不同的锁，所以毋须等待该实例对象已获取锁的非静态同步方法释放锁就可以获取他们自己的锁。

而所有的静态同步方法用的也是同一把锁——类对象本身，这两把锁是两个不同的对象，所以静态同步方法与非静态同步方法之间是不会有竞态条件的。但是一旦一个静态同步方法获取锁后，其他的静态同步方法都必须等待该方法释放锁后才能获取锁，而不管是同一个实例对象的静态同步方法之间，还是不同的实例对象的静态同步方法之间，只要它们同一个类的实例对象！



一个线程类中的所有静态方法共用同一把锁 类名 class 所有非静态方法共用同一把锁 this；



3、 Lock（锁）

从JDK5.0开始，Java提供了更强大的线程同步机制——通过显式定义同步锁对象来实现同步。同步锁使用Lock对象充当；

java.util.concurrent.locks.Lock接口是控制多个线程对共享资源访问的工具。锁提供了对共享资源的独占访问，每次只能有一个线程对Lock对象加锁，线程开始访问共享资源之前先获得Lock对象；

ReentranLock类实现了Lock，它拥有与synchronized相同的并发性和内存语义，在实现线程安全的控制中，比较常用的是ReentranLock，可以显式加锁、释放锁。

ReentranLock的构造函数，参数fair，表示锁按照竞争的先后顺序分配，显得很公平；



以下是Lock的一个简单使用示例：

```
class A{
    private final ReentrantLock lock = new ReenTrantLock();
    public void m(){
        lock.lock();
        try{
            //
            保证线程安全的代码
        }
        // 注意：如果同步代码有异常，要将unlock() 写入 finally 语句块
        finally{
        	lock.unlock();
        }
    }
}
```





面试题：synchronized与Lock的异同？

相同点：二者都可以解决线程安全问题

不同点：

- sychronized机制在执行完相应的同步代码后，自动的释放同步监视器
  - 释放锁的操作
    - 当前 线程的同步方法、同步代码块 执行结束。
    - 当前 线程在同步代码块、同步方法中遇到 break 、 return 终止了该代码块、该方法的继续执行。
    - 当前 线程在同步代码块、同步方法中出现了未处理的 Error 或 Exception 导致异常结束。
    - 当前 线程在同步代码块、同步方法中执行了线程对象的 wait() 方法，当前线程暂停，并释放锁。
  - 不会释放锁的操作
    - 线程执行同步代码块或同步方法时，程序调用 Thread.sleep 、Thread.yield 方法暂停当前线程的执行
    - 线程执行同步代码块时，其他线程调用了该线程的 suspend() 方法将该线程挂起，该线程不会释放锁（同步监视器）。
      - 应尽量避免使用 suspend() 和 resume() 来控制线程
- Lock需要手动的启动同步（lock），也需要手动的结束同步（unlock）
- Lock只有代码块锁，synchronized有代码块锁和方法锁
- 使用 Lock 锁， JVM 将花费较少的时间来调度线程，性能更好。并且具有更好的扩展性（提供更多的子类）

使用优先级：Lock >>>>>> 同步代码块（已经进入了方法体，分配了相应资源）>>>>>> 同步方法（在方法体之外）



### 线程的死锁

不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃自己需要的同步资源，就形成了线程的死锁；

出现死锁后，不会出现异常，不会出现提示，只是所有的线程都处于阻塞状态，无法继续；

解决办法：

- 专门的算法、原则
- 尽量减少同步资源的定义
- 尽量避免嵌套同步



### JDK5.0新增线程创建方式

1、 实现Callable接口

与使用Runnable相比，Callable功能更强大些

- 相比run()方法，可以有返回值
- 方法可以抛出异常
- 支持泛型的返回值
- 需要借助FutureTask类，比如获取返回结果

Future接口

- 可以对具体Runnable、Callable任务的执行结果进行取消、查询是否完成、获取结果等
- FutureTask是Future接口的唯一的实现类
- FutureTask同时实现了Runnable，Future接口。它既可以作为Runnable被线程执行，又可以作为Future得到Callable的返回值

```java
//1.创建一个实现Callable的实现类
class NumThread implements Callable {
    //2.实现call方法，将此线程需要执行的操作声明在call()中
    @Override
    public Object call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            if(i % 2 == 0){
                System.out.println(i);
                sum += i;
            }
        }
        return sum;
    }
}

public class Demo {
    public static void main(String[] args) {
        //3.创建Callable接口实现类的对象
        NumThread numThread = new NumThread();
        //4.将此Callable接口实现类的对象作为传递到FutureTask构造器中，创建FutureTask的对象
        FutureTask futureTask = new FutureTask(numThread);
        //5.将FutureTask的对象作为参数传递到Thread类的构造器中，创建Thread对象，并调用start()
        new Thread(futureTask).start();

        try {
            //6.获取Callable中call方法的返回值
            //get()返回值即为FutureTask构造器参数Callable实现类重写的call()的返回值。
            Object sum = futureTask.get();
            System.out.println("总和为：" + sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```





2、使用线程池

背景： 经常创建和销毁、使用量特别大的资源，比如并发情况下的线程，对性能影响很大 。

思路： 提前 创建 好多个线程，放入线程池中，使用时直接 获取，使用完放回 池中。可以 避免 频繁创建销毁、实现重复 利用。类似生活中的公共交通工具。

好处：

- 提高响应速度 （减少了创建新线程的时间
- 降低资源消耗 （重复利用线程池中线程，不需要每次都创建
- 便于线程管理
  - corePoolSize ：核心池的 大小
  - maximumPoolSize ：最大线程 数
  - keepAliveTime ：线程没有任务时最多保持多长时间后会 终止

线程池相关API：

- JDK 5.0 起提供了线程池相关 API ExecutorService 和 Executors

- ExecutorService ：真正的线程池 接口。常见子类 ThreadPoolExecutor
  - void execute(Runnable command) ：执行任务 命令，没有返回值，一般用来执行Runnable
  - <T> Future<T> submit(Callable<T> task) task)：执行任务，有返回值，一般又来执行Callable
  - void shutdown() ：关闭连接池
- Executors ：工具类、线程池的工厂类，用于创建并返回不同类型的线程池
  - Executors.newCachedThreadPool ()()：创建一个可根据需要创建新线程的线程池
  - Executors.newFixedThreadPool(n ); 创建一个可重用固定线程数的线程池
  - Executors.newSingleThreadExecutor () ：创建一个只有一个线程的线程池
  - Executors.newScheduledThreadPool(n ))：创建一个线程池，它可安排在给定延迟后运行命令或者定期地执行。

```java
class NumberThread implements Runnable{
    @Override
    public void run() {
        for(int i = 0;i <= 100;i++){
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}

class NumberThread1 implements Runnable{
    @Override
    public void run() {
        for(int i = 0;i <= 100;i++){
            if(i % 2 != 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}

public class Demo {
    public static void main(String[] args) {
        //1. 提供指定线程数量的线程池
        ExecutorService service = Executors.newFixedThreadPool(10);
        ThreadPoolExecutor service1 = (ThreadPoolExecutor) service;
        //设置线程池的属性
//        System.out.println(service.getClass());
//        service1.setCorePoolSize(15);
//        service1.setKeepAliveTime();

        //2.执行指定的线程的操作。需要提供实现Runnable接口或Callable接口实现类的对象
        service.execute(new NumberThread());//适合适用于Runnable
        service.execute(new NumberThread1());//适合适用于Runnable

//        service.submit(Callable callable);//适合使用于Callable
        //3.关闭连接池
        service.shutdown();
    }
}
```



## 主线程和守护线程

默认情况下，Java 进程需要等待所有线程都运行结束，才会结束。有一种特殊的线程叫做守护线程，只要其它非守护线程运行结束了，即使守护线程的代码没有执行完，也会强制结束。

例：

```java
log.debug("开始运行...");
Thread t1 = new Thread(() -> {
    log.debug("开始运行...");
    sleep(2);
    log.debug("运行结束...");
}, "daemon");
// 设置该线程为守护线程
t1.setDaemon(true);
t1.start();
sleep(1);
log.debug("运行结束...");
```

输出：

```
08:26:38.123 [main] c.TestDaemon - 开始运行...
08:26:38.213 [daemon] c.TestDaemon - 开始运行...
08:26:39.215 [main] c.TestDaemon - 运行结束...
```

>垃圾回收器线程就是一种守护线程；
>Tomcat 中的 Acceptor 和 Poller 线程都是守护线程，所以 Tomcat 接收到 shutdown 命令后，不会等待它们处理完当前请求；