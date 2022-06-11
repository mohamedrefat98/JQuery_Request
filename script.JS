let div = document.createElement("div");
div.setAttribute("id",'container');
document.body.prepend(div);
let myData=[];


$(document).ready(function(){
    $.ajax({
        type : 'GET',
        url : 'https://jsonplaceholder.typicode.com/posts'
    }).done(function(data,status){
        $('#container').append('<h1> PAGE LOADED SECCESSFULLY</h1>')
        data.forEach(e => {
            myData.push(e);                       
        });
        myData.forEach((e,i) => {
            $('#container').append(insertCard(e));
            $(`#edit-${(i+1)}`).click( () => {
                edit((i+1));
            });
            $(`#remove-${e.id}`).click(function () {
                remove(e.id);
            });

        })
       
        
    }).fail((data) => {
        $('#container').append(`<h1> ERROR ${data.status} ${data.statusText} </h1>`)
    })
    function insertCard(obj) {
        let cardHead = `<h2>${obj.title}</h2>`;
        let cardBody = `<p>${obj.body}</p>`;
        let editBtn = `<button class='edit' id='edit-${obj.id}'>Edit</button>`;
        let removeBtn = `<button class='remove' id='remove-${obj.id}'>Remove</button>`;
        let card = `<div class='card' id='${obj.id}'>${cardHead}${cardBody}${editBtn}${removeBtn}</div>`;
        return card;
      }

      function edit(currentId){
        let objId = currentId
        window.sessionStorage.setItem('objId',objId);
        window.location.href='edit.html';
        return false;
      }
      
      function remove(e) {
        var sure = confirm("DO YOU WANT TO DELETE THIS CARD ?");
        if (sure) {
          $.ajax({
            type: "DELETE",
            url: `https://jsonplaceholder.typicode.com/posts/${e}`,
          })
            .done(function () {
                $(`#${e}`).hide(900);
                myData.splice(e,1);
                console.log(myData)
                setTimeout(() => {
                    alert("DONE!");
                },1000)
            })
            .fail(function (data) {
              alert(`ERROR ${data.status} ${data.statusText}`);
            });
        }
      }
});
   


