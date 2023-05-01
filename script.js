var addButton = document.querySelector(".add");
var modal = document.querySelector(".modal-container");
var close = document.querySelector('.close-button');
var form = document.querySelector('#add-task-form');
var Editbtn=document.getElementById('add-task-btn');


var not_started_arr=[];
var in_progress_arr=[];
var completed_arr=[];
var global_index;
var arrayType;

function modalView(){
    modal.style.display='flex';
}
function modalHide(){
    modal.style.display='none';
}

addButton.addEventListener('click',modalView);

close.addEventListener('click',modalHide);

form.addEventListener('submit',(event)=>{

    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("due-date").value;
    const status = document.getElementById("status").value; 
    console.log(Editbtn.innerText);

    if(Editbtn.innerText=='Edit Task'){

        if(arrayType=='not-started'){

            if(status=='in-progress'){
                var task=not_started_arr.splice(global_index,1);
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                in_progress_arr.push(task);
            }
            else if(status=='completed'){
                var task=not_started_arr.splice(global_index,1);
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                completed_arr.push(task);
            }
            else if(status=='not-started'){
                var task=not_started_arr[global_index];
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                not_started_arr[global_index]=task;
            }
        }


        else if(arrayType=='in-progress'){

            if(status=='in-progress'){
                var task=in_progress_arr[global_index];
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                in_progress_arr[global_index]=task;
            }
            else if(status=='completed'){
                var task=in_progress_arr.splice(global_index,1);
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                completed_arr.push(task);
            }
            else if(status=='not-started'){
                var task=in_progress_arr.splice(global_index,1);
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                not_started_arr.push(task);
            }
        }

        else if(arrayType=='completed'){

            if(status=='in-progress'){
                var task=completed_arr.splice(global_index,1);
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                in_progress_arr.push(task);
            }
            else if(status=='completed'){
                var task=completed_arr[global_index];
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                completed_arr[global_index]=task;
            }
            else if(status=='not-started'){
                var task=completed_arr.splice(global_index,1);
                console.log('heelo',task);
                task.taskName=taskName;
                task.priority=priority;
                task.dueDate=dueDate;
                task.status=status;
                not_started_arr.push(task);
            }
        }
        
        form.reset(); 
        modal.style.display='none';
        taskView();
        Editbtn.innerText='Add Task';
        return;
    }


    addTask(taskName,priority,dueDate,status);

    modal.style.display='none';

    taskView();

    form.reset(); 
})

function addTask(taskName,priority,dueDate,status){
    if(status=='not-started'){
        not_started_arr.push({
            taskName:taskName,
            priority:priority,
            dueDate:dueDate,
            status:status
        })
    }
    else if(status=='in-progress'){
        in_progress_arr.push({
            taskName:taskName,
            priority:priority,
            dueDate:dueDate,
            status:status
        })
    }
    else {
        completed_arr.push({
            taskName:taskName,
            priority:priority,
            dueDate:dueDate,
            status:status
        })
    }

}

