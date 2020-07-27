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
            render();
        }
        else {
            $("#new-task-text").val("");
        }


    });

    function activeTaskHolder() {
        $("#taskCounter >").remove();
        let tempActiveTaskHolder = $(":checkbox:checked").length;
        let activeTaskHolder = taskListHolder.length - tempActiveTaskHolder;
        let taskCounterText = "task"
        if (activeTaskHolder > 1) taskCounterText = "tasks"
        $("#taskCounter").append(` <span> Need do ${activeTaskHolder} ${taskCounterText}</span> `);

    }

    function render() {
        if (taskListHolder.length > 0) {
            $.each(taskListHolder, function (index, value) {
                tempHolderArrayElm = value;
                let tempHolderText = tempHolderArrayElm.text;
                let tempHolderId = tempHolderArrayElm.id;
                let tempHolderStatus = tempHolderArrayElm.status;
                let checked = '';

                if (tempHolderStatus) {
                    checked = 'checked';
                }

                $("#to-do-list").append(
                    `<li class=list-decorate id=${tempHolderId}>
                        <input type=checkbox  ${checked} class=task-check >
                        <span  class=task-txt  contenteditable=true word-break=break-all id=spanId>${tempHolderText} </span>
                        <input type=button class=task-delete-button value=Delete >
                        <input type=button  class=task-edit-button value=Edit ><br/>
                    </li>`
                );

                if (tempHolderStatus) {
                    $(`#${tempHolderId} .task-txt`).addClass("done-task-decoration");
                } else {
                    $(`#${tempHolderId} .task-txt`).removeClass("done-task-decoration");
                };


            });
        }
        activeTaskHolder();
       
    };


    $(document).on("click", "#pick-all-button", function () {
        $(".task-check").trigger('click');
        activeTaskHolder();
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

    $(document).on('click', '#delete-all-compliteTask-button', function () {
            let tempActiveTaskHolder = $(":checkbox:checked");
            
                $.each(tempActiveTaskHolder,function(index,value){
                    let tempObjectArrayHolder=$(value).parent()
                    let tempTaskStringIdHolder=tempObjectArrayHolder.attr("id");
                    let tempTaskIdHolder = parseInt(tempTaskStringIdHolder);
                    let taskArrayDeleteCompleteTaskIndexHolder = taskListHolder.findIndex(item => item.id == tempTaskIdHolder );
                    taskListHolder.splice(taskArrayDeleteCompleteTaskIndexHolder,1);
                    console.log(taskListHolder);
                });

            $(this).parent().remove();
            $("#to-do-list").children().remove();
            render();
    });

    $(document).on('click', '.task-edit-button ', function () {
        let tempParentTaskId = $(this).parent();
        let tempStringEditedTaskId=tempParentTaskId.attr("id")
        let tempEditedTaskId = parseInt(tempStringEditedTaskId);
        let newTaskElm= $(`#${tempEditedTaskId}`).children();
        let newTaskTextValue = newTaskElm.text();
        //let newTaskTextValue =  $(`#${tempEditedTaskId}.task-txt`).val();
        let taskArrayEditTaskIndexHolder = taskListHolder.findIndex(item => item.id == tempEditedTaskId);
        let tempArrayEditTaskElement = taskListHolder[taskArrayEditTaskIndexHolder];
        tempArrayEditTaskElement.text= newTaskTextValue;
        taskListHolder[taskArrayEditTaskIndexHolder] = tempArrayEditTaskElement;
        $(this).parent().remove();
        $("#to-do-list").children().remove();
        render()
    });

    
});
