const ajax = require('./ajax');
(function(){
  let sub = document.getElementById('sub'),
      id = document.getElementById('u').value,
      pwd = document.getElementById('p').value,
      data = {
        'id':id,
        'pwd':pwd
      };
      data = JSON.stringify(data);
  sub.addEventListener('click',(e)=>{
    e.preventDefault();
    ajax('post','/api/users',data)
      .then((data)=>{
      console.log(data);
      let cookie = {
        url:'/',
        name:'id',
        value:data.id
      };
      cookies.set(cookie);
    },(err)=>{
      console.log(err);
    });
  });
})()
