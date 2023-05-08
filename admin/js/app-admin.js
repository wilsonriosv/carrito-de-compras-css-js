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
let ruta = window.location.pathname;
console.log(ruta);

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
            mensaje.classList.remove('realizado');
            window.location.reload();
        }, 1500)
    }
    guardarAlmacenamientoLocal('productos', productos);
    console.log('Producto almacenado: ' + JSON.stringify(productos));
});

/* Editar productos */
const editarProducto = document.getElementById('productoEditar');
const editarAtributo = document.getElementById('atributoEditar');
const editarNuevoAtributo = document.getElementById('nuevoAtributo');

document.getElementById('botonEditar').addEventListener('click', (ev) => {
    ev.preventDefault();
    let productoEditar = editarProducto.value;
    let atributoEditar = editarAtributo.value;
    let nuevoAtributoEditar = editarNuevoAtributo.value;

    let sw = false;
    if (productoEditar == '' || atributoEditar == '' || nuevoAtributoEditar == '' ){
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos')},2500)
    }else{
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == productoEditar) {
                productos[i][atributoEditar] = nuevoAtributoEditar
                sw=true;
            } 
        }
        if (sw) {
            mensaje.classList.add('realizado');
            setTimeout(() => {
                mensaje.classList.remove('realizado');
                window.location.reload();
            }, 1500)
        }else{
            mensaje.classList.add('noExisteError');
            setTimeout(() => {mensaje.classList.remove('noExisteError') }, 2500);
        }
        guardarAlmacenamientoLocal('productos', productos);
        console.log('Producto almacenado: ' + JSON.stringify(productos));
    }
})

/* Eliminar productos */
const eliminarProducto = document.getElementById('productoEliminar');
document.getElementById('botonEliminar').addEventListener('click', (ev) => {
    ev.preventDefault();
    let productoEliminar = eliminarProducto.value;
    let sw=false;
    if (productoEliminar == '') {
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos')},2500)
    }else{
        for (let i = 0; i < productos.length; i++) {
            console.log(productos[i].nombre +'=='+ productoEliminar);
            if (productos[i].nombre == productoEliminar) {
                productos.splice(i, 1); 
                sw=true;
            } 
        }
        if (sw) {
            mensaje.classList.add('realizado');
            setTimeout(() => {
                mensaje.classList.remove('realizado');
                window.location.reload();
            }, 1500)
        }else{
            mensaje.classList.add('noExisteError');
            setTimeout(() => {mensaje.classList.remove('noExisteError') }, 2500);
        }
        guardarAlmacenamientoLocal('productos', productos);
        console.log('Producto almacenado: ' + JSON.stringify(productos));
    }

})

/* Mostrar todos los productos */
window.addEventListener('load', () => {
    /* Llenar los elementos de lista select del html */
    const productoEd = document.getElementById('productoEditar');
    const productoEl = document.getElementById('productoEliminar');
    const atributoEd = document.getElementById('atributoEditar');
    for (let i = 0; i < productos.length; i++) {
        productoEd.innerHTML += `<option>${productos[i].nombre}</option>`;
        productoEl.innerHTML += `<option>${productos[i].nombre}</option>`;
    }
    console.log("Llena los select");
    /* Llenar el elemento de lista select del html de la lista de atributos*/
    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`;
        console.log("Atributo: " + element);
    });
    console.log('Producto almacenado: ' + JSON.stringify(productos));
    /* Llenar el div mostrarProductos del html */
    let mostrarProductos = document.getElementById('mostrarProductos');
    mostrarProductos.innerHTML = '';
    for (let i = 0; i < productos.length; i++) {
        mostrarProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"<div class="informacion"><p>${productos[i].nombre}</p><p class="precio"><span>Precio: ${productos[i].valor}$</span></p><p> Existencia: ${productos[i].existencia}</p></div></div>`
        /* 
        <div>
            <img src="../img/product1.jpg" alt="Producto 1">
            <div class="informacion">
                <p>Producto 1</p>
                <p class="precio">$199<span>.99</span></p>
                <button>Comprar</button>
            </div>
        </div>
        */
    }
})