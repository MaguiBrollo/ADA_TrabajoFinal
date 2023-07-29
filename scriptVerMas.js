
var url_string = window.location.href
var url = new URL(url_string);
var id_un_personaje = parseInt(url.searchParams.get("id"));
 

//---------------------------- UNO ----------------------------
const uno_nombre = document.getElementById('nombre-uno');
const uno_personaje_vermas = document.getElementById('un_personaje');

const uri = `https://rickandmortyapi.com/api/character/${id_un_personaje}`;

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
                        Nombre   : ${data.name}<br>
                        Género   : ${data.gender}  <br>
                        Especie  : ${data.species} <br>
                        Estatus  : ${data.status} <br>
                        Origen   : ${data.name} <br>
                        Ubicación: ${data.location.name} <br><br>
                        Episodio :  <br>
                        Creado   : ${data.created} <br><br>

                        <br><br>
                    </p>
                </div>
        
            </div>
            `
    }).catch((error) => {           //atrapa error
        console.log(error);
    });




    
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