function taskView(){

    var notStarted = document.getElementById('not-started');
    var inProgress = document.getElementById('in-progress');
    var completed = document.getElementById('completed');

    notStarted.innerHTML='';
    inProgress.innerHTML='';
    completed.innerHTML='';


    not_started_arr.forEach((ele,index)=>{
        notStarted.innerHTML+=
                         `
                         <li class="task">
                         <div style="font-size: 20px; font-weight: 600;">
                             ${ele.taskName}
                         </div>
                         <div style='${prio(ele.priority)}' class="priority">
                             ${ele.priority}
                         </div>
                         <div class="date">
                             ${ele.dueDate}
                         </div>
                         <div style='${stat(ele.status)}' class="status">
                             ${ele.status}
                         </div>
                         <div class="action">
                           <div title="Edit" onclick="edit(${index},'${ele.status}')">
                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                               <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                             </svg>
                           </div>
                           <div title="Delete" onclick="del(${index},'${ele.status}')">
                             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                               <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                             </svg>
                           </div>
                         </div>
                         <div class="buttons forward">
                           <button  onClick='forward(${index},"${ele.status}")'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                           <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                           </svg>
                           </button>
                         </div>
           
           
             
                     </li>
                         `;
    })
    in_progress_arr.forEach((ele,index)=>{
        inProgress.innerHTML+=
                         `
            <li class="task">
              <div style="font-size: 20px; font-weight: 600;">
                  ${ele.taskName}
              </div>
              <div style='${prio(ele.priority)}' class="priority">
                  ${ele.priority}
              </div>
              <div class="date">
                  ${ele.dueDate}
              </div>
              <div style='${stat(ele.status)}' class="status">
                  ${ele.status}
              </div>
              <div class="action">
                <div title="Edit" onclick="edit(${index},'${ele.status}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                  </svg>
                </div>
                <div title="Delete" onclick="del(${index},'${ele.status}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                </div>
              </div>
              <div class="buttons">
                <button onClick='back(${index},"${ele.status}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg></button>
                <button  onClick='forward(${index},"${ele.status}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
                </button>
              </div>
          </li>
                         `;
    })
    completed_arr.forEach((ele,index)=>{
       
        completed.innerHTML+=
                         `
                         <li class="task">
                         <div style="font-size: 20px; font-weight: 600;">
                             ${ele.taskName}
                         </div>
                         <div style='${prio(ele.priority)}' class="priority">
                             ${ele.priority}
                         </div>
                         <div class="date">
                             ${ele.dueDate}
                         </div>
                         <div style='${stat(ele.status)}' class="status">
                             ${ele.status}
                         </div>
                         <div class="action">
                         <div title="Edit" onclick="edit(${index},'${ele.status}')">
                           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                             <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                           </svg>
                         </div>
                         <div title="Delete" onclick="del(${index},'${ele.status}')">
                           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                           </svg>
                         </div>
                       </div>
                         <div class="buttons">
                           <button onClick='back(${index},"${ele.status}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                             <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                           </svg></button>
                         </div>
                     </li>
                         `;
    })
}


function edit(index,status){
    var btn=document.getElementById('add-task-btn');
    btn.innerText='Edit Task';
    global_index=index;
    arrayType=status;
    modalView();
}

function del(index,status){
    if(status=='not-started'){
        not_started_arr.splice(index,1);
    }
    else if(status=='in-progress'){
        in_progress_arr.splice(index,1);
    }
    else{
        completed_arr.splice(index,1);
    }
    taskView();
}



function prio(priority){
    if(priority=='low'){
        return "background-color:rgb(6, 151, 28);";
    }
    else if(priority=='medium'){
        return "background-color:tomato;";
    }
    else{
        return "background-color:rgb(206, 40, 11)";
    }
}

function stat(status){
    if(status=='not-started'){
        return "background-color:rgb(206, 40, 11)";
    }
    else if(status=='in-progress'){
        return "background-color:tomato;";
    }
    else{
        return "background-color:rgb(6, 151, 28);";
    }
}




function forward(index,status){
    if(status=='not-started'){
        let val = not_started_arr.splice(index,1);
        val[0].status = 'in-progress';
        in_progress_arr.push(val[0]);
        taskView();
        return;
    }
    else if(status=='in-progress'){
        let val = in_progress_arr.splice(index,1);
        val[0].status = 'completed';
        completed_arr.push(val[0]);
        taskView();
        return;
    }

}

function forward(index,status){
    if(status=='not-started'){
        let val = not_started_arr.splice(index,1);
        val[0].status = 'in-progress';
        in_progress_arr.push(val[0]);
        taskView();
        return;
    }
    else if(status=='in-progress'){
        let val = in_progress_arr.splice(index,1);
        val[0].status = 'completed';
        completed_arr.push(val[0]);
        taskView();
        return;
    }

}

function back(index,status){
    if(status=='in-progress'){
        let val = in_progress_arr.splice(index,1);
        val[0].status = 'not-started';
        not_started_arr.push(val[0]);
        taskView();
        return;
    }
    else if(status=='completed'){
        let val = completed_arr.splice(index,1);
        val[0].status = 'in-progress';
        in_progress_arr.push(val[0]);
        taskView();
        return;
    }

}




