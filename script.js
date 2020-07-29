jQuery(document).ready(function () {
    let taskListHolder = new Array();
    let currentPage = 1; 
    let renderPage = 0

    $(document).on('click', '#add-task-button', function () {
        let tabKiller = $("#new-task-text").val();
        let taskText = tabKiller.trim();
        taskText = _.escape([taskText]);
        if (taskText.length != 0) {
            let taskObject = new Object();
            idTemp = Date.now();
            taskObject.text = taskText;
            taskObject.id = idTemp;
            taskObject.status = false;
            taskListHolder.push(taskObject);
            $("#new-task-text").val("");
            $("#to-do-list").children().remove();
            currentPage = Math.ceil(taskListHolder.length/5)
            triggerPagination();
        }
        else {
            $("#new-task-text").val("");
            triggerPagination();
        }
       
    });
    function triggerPagination(){
        if(taskListHolder.length<6){
            
            paginationFuncButton();
            paginationRenderFunction(currentPage);
        }else{
            paginationFuncButton();
            paginationRenderFunction(currentPage);
        }

    }
    function paginationFuncButton(){
        let taskCounter= 4 + taskListHolder.length ;
            if(taskCounter %5 === 0 ){
                $("#paginationList").append(`<button class=paginationButton  id=${currentPage} > ${currentPage} </button> <span></span>`)  
                let styleAddElm = $(`#${currentPage}`);
                styleForActiveButton(styleAddElm);
                
            }
    };
    function paginationRenderFunction(currentPage){
        
        let tempArrayPagination=taskListHolder;
        let tempSliceStart = (currentPage-1)*5 ;
        let end = tempSliceStart  + 5;
        let tempArrayForPaginationRender=tempArrayPagination.slice(tempSliceStart, end);
        render(tempArrayForPaginationRender);
    }
   $(document).on("click",".paginationButton",function(){
       
        styleForActiveButton($(this));
       
        $("#to-do-list").children().remove();  
        tempIdHolder= this.id;
        paginationRenderFunction(tempIdHolder);
       
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
              
                
                
                

            });
           
            
        
       
        }
        $("#to-do-list").append(`${tempStr}`);
        taskDecorate();
        activeTaskHolder()
       
    };


    
    

    function taskDecorate(){
        $.each(taskListHolder, function (index, value) {
            tempHolderArrayElm = value;
            let tempHolderId = tempHolderArrayElm.id;
            let tempHolderStatus = tempHolderArrayElm.status;
            if (tempHolderStatus) {
                
                $(`#${tempHolderId} .task-txt`).addClass("done-task-decoration");
            } else {
                $(`#${tempHolderId}.task-txt`).removeClass("done-task-decoration");
            };
        });
    }   
  





    $(document).on("click", "#pick-all-button", function () {
       
        let AllTaskCheckboxList = $(".task-check");
        $.each(AllTaskCheckboxList,function(index,value){
            let tempAllTaskStringIdHolder = $(this).parent().attr("id");
            let tempAllTaskIndexHolder=GetIndexElem(tempAllTaskStringIdHolder);
            let tempArrayElement = taskListHolder[tempAllTaskIndexHolder];
            if(tempArrayElement.status===false){
                tempArrayElement.status=true;
            };
        
        });
        $("#to-do-list").children().remove(); 
        paginationRenderFunction(taskListHolder);
        activeTaskHolder();
        
    });
    
    $(document).on("click", ".task-delete-button", function () {
        let tempElmTaskIdHolder = $(this).parent();
        tempTaskStringIdHolder = tempElmTaskIdHolder.attr("id");
        let deleteTaskArrayIndexHolder = GetIndexElem (tempTaskStringIdHolder);
        taskListHolder.splice(deleteTaskArrayIndexHolder, 1);
        $(this).parent().remove();
        $("#to-do-list").children().remove();
        paginationRenderFunction(taskListHolder);
        activeTaskHolder();
    });

    $("#body-id").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#to-do-list").children().remove();
            $("#add-task-button").click();
        } 
    });

    $(document).on("dblclick",".task-txt", function(){
            let tempSpanParentStringIdHolder= $(this).parent().attr("id");
            let indexSpanParent = GetIndexElem(tempSpanParentStringIdHolder);
            $(this).replaceWith(`<input id=temp-txt-editor  value="${this.innerText}" type=text> </input>`)
            
            $("#body-id").keydown(function (event) {
                if (event.keyCode == 13 ) {
                   
                    let tempInputValueHolder= $("#temp-txt-editor").val()
                    taskListHolder[indexSpanParent].text = tempInputValueHolder;
                    $("#to-do-list").children().remove(); 
                    render(taskListHolder);
                } 
            });
    });
    
   $(document).on('click', '.task-check', function () {
        $(this).siblings('.task-txt').addClass("done-task-decoration");
            let tempElmCheckboxIdHolder = $(this).parent();
            let tempCheckboxParentStringIdHolder = tempElmCheckboxIdHolder.attr("id")
            let taskArrayIndexHolder = GetIndexElem(tempCheckboxParentStringIdHolder);
            let tempArrayElement = taskListHolder[taskArrayIndexHolder];
        if ($(this).is(':checked')) {
                tempArrayElement.status = true;
        }else{
                tempArrayElement.status = false;
        };
        taskListHolder[taskArrayIndexHolder] = tempArrayElement;
        activeTaskHolder();
        
    });


    $(document).on('click', '#delete-all-completeTask-button', function () {
        let tempActiveTaskHolder = $(":checkbox:checked");
            if(tempActiveTaskHolder.length>0){
                $.each(tempActiveTaskHolder,function(index,value){
                    let tempObjectArrayHolder=$(value).parent()
                    let tempTaskStringIdHolder=tempObjectArrayHolder.attr("id");
                    taskArrayDeleteCompleteTaskIndexHolder=GetIndexElem(tempTaskStringIdHolder);
                    taskListHolder.splice(taskArrayDeleteCompleteTaskIndexHolder,1);
                });
     
                $("#to-do-list").children().remove();
                render(taskListHolder);
            }else{
                $("#to-do-list").children().remove();
                $(`#to-do-list`).append(`<span class=all-task-done-alert> To delete completed tasks, you must do them first! </span>`)
             }
    });
    
    $(document).on('click', '#show-all-tasks',function(){
        styleForActiveButton($(this));
        $("#to-do-list").children().remove();    
        render(taskListHolder);
        let tempTaskHolder = $(":checkbox");
        if(tempTaskHolder.length>1){
            
            $("#to-do-list").children().remove();    
            render(taskListHolder);
        }else{
            $("#to-do-list").children().remove();
            $(`#to-do-list`).append(`<span class=all-task-done-alert> Hurry to add new tasks to your to-do list! </span>`)
          
        }
        
    });

    $(document).on('click', '#show-actual-tasks',function(){
        styleForActiveButton($(this));
        $("#to-do-list").children().remove();  
        render(taskListHolder);
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
        
            $(document).on('click', '.task-check', function (){
            $(this).parent().remove();
        });
    });

    $(document).on('click', '#show-complete-tasks',function(){
        styleForActiveButton($(this));
        $("#to-do-list").children().remove(); 
        render(taskListHolder);
        let tempDoneTaskHolder = $(":checkbox:checked");
        if(tempDoneTaskHolder.length>0){

            let tempDoneTaskHolder = $(".task-check");
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
    function styleForActiveButton(elm) {
        $(`.activeButtonStyle`).removeClass("activeButtonStyle")
       elm.addClass("activeButtonStyle");
    };


});
