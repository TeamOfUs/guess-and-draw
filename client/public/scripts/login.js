(function () {

  class Ajax {
    constructor(methon, url, data = null) {
      let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(methon, url);
        xhr.onreadystatechange = function () {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };;
        xhr.send(data);
      });

      return promise
    }

  }


  sub.addEventListener('click', (e) => {
    e.preventDefault();

    let sub = document.getElementById('sub'),
    id = document.getElementById('u').value,
    pwd = document.getElementById('p').value,
    data = {
      'email': id,
      'password': pwd
    };
    document.cookie = 'id' + "=" + id;
    location.href = 'http://localhost:3000/room/test';
//    new Ajax('post', '/api/users', data)
//      .then((data) => {
//        console.log(data);
//        let cookie = {
//          url: '/',
//          name: 'id',
//          value: data.id
//        };
//        cookies.set(cookie);
//      }, (err) => {
//        console.log(err);
//      });
  });
})()
