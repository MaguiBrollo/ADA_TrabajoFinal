
const contenedor = document.getElementById('contenedor');
const contaParaImagen = 0;
//--------------------------------
const total = document.getElementById('total-personajes');

//-------------------------------------------------------
let dataFetch = [];  //guarda el arrary de lo personajes

//-------------------------------
const $boton_todos = document.getElementById('todos');
const $boton_mujeres = document.getElementById('mujeres');


//--------------------------------- FUNCION PARA MOSTRAR LOS PERSONAJES  (filtrados o todos) ---------
const mostrar_personajes = personajes => {

    total.innerHTML = `<p class="mns-totales"> Total Personajes: ${personajes.length}  </p>`

    for (let i = 0; i < personajes.length; i++) {
        contaParaImagen + i;
        contenedor.innerHTML += `
    <div class="card-personaje">
        
        <div class="cont-img">
            <img class="img-card-personaje" src="https://rickandmortyapi.com/api/character/avatar/${i + 1}.jpeg">
        </div>

        <div class="info-card-personaje">
            <p>
                Nombre: ${personajes[i].name}<br>
                Género: ${personajes[i].gender}  <br>
                Especie: ${personajes[i].species} <br>
                Estatus: ${personajes[i].status} <br>
                Origen: ${personajes[i].origin.name} <br>
                Ubicación: ${personajes[i].location.name} <br>
            </p>
        </div>

        <div class="ver-mas-card-personaje">
            <button id="todos" class="boton-ver-mas">Ver más...</button> 
        </div>

    </div>
    `
    }
}

//------------------------------------------------------
function filtrar_personajes(de_donde) {
    console.log('sss ' + dataFetch.length);
    if (de_donde === 'todos') {
        mostrar_personajes(dataFetch);
    } else {

        let arrayNuevo = dataFetch.filter(per => per.gender === de_donde);
        mostrar_personajes(arrayNuevo);
    }
}
//$boton_todos.addEventListener('click', filtrar_personajes('todos'));
$boton_mujeres.addEventListener('click', filtrar_personajes('Femele'));


//-------------------------- PRINCIPAL (aquí debe empezar) --------------------------------------------------

let respuestaFetch = fetch('https://rickandmortyapi.com/api/character')
respuestaFetch.then((respuesta) => {
    return respuesta.json();
})
    .then((data) => {
        
        mostrar_personajes(data.results);

        dataFetch = data.results;          //guarda el objeto
        console.log('aqui guarda ' + dataFetch.length);

    }).catch((error) => {           //atrapa error
        console.log(error);
    });


//---------------------------------------------



