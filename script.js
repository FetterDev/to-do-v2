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
            console.log(taskListHolder);
            $("#new-task-text").val("");
            render();
            }
        else {
            $("#new-task-text").val("");
        }
  
        
    });

    function render(){
        if (taskListHolder.length>0){
            tempHolderArrayElm=taskListHolder[taskListHolder.length-1];
            let tempHolderText= tempHolderArrayElm.text;
            let tempHolderId=tempHolderArrayElm.id;
            $("#to-do-list").append(`<li class=list-decorate id=${tempHolderId}><input type=checkbox  class=task-check ><span class=task-txt> ${tempHolderText} 
            </span> <input type=button class=task-delete-button value= Delete id=id=${tempHolderId}> <input type=button class=task-edit-button value= Edit id=taskEditButton><br/> </li>`);
        }
       
     };
    

    $(document).on("click","#pick-all-button",function(){
            $(".task-check").trigger('click');
    });
  /*  $(document).on("click",".task-delete-button",function(){
        let tempTaskIdHolder= (this).id;
        let deleteTaskIdHolder = parseInt(tempTaskIdHolder.replace(/[^\d]/g, ''));
        console.log('deleteTaskIdHolder',deleteTaskIdHolder);
        //let temp= $.inArray(taskListHolder,deleteTaskIdHolder);
        let deleteTaskArrayIndexHolder = taskListHolder.findIndex(item => item.id == deleteTaskIdHolder);
        delete taskListHolder[deleteTaskArrayIndexHolder];
        taskListHolder.length= taskListHolder.length - 1;
        console.log(deleteTaskIdHolder);
        console.log(deleteTaskArrayIndexHolder);
        console.log(taskListHolder);
        $(document).remove([".list-decorate"])
        render();

    });
 */
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
            }
            else {

                $(this).siblings('.task-txt').removeClass("done-task-decoration");
            }
    })

    
});
