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
            taskObject.id =idTemp;
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

    function render(){
        if (taskListHolder.length>0){
            $.each(taskListHolder,function(index,value){
                tempHolderArrayElm=value;
                let tempHolderText= tempHolderArrayElm.text;
                let tempHolderId=tempHolderArrayElm.id;
                let tempHolderStatus =tempHolderArrayElm.status;
                //tempHolderStatus хочу передать в checked (checked=${tempHolderStatus} не работает)
                console.log(tempHolderStatus)
                //костыль
                if(tempHolderStatus){
                    $("#to-do-list").append(`<li class=list-decorate id=${tempHolderId}><input type=checkbox id=${tempHolderId}  class=task-check checked>
                    <span id=${tempHolderId} class=task-txt>${tempHolderText}</span> <input type=button class=task-delete-button value=Delete id=${tempHolderId}>
                    <input type=button class=task-edit-button value=Edit id=taskEditButton><br/> </li>`);
                    $('#tempHolderId').addClass("done-task-decoration");
                    
                }else{
                    $("#to-do-list").append(`<li class=list-decorate id=${tempHolderId}><input type=checkbox id=${tempHolderId}  class=task-check unchecked>
                    <span id=${tempHolderId} class=task-txt> ${tempHolderText} 
                    </span> <input type=button class=task-delete-button value=Delete id=${tempHolderId}>
                    <input type=button class=task-edit-button value=Edit id=taskEditButton><br/> </li>`);
                    $('#tempHolderId').removeClass("done-task-decoration");
                }
            
         
            });
        }
     };
 

    $(document).on("click","#pick-all-button",function(){
            $(".task-check").trigger('click');
    });
        $(document).on("click",".task-delete-button",function(){
        let tempTaskIdHolder= (this).id;
        let deleteTaskIdHolder = parseInt(tempTaskIdHolder.replace(/[^\d]/g, ''));
        let deleteTaskArrayIndexHolder = taskListHolder.findIndex(item => item.id == deleteTaskIdHolder);
        taskListHolder.splice(deleteTaskArrayIndexHolder,1);
        $(this).parent().remove();
        $("#to-do-list").children().remove();
        render()
    });
 
    $("#body-id").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#add-task-button").click();
            } if (event.keyCode == 13) {
                $("#add-task-button").click();
            }
    });


    $(document).on('click', '.task-check', function () {
            if ($(this).is(':checked')) {
                $(this).siblings('.task-txt').addClass("done-task-decoration");
                let tempCheckboxIdHolder=(this).id;
                let checkTaskIdHolder = parseInt(tempCheckboxIdHolder.replace(/[^\d]/g, ''));
                let taskArrayIndexHolder = taskListHolder.findIndex(item => item.id == checkTaskIdHolder);
                let tempArrayElement=taskListHolder[taskArrayIndexHolder];
              
                tempArrayElement.status=true;
                taskListHolder[taskArrayIndexHolder]=tempArrayElement;
                
                console.log("taskListHolder",taskListHolder)
            }
            else {

                $(this).siblings('.task-txt').removeClass("done-task-decoration");
                let tempCheckboxIdHolder=(this).id;
                let checkTaskIdHolder = parseInt(tempCheckboxIdHolder.replace(/[^\d]/g, ''));
                let taskArrayIndexHolder = taskListHolder.findIndex(item => item.id == checkTaskIdHolder);
                let tempArrayElement=taskListHolder[taskArrayIndexHolder];
                tempArrayElement.status=false;
                taskListHolder[taskArrayIndexHolder]=tempArrayElement;
            }
    })
    $(document).on('click', '#delete-all-complited-button', function () {
       
    })
    
});
