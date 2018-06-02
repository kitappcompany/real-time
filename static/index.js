
document.addEventListener('DOMContentLoaded', ()=>{
// username add edir flask a
//  var username = document.querySelector('#username').value;

//username.length == 0
  alert("This web site may not work due to free server! This is for only test");
  if (!localStorage.getItem('username')) {
    username = prompt("enter name:", '');

    const request = new XMLHttpRequest();
    request.open('POST','/addName')

    localStorage.setItem('username',username);
    username = localStorage.getItem('username');
    const data = new FormData();
    data.append('username',username);
    request.send(data);

    request.onload = ()=>{
      const nameOfUser = JSON.parse(request.responseText);
      document.querySelector("#UserName").innerHTML = nameOfUser.cavab;
    }

  }
    document.querySelector("#UserName").innerHTML = localStorage.getItem('username');
;
// burda bitir flask name

// add a channel
document.querySelector('#Button').onclick = ()=>{
  var c_name = prompt("Type name for Channel: ", "");

  const c_request = new XMLHttpRequest();
  c_request.open('POST','/addChannel');

  c_request.onload = ()=>{
    const data_res = JSON.parse(c_request.responseText);
      if (data_res.cavab) {
      }
      else {
        alert(`You already have a channel named ${c_name}`);
      }
  }

  const c_data = new FormData();
  c_data.append('c_name',c_name);
  c_request.send(c_data);
}
// the end for adding channel

    document.querySelectorAll('.linkButton').forEach(link =>{
      link.onclick = ()=>{
        //  alert(`${link.dataset.chan}`);
        const view_request = new XMLHttpRequest();
        view_request.open('POST','/view_chan');

        view_request.onload = ()=>{
          const data_view = JSON.parse(view_request.responseText);
          //document.querySelector('#chat_html').innerHTML = data_view;
          if (data_view.success) {

          }
          else if (data_view.success == '2') {
            alert("Channel name added with username")
          }
          else if (data_view.success == '3') {
            alert("only usernmae added")
          }
          else {
            alert("somethin went wrong");
          }
        }
        username = localStorage.getItem('username');
        const data_view = new FormData();
        data_view.append('NameChannel',link.dataset.chan);
        data_view.append('username',username);
        view_request.send(data_view);
      };
    });
});//DOMContentLoaded son
