/* Configurar el almacenamiento local */
function guardarAlmacenamientoLocal(llave, valor_a_guardar){
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}

/* Recuperar los datos almacenados */
function obtenerAlmacenamientoLocal(llave){
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

let productos = obtenerAlmacenamientoLocal('productos') || [];
let mensaje = document.getElementById('mensaje');

/* Añadir productos */
const anadirProducto = document.getElementById('productoAnadir');
const anadirValor = document.getElementById('valorAnadir');
const anadirExistencia = document.getElementById('existenciaAnadir');
const anadirImagen = document.getElementById('imagenAnadir');

document.getElementById('botonAnadir').addEventListener('click', function(ev){
    ev.preventDefault();
    let productoAnadir = anadirProducto.value;
    let valorAnadir = anadirValor.value;
    let ExistenciaAnadir = anadirExistencia.value;
    let imagenAnadir = anadirImagen.value;

    let sw = true;
    if (productoAnadir == '' || valorAnadir == '' || existenciaAnadir == '' || imagenAnadir == ''){
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos')},2500)
        sw = false;
    }else{
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == productoAnadir) {
                mensaje.classList.add('repetidoError');
                setTimeout(() => { mensaje.classList.remove('repetidoError')},2500)
                sw = false;
            }
            
        }
    }

    if (sw) {
        productos.push({
            nombre: productoAnadir,
            valor: valorAnadir,
            existencia: ExistenciaAnadir,
            urlImagen: imagenAnadir
        })
        mensaje.classList.add('realizado');
        setTimeout(() => {
            mensaje.classList.remove('repetidoError');
            window.location.reload();
        }, 1500)
    }
    guardarAlmacenamientoLocal('productos', productos);
    console.log('Producto almacenado: ' + JSON.stringify(productos));
});

/* Editar productos */
const productoEditar = document.getElementById('productoEditar');
const atributoEditar = document.getElementById('atributoEditar');
const nuevoAtributoEditar = document.getElementById('nuevoAtributo');

document.getElementById('botonEditar').addEventListener('click', (ev) => {
    let productoEditar = productoEditar.value;
    let atributoEditar = atributoEditar.value;
    let nuevoAtributoEditar = nuevoAtributoEditar.value;

    let sw = true;
    if (productoEditar == '' || atributoEditar == '' || nuevoAtributoEditar == '' ){
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos')},2500)
        sw = false;
    }else{
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == productoEditar) {
                switch (atributoEditar) {
                    case 'nombre':
                        productos[i].nombre = nuevoAtributoEditar
                        break;
                    case 'valor':
                        productos[i].valor = nuevoAtributoEditar
                        break;
                    case 'existencia':
                        productos[i].existencia = nuevoAtributoEditar
                        break;
                    case 'urlImagen':
                        productos[i].urlImagen = nuevoAtributoEditar
                        break;
                    default:
                        break;
                }
                mensaje.classList.add('realizado');
                setTimeout(() => {
                    mensaje.classList.remove('repetidoError');
                    window.location.reload();
                }, 1500)
            } 
        }
    }
    guardarAlmacenamientoLocal('productos', productos);
    console.log('Producto almacenado: ' + JSON.stringify(productos));
    
})