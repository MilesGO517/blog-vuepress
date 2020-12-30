module.exports = {
  "title": "MilesGO",
  "description": "blog",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "spring-security",
            "link": "/docs/spring-security/"
          },
          {
            "text": "thinking-in-java",
            "link": "/docs/thinking-in-java/"            
          },
          {
            "text": "bpmn-js",
            "link": "/docs/bpmn-js/"            
          },
          {
            "text": "kafka",
            "link": "/docs/kafka/"            
          },
          {
            "text": "java并发",
            "link": "/docs/concurrency-in-java/"            
          },
          {
            "text": "spring-security-practice",
            "link": "http://175.24.53.169/access-control-docs"
          },
          {
            "text": "OnJava8",
            "link": "https://lingcoder.gitee.io/onjava8/#/sidebar"
          },
          {
            "text": "正则表达式30分钟入门教程",
            "link": "https://deerchao.cn/tutorials/regex/regex.htm"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/MilesGO517",
            "icon": "reco-github"
          }
        ]
      },
      {
        "text": "友链",
        "icon": "reco-message",
        "items": [
          {
            "text": "阮一峰的网络日志",
            "link": "http://www.ruanyifeng.com/blog/",
          },
          {
            "text": "PicGO作者北邮学长",
            "link": "https://molunerfinn.com/",
          }
        ]
      }
    ],
    subSidebar: 'auto',
    // "sidebarDepth": 3,
    "sidebar": {
      "/docs/spring-security/": [
        "",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
      ],
      "/docs/thinking-in-java/": [
        "",
        "12",
        "13",
        "14",
        "14.1",
        "14.2",
      ],
      "/docs/bpmn-js/": [
        "",
        "1",
        "2",
      ],
      "/docs/kafka/": [
        "",
        "1",
        "2",
      ],
      "/docs/concurrency-in-java/": [
        "",
        "1",
        "2",
        "3",
      ],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco123321",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "MilesGO",
    "authorAvatar": "/avatar.jpg",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}