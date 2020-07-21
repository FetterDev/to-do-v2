jQuery(document).ready(function(){ 
    (function(){
        $('#add-task-button').click(function(){
        
            let taskText= $("#new-task-text").val();
                if(taskText.length > 0){
                    let idtemp= Date.now();
                    $("ol").append("<li>"+ taskText+"</li>");
             
                    $("#new-task-text").val("");
                   
                }
           
        });
    }());

    $("#text-holder").keyup(function(event){
        if(event.keyCode == 13){
          $("#add-task-button").click();
        }         
    });


 });