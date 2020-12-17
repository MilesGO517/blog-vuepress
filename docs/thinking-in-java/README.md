---
title: thinking-in-java
date: 2020-12-16
---

## javap

javap是JDK自带的反编译工具；

首先用javac获得.class文件，然后用javap -c指令获取JVM字节码；



*表示非来自Thinking In Java的章节



## length、length()、size()

- **length()** 方法是针对字符串来说的，要求一个字符串的长度就要用到它的length()方法；
- **length 属性**是针对 Java 中的数组来说的，要求数组的长度可以用其 length 属性；
- Java 中的 **size()** 方法是针对泛型集合说的, 如果想看这个泛型有多少个元素, 就调用此方法来查看!

```java
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        String array[] = { "First", "Second", "Third" };
        String a = "HelloWorld";
        List<String> list = new ArrayList<String>();
        list.add(a);
        System.out.println("数组array的长度为" + array.length);
        System.out.println("字符串a的长度为" + a.length());
        System.out.println("list中元素个数为" + list.size());

    }
}
```

