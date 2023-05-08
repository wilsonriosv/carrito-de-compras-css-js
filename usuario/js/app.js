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
/* Variables que traemos de nuestro HTML */
const infoCompra = document.getElementById('infoCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById('numero');
const header = document.querySelector("#header")
const total = document.getElementById("total");
const body = document.querySelector('body');
const x = document.getElementById('x');

/* Variables que vamos a usar en nuestro proyecto */
let lista = [];
let valorTotal = 0;

/* Scroll de nuestra página */
window.addEventListener('scroll', function() {
    if(contenedor.getBoundingClientRect().top < 10){
        header.classList.add('scroll');
    }
    else{
        header.classList.remove('scroll');
    }
})

/* Cauando cargue la página */
window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add('none');
})

/* Función para .... */
function visualizarProductos() {
    contenedor.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].existencia > 0) {
            contenedor.innerHTML += `<div><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><button onclick=comprar(${i})>Comprar</button></div></div>`
        }else{
            contenedor.innerHTML += `<div><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><p class="soldOut">Sold Out</p></div></div>`
        }
    }
}

/* Función para ... */
function comprar(indice) {
    lista.push({nombre: productos[indice].nombre, precio: productos[indice].valor})
    let sw = true;
    let i = 0;
    while (sw) {
        if (productos[i].nombre == productos[indice].nombre) {
            productos[i].existencia -= 1;
            if (productos[i].existencia == 0) {
                visualizarProductos();
            }
            sw = false;
        }
        guardarAlmacenamientoLocal("productos", productos);
        i += 1;
    }
    numero.innerHTML = lista.length;
    numero.classList.add("disenoNumero");
    return lista;
}

carrito.addEventListener("click", () => {
    body.style.overflow = "hidden";
    contenedorCompra.classList.remove('none');
    contenedorCompra.classList.add('contenedorCompra');
    infoCompra.classList.add('infoCompra');
    mostrarElementosLista();
})

function mostrarElementosLista() {
        productosCompra.innerHTML = "";
        valorTotal = 0;
        for (let i = 0; i < lista.length; i++) {
            productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="/img/trash.png"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`
            {/* <div>
                <div class="img">
                    <button onclick=eliminar(${i}) class="botonTrash">
                        <img src="../img/icon_trash.png" alt="Papelera">
                    </button>
                    <p>${lista[i].nombre}</p>
                </div>
                <p>${lista[i].precio}</p>
            </div> */}
            valorTotal += parseInt(lista[i].precio);
        }
        total.innerHTML = `<p>Valor Total</p> <p><span>$${valorTotal}</span></p> `
}

function eliminar(indice){
    let sw=true;
    let i=0;
    while (sw) {
        if (productos[i].nombre == lista[indice].nombre) {
            productos[i].existencia += 1;
            lista.splice(indice,1);
            sw=false;
        }
        i += 1;
    }
    guardarAlmacenamientoLocal("productos", productos);
    numero.innerHTML = lista.length;
    if (lista.length == 0){
        numero.classList.remove("disenoNumero")
    }
    visualizarProductos();
    mostrarElementosLista();
}

x.addEventListener('click', () => {
    body.style.overflow = "auto";
    contenedorCompra.classList.add('none');
    contenedorCompra.classList.remove('contenedorCompra');
    infoCompra.classList.remove('infoCompra');
});