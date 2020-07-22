jQuery(document).ready(function(){ 
    (function(){
            $('#add-task-button').click(function(){
                /*  let tabKiller = $("#new-task-text").val();
                console.log(tabKiller);
                $.trim(tabKiller);
                console.log(typeof(tabKiller));  try kill "  "
                $("#new-task-text").val()=tabKiller;
                 */
                if( $("#new-task-text").val().length !=0 ){
                    let idTemp= Date.now();
                    let tempTaskCreateValue = " <li class=list-decorate> <input type=checkbox class=task-check id='taskDoneChecker'><span class=task >"+$("#new-task-text").val()+"</span><img class=task-delete src='img/delete.gif'></img> </li>"
                    $("#to-do-list").append(tempTaskCreateValue);
                    console.log($("#new-task-text").val());
                    $("#new-task-text").val("");
                }


                $('.task-check').on('click', function (){
                    if ( $(this).is(':checked') ) {
                        console.log("asd");
                        $(this).siblings('.task').addClass("done-task-decoration");
                    }
                    else{
                        console.log("asdвф");
                        $(this).siblings('.task').removeClass("done-task-decoration");
                    }
                })
                $('#pick-all-button').on('click', function() {
                    $(".task-check").trigger('click');
                    console.log("asd");
                });

            });
            
       }());
    
            $("#body-id").keydown(function(event){
                if(event.keyCode == 13){
                $("#add-task-button").click();
                }         
            });

            
 });