
let LocalStorageKey = "_JsonToDoList";

let checkKeyExist = (LocalStorageKey in localStorage) ?  true : localStorage.setItem(LocalStorageKey,JSON.stringify([]));

const GetLocalStorageObject = () => {

    return JSON.parse(localStorage.getItem(LocalStorageKey));
}

const SaveLocalStorage = (object) => {

    
    var list_obj = GetLocalStorageObject();

        list_obj.push(object);

        localStorage.setItem(LocalStorageKey,JSON.stringify(list_obj));

}

const GetDateTime = () => {

  var today = new Date(); 

  /** DATE ***/
  let day     = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
  let month   = (today.getMonth()+1) > 9 ? (today.getMonth()+1) : '0' + (today.getMonth()+1);

  let date = day + '/' + month + '/' + today.getFullYear();

  /** TIME ***/
  let minutes = today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
  let seconds = today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();
  let time = today.getHours() + ":" + minutes + ":" + seconds;

  return `${date} ${time}`;

}


const FindTask = (index) => {

  var list_obj = GetLocalStorageObject();

  for(let i in list_obj){
        
        if(i == index){
           
            return list_obj[i];
            break;
        }

  }

  return false;

}


const DeleteTask = (index) => {

  var list_obj = GetLocalStorageObject();

      list_obj.splice(index, 1);

      localStorage.setItem(LocalStorageKey,JSON.stringify(list_obj));

}

const changeTaskStatus = (id,status) => {

  var list_obj = GetLocalStorageObject();

  list_obj = list_obj.map((task,index) => {

     if(index == id) {

          task.status = status === "pending" ? "checked" : "pending";

     }

      return task;

  });


  localStorage.setItem(LocalStorageKey,JSON.stringify(list_obj));


}

const UpdateMyList = () => {


  let updated_list = GetLocalStorageObject();

  let li_content   = '<li id="*id*" class="*class_li*"><span class="task">*task*</span><span class="date">*date*</span><span class="close">×</span></li>';

  let ul_content   =  '';
  updated_list.forEach((taskobj,index) => {

        if(taskobj.task != undefined){

            let new_li_content = li_content.replace("*id*",index);
                new_li_content = new_li_content.replace("*class_li*",taskobj.status);
                new_li_content = new_li_content.replace("*task*",taskobj.task);
                new_li_content = new_li_content.replace("*date*",taskobj.date);

                ul_content += new_li_content;

        }

    });

  document.getElementById("mytaskList").innerHTML = ul_content;


}


UpdateMyList();



document.getElementById("mytaskList").addEventListener("click", function(event) {

  if(event.target && event.target.className == "close") {


    var task_id = event.target.parentNode.id;

    console.log("delete task");

    DeleteTask(task_id);
    UpdateMyList();

  }else{


    if(  ["pending","checked"].includes(event.target.className) ){

        var task_id = event.target.id;
        var status  = event.target.className;

        changeTaskStatus(task_id,status);

        event.target.classList.toggle('checked');
        event.target.classList.toggle('pending');

    }else if( ["task","date"].includes(event.target.className) ){


        var task_id = event.target.parentNode.id;
        var status  = event.target.parentNode.className;

        changeTaskStatus(task_id,status);

        event.target.parentNode.classList.toggle('checked');
        event.target.parentNode.classList.toggle('pending');


    }

  }

});



const newTask = () => {

  document.getElementById('msg_error').style.display = "none";

  var inputTask = document.getElementById("myInput").value;


  if(inputTask != null && inputTask != ""){
    let taskToAdd = {};

        taskToAdd['status'] = "pending";
        taskToAdd['task']   = inputTask;
        taskToAdd['date']   = GetDateTime();

        SaveLocalStorage(taskToAdd);
        UpdateMyList();

        document.getElementById("myInput").value = "";
        document.getElementById('msg_success').style.display = "block";

        setTimeout(function(){

            document.getElementById('msg_success').style.display = "none";

        },2000);


    }else{


          document.getElementById('msg_error').style.display = "block";

    }



}

document.getElementById("myInput").addEventListener("keyup", function(event) {

  if (event.keyCode === 13) {

    event.preventDefault();
    newTask();

  }


});

