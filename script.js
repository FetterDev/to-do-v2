jQuery(document).ready(function () {
    let taskListHolder = new Array();
    $(document).on('click', '#add-task-button', function () {
        let tabKiller = $("#new-task-text").val();
        let taskText = tabKiller.trim()
        // $("#new-task-text").val = taskText;
        if (taskText.length != 0) {
            let taskObject = new Object();
            idTemp = Date.now();
            taskObject.text = taskText;
            taskObject.id = idTemp;
            taskObject.status = false;
            taskListHolder.push(taskObject);
            console.log(taskListHolder);
            let tempTaskCreateValue = " <li class=list-decorate id='idTemp'> <input type=checkbox class=task-check id='taskDoneChecker'><span class=task >" + taskText + "</span><img class=task-delete src='img/delete.gif'></img> </li>"
            $("#to-do-list").append(tempTaskCreateValue);
            $("#new-task-text").val("");
            }
        else {
            $("#new-task-text").val("");
        }
        

    

    });
    $(document).on("click","#pick-all-button",function(){
    $(".task-check").trigger('click');
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

            $(this).siblings('.task').addClass("done-task-decoration");
        }
        else {

            $(this).siblings('.task').removeClass("done-task-decoration");
        }
    })

});