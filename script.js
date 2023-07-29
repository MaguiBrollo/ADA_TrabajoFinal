
const contenedor = document.getElementById('contenedor');

//--------------------------------
const total_personajes = document.getElementById('total-personajes');

const actual_pag = document.getElementById('pagina-actual');
const total_pag = document.getElementById('total-paginas');
//-------------------------------------------------------
let dataFetch = [];  //guarda el arrary de lo personajes

let pagina_ac = 1;
let total_pg = 0;

//-------------------------------
const boton_todos = document.getElementById('todos');
const boton_mujeres = document.getElementById('mujeres');
const boton_hombres = document.getElementById('hombres');
const boton_sinGenero = document.getElementById('sinGenero');
const boton_desconocidos = document.getElementById('desconocidos');

//------------------------------------------ bonones de paginación ---
const btn_izq=document.getElementById('btn-img-izq');
const btn_ant=document.getElementById('btn-img-ant');
const btn_sig=document.getElementById('btn-img-sig');
const btn_der=document.getElementById('btn-img-der');



//--------------------------------- FUNCION PARA MOSTRAR LOS PERSONAJES  (filtrados o todos) ---------
const mostrar_personajes = personajes => {
    let nuevo = '';
    total_personajes.innerHTML = `<p class="mns-totales"> Total Personajes: ${personajes.length}  </p>`

    for (let i = 0; i < personajes.length; i++) {
        nuevo = nuevo + 
        `<div class="card-personaje">
        
            <div class="cont-img">
                <img class="img-card-personaje" src="https://rickandmortyapi.com/api/character/avatar/${personajes[i].id}.jpeg">
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
                <button id="btn-ver-mas" class="boton-ver-mas">Ver más...</button> 
            </div>

        </div> `
    }
    contenedor.innerHTML = nuevo;

    actual_pag.innerHTML = `<p class="mns-totales-pg"> Página Actual: ${pagina_ac}  </p>`
    total_pag.innerHTML = `<p class="mns-totales-pg"> Total de páginas: ${total_pg}   </p>`
}

//---------------------------- Filtrado por genero --------------------------
function filtrar_personajes(de_donde) {
    console.log('llego array con: ' + dataFetch.length);

    if (de_donde === 'todos') {
        mostrar_personajes(dataFetch);
    } else {
        
        let arrayNuevo = dataFetch.filter(per => per.gender === de_donde);
        console.log('filtrado ' +de_donde+ ' con '+ arrayNuevo.length);

        mostrar_personajes(arrayNuevo);
    }
}

function todos(){
    filtrar_personajes('todos');
}
function mujeres(){
    filtrar_personajes('Female');
}
function hombres(){
    filtrar_personajes('Male');
}
function sinGenero(){
    filtrar_personajes('Genderless');
}
function desconocido(){
    filtrar_personajes('unknown');
}

boton_todos.addEventListener('click', todos);
boton_mujeres.addEventListener('click', mujeres);
boton_hombres.addEventListener('click',hombres);
boton_sinGenero.addEventListener('click',sinGenero);
boton_desconocidos.addEventListener('click', desconocido);


//---------------------------- Genera el array de personajes ----------------------------
function buscar_personajes(){
    const uri= `https://rickandmortyapi.com/api/character/?page=${pagina_ac}`
    let respuestaFetch = fetch(uri);
    respuestaFetch.then((respuesta) => {
        return respuesta.json();
    })
        .then((data) => {

            total_pg = data.info.pages;
            mostrar_personajes(data.results);
           
            dataFetch = data.results;        // guarda el array de personajes

        }).catch((error) => {           //atrapa error
            console.log(error);
        });
}


//---------------- paginacion --------------------------
const paginas = async promesa => {
   
    btn_sig.addEventListener('click', () => {
        if(pagina_ac === total_pg){
            pagina_ac = total_pg;
        }else{
            pagina_ac += 1;
        }
        buscar_personajes();
    })

    btn_ant.addEventListener('click', () => {
        if(pagina_ac === 1){
            pagina_ac = 1;
        }else{
            pagina_ac -= 1;
        }
        buscar_personajes();
    })
    
    btn_der.addEventListener('click', () => {
        if(pagina_ac < total_pg){
            pagina_ac = total_pg;
            buscar_personajes();
        }
    })
    
    btn_izq.addEventListener('click', () => {
        if(pagina_ac > 2){
            pagina_ac = 1;
            buscar_personajes();
        }
    })
}


//-------------------------- PRINCIPAL (aquí debe empezar) --------------------------------------------------
paginas(buscar_personajes());