jQuery(document).ready(function () {
    

            $(document).on('click', '#add-task-button', function () {
            let tabKiller = $("#new-task-text").val();
            let taskText = tabKiller.trim()
            $("#new-task-text").val = taskText;
            if (taskText.length != 0) {
                let idTemp = Date.now();
                let tempTaskCreateValue = " <li class=list-decorate> <input type=checkbox class=task-check id='taskDoneChecker'><span class=task >" + taskText + "</span><img class=task-delete src='img/delete.gif'></img> </li>"
                $("#to-do-list").append(tempTaskCreateValue);
            
                $("#new-task-text").val("");
            }
            else{
                $("#new-task-text").val("");
            }
            $(document).on('click', '.task-check' , function () {
                if ($(this).is(':checked')) {
                   
                    $(this).siblings('.task').addClass("done-task-decoration");
                }
                else {
                    
                    $(this).siblings('.task').removeClass("done-task-decoration");
                }
            })
            $(document).on('click', '#pick-all-button', function () {
                $(".task-check").trigger('click');
              
            });

            });

    

             $("#body-id").keydown(function (event) {
                if (event.keyCode == 13) {
                    $("#add-task-button").click();
                }          if (event.keyCode == 13) {
                    $("#add-task-button").click();
                }
             });


});