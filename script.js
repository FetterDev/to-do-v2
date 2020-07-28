jQuery(document).ready(function () {
    let taskListHolder = new Array();
    $(document).on('click', '#add-task-button', function () {
        let tabKiller = $("#new-task-text").val();
        let taskText = tabKiller.trim();
        // $("#new-task-text").val = taskText;
        if (taskText.length != 0) {
            let taskObject = new Object();
            idTemp = Date.now();
            taskObject.text = taskText;
            taskObject.id = idTemp;
            taskObject.status = false;
            taskListHolder.push(taskObject);
            $("#new-task-text").val("");
            $("#to-do-list").children().remove();
            render(taskListHolder);
        }
        else {
            $("#new-task-text").val("");
        }


    });

    function activeTaskHolder() {
        $("#taskCounter >").remove();
        let tempActiveTaskHolder = $(":checkbox:checked").length;
        let activeTaskHolder = taskListHolder.length - tempActiveTaskHolder;
        let taskCounterText = "task";
        if(activeTaskHolder>0){
            $(".pick-all-button").attr('style', 'opacity: 1;');
            if (activeTaskHolder > 1) taskCounterText = "tasks"
            $("#taskCounter").append(` <span> Need do ${activeTaskHolder} ${taskCounterText}</span> `);
        }else{
           // $(".pick-all-button").attr('style', 'opacity: 1;'); maybe done it lately
        }
    
    }

    function render(array) {
        let tempStr = "";
        if (array.length > 0) {
            $.each(array, function (index, value) {
                tempHolderArrayElm = value;
                let tempHolderText = tempHolderArrayElm.text;
                let tempHolderId = tempHolderArrayElm.id;
                let tempHolderStatus = tempHolderArrayElm.status;
                let checked = '';
                
                if (tempHolderStatus) {
                    checked = 'checked';
                }

                    tempStr=  tempStr + `<li class=list-decorate id=${tempHolderId}>
                        <input id=task-checkbox type=checkbox  ${checked} class=task-check >
                        <span  class=task-txt white-space:pre-line word-break=break-all id=spanId>${tempHolderText} </span>
                        <input type=button class=task-delete-button value=Delete >
                        <br/>
                    </li>`;

                if (tempHolderStatus) {
                    $(`#${tempHolderId} .task-txt`).addClass("done-task-decoration");
                } else {
                    $(`#${tempHolderId} .task-txt`).removeClass("done-task-decoration");
                };
                

            });
            let pageCounter= Math.floor(taskListHolder.length / 8);
            
            if(taskListHolder.length>5){
                paginationFunc(pageCounter);
            }
            $("#to-do-list").append(`${tempStr}`);
        }

        activeTaskHolder()
    };

    /*function paginationFunc(counter){
        $(".bottom-button").append(`<a><span> ${counter}</span></a>`)
        console.log("11")
    }
    */





    $(document).on("click", "#pick-all-button", function () {
       
        let AllTaskCheckboxList = $(".task-check");
        console.log(AllTaskCheckboxList);
        $.each(AllTaskCheckboxList,function(index,value){
            let tempAllTaskStringIdHolder = $(this).parent().attr("id");
            let tempAllTaskIndexHolder=GetIndexElem(tempAllTaskStringIdHolder);
            let tempArrayElement = taskListHolder[tempAllTaskIndexHolder];
            if(tempArrayElement.status===false){
                tempArrayElement.status=true;
            };
            $("#to-do-list").children().remove(); 
            render();
        });
        activeTaskHolder();//
        
    });
    
    $(document).on("click", ".task-delete-button", function () {
        let tempElmTaskIdHolder = $(this).parent();
        tempTaskIdHolder = tempElmTaskIdHolder.attr("id");
        let deleteTaskIdHolder = parseInt(tempTaskIdHolder.replace(/[^\d]/g, ''));
        let deleteTaskArrayIndexHolder = taskListHolder.findIndex(item => item.id == deleteTaskIdHolder);
        taskListHolder.splice(deleteTaskArrayIndexHolder, 1);
        $(this).parent().remove();
        $("#to-do-list").children().remove();
        render()
        activeTaskHolder();
    });

    $("#body-id").keydown(function (event) {
        if (event.keyCode == 13) {
            $(".task-edit-button").click();
            $("#add-task-button").click();
        } 
    });
    $(document).on("dblclick",".task-txt", function(){
            console.log(this)
            let tempSpanParentStringIdHolder= $(this).parent().attr("id");
            let indexSpanParent = GetIndexElem(tempSpanParentStringIdHolder);
            $(this).replaceWith(`<input id=temp-txt-editor  value="${this.innerText}" type=text> </input>`)
            
            $("#body-id").keydown(function (event) {
                if (event.keyCode == 13 ) {
                   
                    let tempInputValueHolder= $("#temp-txt-editor").val()
                    taskListHolder[indexSpanParent].text = tempInputValueHolder;
                    $("#to-do-list").children().remove(); 
                    render();
                } 
            });
    });
    
//переделать то что ниже до codereview
    $(document).on('click', '.task-check', function () {
        if ($(this).is(':checked')) {
            $(this).siblings('.task-txt').addClass("done-task-decoration");
            let tempElmCheckboxIdHolder = $(this).parent();
            tempCheckboxIdHolder = tempElmCheckboxIdHolder.attr("id")
            let checkTaskIdHolder = parseInt(tempCheckboxIdHolder.replace(/[^\d]/g, ''));
            let taskArrayIndexHolder = taskListHolder.findIndex(item => item.id == checkTaskIdHolder);
            let tempArrayElement = taskListHolder[taskArrayIndexHolder];
            tempArrayElement.status = true;
            taskListHolder[taskArrayIndexHolder] = tempArrayElement;
            activeTaskHolder();
        }
        else {
            $(this).siblings('.task-txt').removeClass("done-task-decoration");
            let tempElmCheckboxIdHolder = $(this).parent();
            tempCheckboxIdHolder = tempElmCheckboxIdHolder.attr("id")
            let checkTaskIdHolder = parseInt(tempCheckboxIdHolder.replace(/[^\d]/g, ''));
            let taskArrayIndexHolder = taskListHolder.findIndex(item => item.id == checkTaskIdHolder);
            let tempArrayElement = taskListHolder[taskArrayIndexHolder];
            tempArrayElement.status = false;
            taskListHolder[taskArrayIndexHolder] = tempArrayElement;
            activeTaskHolder();
        }
    })
//
    $(document).on('click', '#delete-all-completeTask-button', function () {
        let tempActiveTaskHolder = $(":checkbox:checked");
            if(tempActiveTaskHolder.length>0){
                $.each(tempActiveTaskHolder,function(index,value){
                    let tempObjectArrayHolder=$(value).parent()
                    let tempTaskStringIdHolder=tempObjectArrayHolder.attr("id");
                    let tempTaskIdHolder = parseInt(tempTaskStringIdHolder);
                    let taskArrayDeleteCompleteTaskIndexHolder = taskListHolder.findIndex(item => item.id == tempTaskIdHolder );
                    taskListHolder.splice(taskArrayDeleteCompleteTaskIndexHolder,1);
                });
     
                $("#to-do-list").children().remove();
                render();
                $('#show-all-tasks').trigger('click');
            }else{
                $("#to-do-list").children().remove();
                $(`#to-do-list`).append(`<span class=all-task-done-alert> To delete completed tasks, you must do them first! </span>`)
             }
               
        
    });
    
    $(document).on('click', '#show-all-tasks',function(){
        $("#to-do-list").children().remove();    
        render();
        let tempTaskHolder = $(":checkbox");
        if(tempTaskHolder.length>1){
            $("#to-do-list").children().remove();    
            render();
            console.log("tempTaskHolder")
        }else{
            $("#to-do-list").children().remove();
            $(`#to-do-list`).append(`<span class=all-task-done-alert> Hurry to add new tasks to your to-do list! </span>`)
            console.log(tempTaskHolder)
        }
        
    });

    $(document).on('click', '#show-actual-tasks',function(){
        $("#to-do-list").children().remove();  
        render();
        let tempDoneTaskHolder = $(":checkbox:checked");
        let tempCounterDoneTaskHolder= taskListHolder.length - tempDoneTaskHolder.length;

            if(tempCounterDoneTaskHolder>0){
                $.each(tempDoneTaskHolder,function(index,value){
                $(this).parent().remove();
            })     
            } else{
                $("#to-do-list").children().remove();
                $(`#to-do-list`).append(`<span class=all-task-done-alert> Yooo dude, all task is done. Your realy awecome! </span>`)
            }
      
    });

    $(document).on('click', '#show-complete-tasks',function(){
        $("#to-do-list").children().remove(); 
        render();
        let tempDoneTaskHolder = $(":checkbox:checked");
        if(tempDoneTaskHolder.length>0){

            let tempDoneTaskHolder = $(".task-check");
            console.log(tempDoneTaskHolder)
            $.each(tempDoneTaskHolder,function(index,value){
                    let tempDoneTaskStringIdHolder = $(this).parent().attr("id");
                    let tempDoneTaskIndexHolder=GetIndexElem(tempDoneTaskStringIdHolder);
                    let tempArrayElement = taskListHolder[tempDoneTaskIndexHolder];
                    tempDoneTaskIdHolder = tempArrayElement.id;
                    if(tempArrayElement.status===false){
                        
                         $(`#${tempDoneTaskIdHolder}`).children().remove();
                    }
                
            });

        }else{
            $("#to-do-list").children().remove();
            $(`#to-do-list`).append(`<span class=all-task-done-alert> Bro you haven't done noone task :( </span>`)
        }
          
            
    });

    function GetIndexElem(stringId){
        let TaskId = parseInt(stringId);
        let TaskIndex = taskListHolder.findIndex(item => item.id == TaskId);
        return TaskIndex ;
    };

});
