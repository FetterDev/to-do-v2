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
                    let tempTaskCreateValue1 = $("#to-do-list").html();
                    let tempTaskCreateValue2 = " <li class=list-decorate> <input type=checkbox class=task-check id='taskDoneChecker'><span class=task >"+$("#new-task-text").val()+"</span><img class=task-delete src='img/delete.gif'></img> </li>"
                    console.log($("#new-task-text").val());
                    $("#to-do-list").html(tempTaskCreateValue1+tempTaskCreateValue2);
                    $("#new-task-text").val("");
                }


                $('.task-check').on('click', function (){
                    if ( $(this).is(':checked') ) {
                        console.log("asd");
                        $('.task-check').parent().addClass("done-task-decoration");
                    }
                    else{
                    (function(){
                        console.log("asd");
                        $('.task-check').parent().removeClass("done-task-decoration");
        
                    });
                     
                    }
                })
                $('#pick-all-button').on('click', function() {
                    $('#taskDoneChecker').prop('disabled', false);
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