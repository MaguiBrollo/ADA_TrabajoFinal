
//------------------- Conteneder de los personajes (es el lugar donde los muestra)
const contenedor = document.getElementById('contenedor');

//-------------------------------- Totales -----------------------
const total_personajes = document.getElementById('total-personajes');
const actual_pag = document.getElementById('pagina-actual');
const total_pag = document.getElementById('total-paginas');

//-------------------------------------------------------
let dataFetch = [];  //guarda el arrary de lo personajes
let pagina_ac = 1;
let total_pg = 0;

//------------------------------- Botones de filtrado
const boton_todos = document.getElementById('todos');
const boton_mujeres = document.getElementById('mujeres');
const boton_hombres = document.getElementById('hombres');
const boton_sinGenero = document.getElementById('sinGenero');
const boton_desconocidos = document.getElementById('desconocidos');

//------------------------------------------ Botones de paginación ---
const btn_izq = document.getElementById('btn-img-izq');
const btn_ant = document.getElementById('btn-img-ant');
const btn_sig = document.getElementById('btn-img-sig');
const btn_der = document.getElementById('btn-img-der');

const btn_vermas = document.getElementById('btn-ver-mas');

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
                <a id="btn-ver-mas" class="boton-ver-mas" href="vermas.html?id=${personajes[i].id}" > Ver más...</a>
            </div>

        </div> `
    }
    contenedor.innerHTML = nuevo;

    actual_pag.innerHTML = `<p class="mns-totales-pg"> Página Actual: ${pagina_ac}  </p>`
    total_pag.innerHTML = `<p class="mns-totales-pg"> Total de páginas: ${total_pg}   </p>`
}

//---------------------------- Filtrado por genero --------------------------
function filtrar_personajes(de_donde) {
    if (de_donde === 'todos') {
        mostrar_personajes(dataFetch);
    } else {
        let arrayNuevo = dataFetch.filter(per => per.gender === de_donde);
        mostrar_personajes(arrayNuevo);
    }
}

function todos() {
    filtrar_personajes('todos');
}

boton_todos.addEventListener('click', todos); //se llama a una función 

boton_mujeres.addEventListener('click', ()=>{  //en lugar de llamar a una funcion, escribir el cuerpo
    filtrar_personajes('Female');             // de la función
});

boton_hombres.addEventListener('click', ()=>{
    filtrar_personajes('Male');
});

boton_sinGenero.addEventListener('click', () => {
    filtrar_personajes('Genderless');
});

boton_desconocidos.addEventListener('click', () =>{     
    filtrar_personajes('unknown');                     
});


//---------------------------- Genera el array de personajes ----------------------------
function buscar_personajes() {
    const uri = `https://rickandmortyapi.com/api/character/?page=${pagina_ac}`
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
        ocultarMostrarBotones();
}

//------  ocultar/mostrar botones de paginacion
function ocultarMostrarBotones(){
    if(pagina_ac <=1 ){
        btn_izq.style.visibility='hidden';
        btn_ant.style.visibility='hidden';
    }else{
        btn_izq.style.visibility='visible';
        btn_ant.style.visibility='visible';
    }

    if( pagina_ac === (total_pg)){  
        btn_der.style.visibility='hidden';
        btn_sig.style.visibility='hidden';
    }else{
        btn_der.style.visibility='visible';
        btn_sig.style.visibility='visible';
    }
}


//---------------- paginacion --------------------------
const paginas = async promesa => {
    btn_sig.addEventListener('click', () => {
        if (pagina_ac === total_pg) {
            pagina_ac = total_pg;
        } else {
            pagina_ac += 1;
        }
        buscar_personajes();
    })

    btn_ant.addEventListener('click', () => {   
        if (pagina_ac === 1) {
            pagina_ac = 1;
        } else {
            pagina_ac -= 1;
        }
        buscar_personajes();
    })

    btn_der.addEventListener('click', () => {
        if (pagina_ac < total_pg) {
            pagina_ac = total_pg;
            buscar_personajes();
        }
    })

    btn_izq.addEventListener('click', () => {
        if (pagina_ac > 2) {
            pagina_ac = 1;
            buscar_personajes();
        }
    })
}


//-------------------------- PRINCIPAL (aquí debe empezar) --------------------------------------------------
paginas(buscar_personajes());