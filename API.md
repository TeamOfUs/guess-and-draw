|消息|--------------|事件|--------------|数据|
--------------------------------------------
C|快速开始|-----------|quickStart|-------|null|
C|创建房间|-----------|createRoom|-------|roomId:string|
C|加入房间|-----------|joinRoom|---------|roomId:string|

S|房间里的其他人都有谁---|getPlayers|-------|[Players]
S|有人加入告诉其他人----|newPlayer|---------|player{id:string,avatar:url(string)}
C|准备|--------------|ready|-------------|id|
S|游戏开始|-----------|startGame---------|null|
S|下一个人------------|nextDrawer---------|null
S|接受词条|-----------|nextWord-----------|null|
S|接受提示|-----------|nextTip------------|null|
S|下一轮|-------------|nextRound----------|null|

C|发送消息---------------|msg|--------------|msg:String|
S|正确答案|--------------|correct|--------------|null|
S|游戏结束|--------------|endGame|--------------|result{id:string,score:number|

标注C/S是发送方是哪方
=.= 好像没Markdown什么事。。。
