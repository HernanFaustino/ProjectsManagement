var UtilityFunctions = (function() {

  var objToArray = function ( myObject ){
    var myArray = [];
    for (var key in myObject){
      myArray.push(key);
    }
    return myArray;
  };


  var isInArray = function (a, myArray){
    var inArray = false;
    for (i=0; i<myArray.length; i++){
      if (myArray[i]==a){inArray=true}
    }
    return inArray;
  };


  var getJSDate = function( unixTimestamp ){

    var a = new Date(unixTimestamp * 1000);
    var output = new Date(
      a.getFullYear(), 
      a.getMonth(), 
      a.getDate(), 
      a.getHours(), 
      a.getMinutes(), 
      a.getSeconds()
      );
    var options = {
        year: "numeric", month: "short",
        day: "numeric"
    };

    return output.toLocaleTimeString("es-us", options);

  }

  var printHernan = function(){
    console.log("Hola.. soy Hernan");
  }


  return {
    objToArray: objToArray,
    isInArray: isInArray,
    getJSDate: getJSDate,
    printHernan: printHernan
  };

})(jQuery);

var UtilityProject = (function(){
    var createProject = function(datos, callback){
        var endpoint = "http://localhost/kanbanProjects/API/projects/create";
        var datos = {};
        datos['hola'] = "hernan";
        datos['datos'] = "hernan";
        datos['ha'] = "hernan";
        console.log(datos);
        $.ajax({
            type: "POST",
            url: endpoint,
            contentType: 'application/json; charset=utf-8',
            contentType: "application/json",
            data: JSON.stringify(datos),
            dataType: 'json',
            processData: false,
            success: function(data){
              if(data.success){
                callback();
              }else{
                //TODO show error
              }
            }
        });
    }
    var updateProject =  function(datos){
        var endpoint = "http://localhost/kanbanProjects/API/projects/update";
        $.ajax({
            type: "POST",
            url: endpoint,
            contentType: 'application/json; charset=utf-8',
            contentType: "application/json",
            data: JSON.stringify(datos),
            dataType: 'json',
            processData: false,
            success: function(data){
                console.log(data);
            }
        });

    }
    var printFaustino = function(){
        console.log("Hola.. soy Faustino");
    }

    return{
        printFaustino: printFaustino,
        updateProject: updateProject,
        createProject: createProject
    };
}   
)(jQuery);