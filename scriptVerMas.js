
var url_string = window.location.href
var url = new URL(url_string);
var id_un_personaje = parseInt(url.searchParams.get("id"));
 
var mas_episode='';
//---------------------------- UNO ----------------------------
var uno_nombre = document.getElementById('nombre-uno');
var uno_personaje_vermas = document.getElementById('un_personaje');
var uno_cont_episodios = document.getElementById('cont-episodios');

let uri = `https://rickandmortyapi.com/api/character/${id_un_personaje}`;

let respuestaFetch = fetch(uri);
respuestaFetch.then((respuesta) => {
    return respuesta.json();
})
    .then((data) => {
        
        uno_nombre.innerHTML += `<h2> Personaje seleccionado: ${data.name} </h2>`
        uno_personaje_vermas.innerHTML = `
            <div class="card-personaje-uno">
                
                <div class="cont-img-uno">
                    <img class="img-card-personaje-uno" src="https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg">
                </div>
        
                <div class="info-card-personaje-uno">
                    <p>
                        <b>Nombre   : ${data.name} </b><br>
                        Género   : ${data.gender}  <br>
                        Especie  : ${data.species} <br>
                        Estatus  : ${data.status} <br>
                        Creado   : ${data.created} <br>
                        <br>

                        <b>Origen:</b> <br>
                        -Nombre: ${data.origin.name} <br>
                        -URL   : <a href="${data.origin.url}"> URL origen</a> <br>
                        
                        <br>
                        <b>Ubicación: </b><br>
                        -Nombre: ${data.location.name} <br>
                        -URL   : <a href="${data.location.url}"> URL Ubicación</a> <br>
                        <br>
                        <b>Episodios:</b> ${data.episode.length} episodios (ver a continuación:) 
                       
                    </p>
                </div>
            </div>
            ` 
            mostrar_episodios(data.episode); 

    }).catch((error) => {           //atrapa error
        console.log(error);
    });

//----------------------
function buscar_episodios(x){
    fetch(x)
    .then((episode)=>{
        return episode.json();
    }).then((epi_data)=>{
        //console.log(mas_episode)
        uno_cont_episodios.innerHTML +=`
                <p>
                    <b> Nombre: ${epi_data.name} </b><br>
                        Fecha Estreno: ${epi_data.air_date} <br>
                        Espisodio: ${epi_data.episode} <br>
                        url: ${epi_data.url} <br>
                        Fecha Creado: ${epi_data.created} <br>
                </p>
                ` 
    });    
}


function mostrar_episodios(x){
    console.log(x.length);
    
   for (let i=0; i< x.length; i++){
        
        buscar_episodios(x[i]);
                         
    };
    
    //uno_personaje_vermas.innerHTML += mas_episode;
}
//-------------------- el siguiente CODIGO es para cuando pasan mas d eun parametro

/**
   * Funcion que captura las variables pasados por GET
   * Devuelve un array de clave=>valor
   */
/* function getGET() {
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}
window.onload = function () {
    // Cogemos los valores pasados por get
    var valores = getGET();
    if (valores) {
        //recogemos los valores que nos envia la URL en variables para trabajar 
        //con ellas
        var valor = valores['id'];
        document.write('<br> Valor: ' + valor);

        // hacemos un bucle para pasar por cada indice del array de valores
        /* for (var index in valores) {
            document.write(" clave: " + index + " - valor: " + valores[index]);
        } */
        
        
/*     } else {
        // no se ha recibido ningun parametro por GET
        document.write("No se ha recibido ningún parámetro");
    }
}
 */
