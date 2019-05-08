/*var postObject = {
  'name': 'Raynor',
  'breed': 'Black Cat',
  'age':'4 años'
}*/

//$("").val();

$("#submit-button").click(()=>{
    let name = $("#pet-name").val();
    let breed = $("#pet-breed").val();
    let age = $("#pet-age").val();
  
    let petObject = {name,breed,age};
    console.log(petObject)
    addPet(petObject)
  })
  
  /*método post*/
  const addPet = (petObject)=>{
    $.post( "https://jquerycrud-ed8dc.firebaseio.com/jose.json", /*URL*/
      JSON.stringify(petObject), /*Objeto a postear*/
      function( data ) { /*callback*/
        console.log( data);
        getData();
    }, "json");
  }
  
  function deletePet(param){
    console.log("AQUI",param);
    deleteData(param);
    getData();
  }


  /*método get*/
  function getData(){
    $.ajax({
        url: "https://jquerycrud-ed8dc.firebaseio.com/jose.json",
        type: "GET",
        success: function(response){
            printData(response)
        }
    });
  }
  
  /*Método Update*/
  function updateData(updatedObject){
      $.ajax({
         url: 'https://jquerycrud-ed8dc.firebaseio.com/dogs/-LeK6izE4DBMIBDffGFY.json',
         type: 'PUT',
         data: JSON.stringify(updatedObject),
         success: function(response) {
           console.log(response)
         }
      });
  }
  
  /*Método delete*/
  function deleteData(key){
      var localurl = 'https://jquerycrud-ed8dc.firebaseio.com/jose/' + key + '.json';
    console.log(localurl);
    $.ajax({
       url: localurl,
       type: 'DELETE',
       async: false, 
       success: function(response) {
         console.log(response)
       }
    });
  }

  function printData(dataToPrint) {
    $(".data-wrapper").empty();
    $.each(dataToPrint,(key,value)=>{
      console.log(`key ${key}, value ${value}, name ${value.name}, breed: ${value.breed}`)
      $(".data-wrapper").append(
          `<div class="data-card">
            <p>El nombre de mi mascota es: <span>${value.name}</span></p>
            <p>Su raza es: <span>${value.breed}</span></p>
            <p>y tiene <span>${value.age}</span></p>
            <button onclick="deletePet('${key}')">Borrar</button>
          </div>`
        )
    })
  }
  
  
  getData();
