document.addEventListener('DOMContentLoaded',()=>{
//geri ederken input fieldi temizlemek
document.querySelector('#myMesaj').value = '';

//mesajlari yuklemek
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
User_Name = localStorage.getItem('username');
document.querySelector('#username').innerHTML = User_Name;

socket.on('connect',()=>{
  //User_Name = document.querySelector('#username').value;
  User_Name = localStorage.getItem('username');
  Chan_Name = document.querySelector('#Chan_Name').value;

  socket.emit('ForMesajlar',{"User_Name":User_Name,"Chan_Name":Chan_Name});

  document.querySelector('#SendMessage').onsubmit = ()=>{
    let mesaj = document.querySelector('#myMesaj').value;
    let time = new Date();
    socket.emit('ForMesaj',{"User_Name":User_Name,"Chan_Name":Chan_Name,"mesaj":mesaj,"time":time});
  }

});



//mesajlarin siyahi ile yazilmasi
Chan_Name = document.querySelector('#Chan_Name').value;
//User_Name = document.querySelector('#username').value;
User_Name = localStorage.getItem('username');

socket.on(`${Chan_Name}`,data =>{
  document.querySelector('#messages1').innerHTML = '';
  document.querySelector('#messagesO').innerHTML = '';

  //asagidaki array time uygun mesajlari saxlayacaq
  var sortByTime = [];
  for (var variable in data.OthersMesajlar[Chan_Name]) {


        // istifadecileri yazir
        const li = document.createElement('li');
        li.innerHTML = `${variable}`;
        document.querySelector('#messagesO').append(li);


        //istifadecilerin mesajlarini yazir
        for (var j = 0; j <data.OthersMesajlar[Chan_Name][variable].length; j=j+2) {
              const li = document.createElement('li');
              mesaj = data.OthersMesajlar[Chan_Name][variable][j];
              time = data.OthersMesajlar[Chan_Name][variable][j+1];
              // first run this code then try to convert time to number in python code!!!!!

              mytime = Date.parse(time);
              let all ={'time':mytime,'myname':variable,'mesaj':mesaj,'date':'date' };
              sortByTime.push(all);

            }
}


sortByTime.sort(function(a, b) {
    return a.time - b.time;
})

document.querySelector('#messages1').innerHTML = '';
User_Name = localStorage.getItem('username');
for(var i in sortByTime){
    if (sortByTime[i].myname == User_Name) {
      const li = document.createElement('li');
      li.className = 'userMesaj';
      let timE = new Date(sortByTime[i].time).toUTCString()
      //let timE = sortByTime[i].date;

      li.innerHTML = ` ${sortByTime[i].myname} : ${sortByTime[i].mesaj} ${timE}`;
      document.querySelector('#messages1').append(li);
    }
    else {
      const li = document.createElement('li');
      let timE = new Date(sortByTime[i].time).toUTCString();
      //let timE = sortByTime[i].date;
      li.innerHTML = ` ${sortByTime[i].myname} : ${sortByTime[i].mesaj} ${timE}`;
      li.className = `${sortByTime[i].myname}`;
      document.querySelector('#messages1').append(li);

    }

  }

// sort yeniden dolacaq bu na gore asagidakinida bos edirsen ki eyni seyler bir de yazilmasin.
sortByTime = [];

var i = 0;
for (var variable in data.OthersMesajlar[Chan_Name]) {
  i++;
}

counter = localStorage.getItem(`${Chan_Name}`);

if (i!=counter) {
    var counter = 0;
    for (var variable in data.OthersMesajlar[Chan_Name]) {
          //Class a reng yazir
          color = getRandomColor();

          document.querySelectorAll(`.${variable}`).forEach(link =>{
            link.style.color = color;
            localStorage.setItem(`${variable}`,color);

          });
          counter++;
        }
        localStorage.setItem(`${Chan_Name}`,counter);
}
else {
  for (var variable in data.OthersMesajlar[Chan_Name]) {
        document.querySelectorAll(`.${variable}`).forEach(link =>{
        color =  localStorage.getItem(`${variable}`);
        link.style.color = color;
        });
}}
//postun axirincisini gostermek
console.log(window.innerHeight);
console.log(window.offsetHeight);
console.log(window.scrollY);


if (window.innerHeight  <= document.body.offsetHeight-10) {
      window.scrollTo(0,document.body.offsetHeight - window.innerHeight + 2000);
              }



return false;

});

});

//random reng SEC
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function convert(date1,date2) {
  if (date2 <=9) {
    date = `${date1}:0${date2}`;
    return date;
  }
  else {
    date = `${date1}:${date2}`;
    return date;
  }
}
