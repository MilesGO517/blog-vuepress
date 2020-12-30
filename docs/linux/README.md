---
title: linux
date: 2020-12-22
---

## curl

```
-- 查询模板信息
curl -XGET http://localhost:8080/v1/template


-- 查询模板统计结果
curl -XGET http://localhost:8080/v1/template/result

-- 传入调查问卷结果
curl -XPOST -H "Content-Type:application/json; charset=UTF-8" http://localhost:8080/v1/template/report -d \
'{
	templateId:"001",
	result:[
		{"questionId":"1","question":"今天几号","answer":"A"},
		{"questionId":"2","question":"你喜爱的颜色","answer":"B"}
	]
}'

```



netstat -ano | findstr 443