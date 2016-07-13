'use strict'
var io = require('socket.io')();
var cookieParser = require('socket.io-cookie');
let rooms = {};
let words = [
  {
    word: '土豆',
    tip: '食物'
}, {
    word: '奥特曼',
    tip: '动漫人物'
},
  {
    word: '显卡',
    tip: '电脑硬件'
  }
];

io.use(cookieParser);

io.on('connection', function (socket) {
  let url = socket.request.headers.referer,
    splited = url.split('/'),
    roomID = splited[splited.length - 1], // 获取房间ID
    cookie = socket.request.headers.cookie;
  //cookie 获取id
  console.log(cookie);
  console.log(cookie['_ga']);

  if (!rooms[roomID]) {
    rooms[roomID] = new Game(roomID);
  } else {
    rooms[roomID].newPlayer(id);
  }

  let game = rooms[roomID];

  socket.on('ready', function (id) {
    game.toggleReady(id);
    if (game.ifAllReady()) {
      game.startGame();
    }
  });
  socket.on('startDraw', function (data) {
    socket.to('room').emit('startDraw', data);
  });
  socket.on('draw', function (data) {
    socket.to('room').emit('draw', data);
  });
  socket.on('endDraw', function (data) {
    socket.to('room').emit('endDraw');
  });
  socket.on('msg', function (data) {
    //getWord
    let ans = rooms[roomID].answer;
    if (data.msg === game.getAns()) {
      socket.to('room').emit('correct', data.id);
      clearTimeout(rooms[roomID].tip);
    } else {
      socket.to('room').emit('msg', data.msg);
    }
  });

});

io.listen(8081);

function Game(roomID) {
  var players = [],
      round = 0,
      roomID = roomID,
      word = '';
  return {
    getPlayer: function (id) {
      console.log('getPlayer');
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
          return players[i];
        }
      }
      return null;
    },
    toggleReady: function (id) {
      console.log('toggleReady');
      let player = null;
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
          player = players[i];
          break;
        }
      }
      player.ready ? player.ready = false : player.ready = true;
    },
    ifAllReady: function () {
      console.log('ifAllReady');
      players.every((item) => {
        return item.ready === true;
      })
    },
    newPlayer: function (id) {
      console.log('newPlayer');

      if (players.length === 8) {
        socket.emit('error', "room full");
        return
      }
      players.push({
        id: id,
        score: 0
      });
      round += 2;
      socket.join(roomID);
      socket.emit('players', players);
    },
    broadcastNewPlayer: function (id) {
      console.log('broadcastNewPlayer');

      socket.to(roomID).emit('newPlayer', id);
    },
    startGame: function () {
      console.log('startGame');

      socket.to(roomID).emit('startGame');
      this.nextRound();
    },
    nextRound: function () {
      console.log('nextRound');

      round--;
      if (round === 0) {
        this.endGame();
      }
      socket.to(roomID).emit('nextDrawer', this.newDrawer());
      socket.to(roomID).emit('nextWord', this.newWord());
      rooms[roomID].tip = setTimeout(function () {
        socket.to(roomID).emit('nextTip', this.newTip());
      }, 15000);
      rooms[roomID].round = setTimeout(function () {
        socket.to(roomID).emit('nextRound');
        this.nextRound();
      }, 60000);
    },
    nextDrawer: function () {
      console.log('nextDrawer');

      if(round > players.length){
        return players[round - players.length - 1];
      }else{
        return players[round - 1].id;
      }
    },
    newWord: function () {
      console.log('newWord');

      let min = 0,
        max = 2;
      newWord = words[Math.random() * (max - min) + min];
      word = newWord;
      return newWord;
    },
    getAns: function () {
      console.log('getAns');

      return word;
    },
    newTip: function () {
      console.log('newTip');

      return rooms[roomID].word.tip;
    },
    endGame: function () {
      console.log('endGame');

      socket.to(roomID).emit('endGame', this.result());
    },
    result: function () {
      console.log('result');

      let score = [];
      players.forEach((item) => {
        let player = {
          id: item.id,
          score: item.score
        };
        score.push(player);
      });
      return score;
    }
  }
}
