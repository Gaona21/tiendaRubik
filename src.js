/*const productos = [
					{id:1, nombre:"Cubo Rubik 2x2", precio:640, categoria:"2x2", stock:25, img:"./img/cubos/cubo2x2.png"},
					{id:2, nombre:"Cubo Rubik 3x3", precio:1240, categoria:"3x3", stock:51, img:"./img/cubos/cubo3x3.png"},
					{id:3, nombre:"Piramix 3x3", precio:640, categoria:"3x3", stock:11, img:"./img/cubos/piramix3x3.png"},
					{id:4, nombre:"Cubo Rubik 4x4", precio:1600, categoria:"4x4", stock:5, img:"./img/cubos/cubo4x4.png"},
					{id:5, nombre:"Cubo Mirror 3x3", precio:1000, categoria:"3x3", stock:15, img:"./img/cubos/cuboMirror3x3.png"},
					{id:6, nombre:"Llavero cubo 2x2", precio:1000, categoria:"2x2", stock:17, img:"./img/cubos/llavero2x2.png"},
					{id:7, nombre:"Llavero cubo 3x3", precio:1200, categoria:"3x3", stock:22, img:"./img/cubos/llavero3x3.png"}
					];*/

let carrito = [];
let banderaMensaje = false;

let main = document.querySelector(".main");
let contCard = document.querySelector(".cont-cards");
let contCardCarrito = document.querySelector(".cont-listaPedidos");

function createCardProducto (urmlImg, nombreProducto, precioProducto) {

	let card = document.createElement("div");

	card.classList.add("card"); 
	contCard.appendChild(card);

	let cont_imgCard = document.createElement("div");

	cont_imgCard.classList.add("cont-imgCard"); 
	card.appendChild(cont_imgCard);

	let img_producto = document.createElement("img");

	img_producto.classList.add("img-producto");
	img_producto.src = urmlImg;
	cont_imgCard.appendChild(img_producto);

	let cont_cuerpoCard = document.createElement("div");

	cont_cuerpoCard.classList.add("cont-cuerpoCard");
	card.appendChild(cont_cuerpoCard);

	let nombre_producto = document.createElement("h2");

	nombre_producto.classList.add("nombre-producto");
	nombre_producto.innerText = nombreProducto;
	cont_cuerpoCard.appendChild(nombre_producto);

	let precio_producto = document.createElement("p");

	precio_producto.classList.add("precio-producto");
	precio_producto.innerText = "$"+precioProducto;
	cont_cuerpoCard.appendChild(precio_producto);

	let btnComprar = document.createElement("button");

	btnComprar.innerText="Comprar";
	btnComprar.classList.add("btn-comprar");
	cont_cuerpoCard.appendChild(btnComprar);

}

function createCardCarrito (urlImg, precioProducto) {
	let card = document.createElement("div");
	card.classList.add("card-carrito");
	contCardCarrito.appendChild(card);

	let btnEliminar = document.createElement("div");
	btnEliminar.classList.add("btnEliminar");
	btnEliminar.innerText="x";
	card.appendChild(btnEliminar);

	let contImagen = document.createElement("div");
	contImagen.classList.add("card-img-producto");
	card.appendChild(contImagen);

	let imagenProducto = document.createElement("img");
	imagenProducto.src = urlImg; 
	contImagen.appendChild(imagenProducto);

	let precio = document.createElement("div");
	precio.classList.add("card-precio-producto");
	precio.innerText = "$"+precioProducto;
	card.appendChild(precio);

	let contCantidad = document.createElement("div");
	contCantidad.classList.add("card-cantidad-producto");
	card.appendChild(contCantidad);

	let btnMenos = document.createElement("div");
	btnMenos.innerText=" - ";
	btnMenos.classList.add("menos");
	contCantidad.appendChild(btnMenos);

	let inputCantidad = document.createElement("input");
	inputCantidad.classList.add("cantidad");
	inputCantidad.type="number";
	
	inputCantidad.value = 1;
	inputCantidad.disabled = true;
	contCantidad.appendChild(inputCantidad);

	let btnMas = document.createElement("div");
	btnMas.innerText=" + ";
	btnMas.classList.add("mas");
	contCantidad.appendChild(btnMas);

	let subTotal = document.createElement("div");
	subTotal.classList.add("card-sub-total");
	card.appendChild(subTotal);
}

function mensajeModal(mensaje,estado) {
	let mensajeModal = document.getElementById("cont-modal");
	mensajeModal.innerText=mensaje;
	mensajeModal.style.display = estado;
}

function activarMensajeModal (mensaje,estado) {
	mensajeModal (mensaje,estado);
	banderaMensaje = true;

	if(banderaMensaje === true){
				
		let timerModal = setInterval(()=>{
			banderaMensaje = false;
			mensajeModal (" ","none");
			clearInterval(timerModal);
		},2500);
	} 
}

function mensajeModal2(mensaje,icono){
	Swal.fire({
		heightAuto:100,
		position: 'top-end',
		icon: icono,
		title: mensaje,
		showConfirmButton: false,
		timer: 1000
	  })
}

function agregarAlCarrito (prodId, prodNombre, prodPrecio, prodImg, cantidadProducto) {
	carrito.push(
		{
			id: prodId,
			nombre: prodNombre,
			precio: prodPrecio,
			img: prodImg,
			cantidad:cantidadProducto,
		}
	);
	mostrarCarrito();
}

function mostrarCarrito () {

	contCardCarrito.innerHTML=" ";

	carrito.forEach((producto)=>{
		createCardCarrito (producto.img, producto.precio);
		localStorage.setItem("carrito",JSON.stringify(carrito));
	});

	agregarEventoEliminar ();
	cantidadProductoCarrito ();
	calcularSubTotal ();
	calcularTotal ()
}

function eliminarDelCarrito (prodIndice) {
	carrito.splice(prodIndice, 1);
	localStorage.setItem("carrito",JSON.stringify(carrito));
}

function agregarEventoEliminar () {
	let btnEliminar = document.getElementsByClassName("btnEliminar");

	for (let i = 0; i < btnEliminar.length; i++) {
		btnEliminar[i].addEventListener("click",()=>{
			eliminarDelCarrito(i);
			mostrarCarrito();
	});
	}
}

function cantidadProductoCarrito () {
	let btnMenos = document.getElementsByClassName("menos");
	let btnMas = document.getElementsByClassName("mas");
	let cantidadProd = document.getElementsByClassName("cantidad");


	for (let i = 0; i < btnMenos.length; i++) {
		btnMenos[i].addEventListener("click",()=>{
			if(parseInt(cantidadProd[i].value)>1){
				cantidadProd[i].value = parseInt(cantidadProd[i].value)-1;
			}
			calcularSubTotal ();
			calcularTotal ()
		});

		btnMas[i].addEventListener("click",()=>{
			cantidadProd[i].value = parseInt(cantidadProd[i].value)+1;
			calcularSubTotal ();
			calcularTotal ()
		});
	}
}

function calcularSubTotal () {
	let cantidadProd = document.getElementsByClassName("cantidad");
	let subTotal = document.getElementsByClassName("card-sub-total");

	for(let i = 0; i<subTotal.length; i++){
		subTotal[i].innerText="$"+carrito[i].precio*parseInt(cantidadProd[i].value);
		subTotal[i].value = carrito[i].precio*parseInt(cantidadProd[i].value);
	}
}

function calcularTotal () {
	let totalAPagar = document.getElementsByClassName("precio-total");
	
	let subTotal = document.getElementsByClassName("card-sub-total");
	let acumulador = 0;

	for(let i = 0; i<subTotal.length; i++){
		acumulador += parseInt(subTotal[i].value);
	}

	totalAPagar[0].innerText = "TOTAL: $"+acumulador;
	totalAPagar[0].value = acumulador;
}

document.addEventListener("DOMContentLoaded", ()=>{
	if(localStorage.getItem("carrito")){
		carrito = JSON.parse(localStorage.getItem("carrito"));
		mostrarCarrito();
	}
});

let productosCargados = [];

contCard.innerHTML=`<img src="./img/cubo-rubik-gif-carga.gif" class="gif-carga" alt="gif cubo rubik">`;

function traerProductos(array) {
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
			resolve(array)
		}, 2900);
	})
}

fetch('productos.json')
	.then((res) => res.json())
		.then((data) => {
			traerProductos(data)
				.then((res)=>{	
					productosCargados = res;
					contCard.innerHTML="";
					productosCargados.forEach((producto)=>{
						createCardProducto(producto.img, producto.nombre, producto.precio);
					});

					let btnComprar = document.getElementsByClassName("btn-comprar");

						for(let i=0;i<btnComprar.length;i++){

							btnComprar[i].addEventListener("click", ()=>{

								if(carrito.some((el)=>el.id===productosCargados[i].id)){
									//activarMensajeModal ("Este producto ya fue agregado al carrito","flex");
									mensajeModal2("Este producto ya esta en el carrito","warning");
								}else{
									agregarAlCarrito (productosCargados[i].id, productosCargados[i].nombre, productosCargados[i].precio, productosCargados[i].img)
									//activarMensajeModal ("Se agrego el producto al carrito","flex");
									mensajeModal2("Se agrego el producto al carrito","success");
								}
							});
						}
					})

				.catch(()=>{
					console.log("paso algo raro, intentalos mas tarder...")
				})
})
.catch(()=>{
	
	setTimeout(()=>{
		contCard.innerHTML=`<img src="./img/error.jpg">`;
		console.log("paso algo raro, intentalos mas tarder...")
	},1000);
	
})



/*let btnVaciarCarrito = document.querySelector("#vaciar-carrito");

btnVaciarCarrito.addEventListener("click",()=>{
	carrito.length = 0;
	mostrarCarrito();
});*/

const btnOcultarCarrito = document.querySelector("#ocultarCarrito");

btnOcultarCarrito.addEventListener("click",()=>{
	const listaCompra = document.querySelector("#listaCompra");

	listaCompra.style.display="none";
});

let btnMostrarCarrito = document.querySelector("#mostrarCarrito");

btnMostrarCarrito.addEventListener("click",()=>{
	const listaCompra = document.querySelector("#listaCompra");

	let altoMain = screen.height - carrito.length*10-60;

	listaCompra.style.display="block";
	listaCompra.style.minHeight = altoMain +"px";
});

const btnFinalizarCompra = document.querySelector("#pagar");

btnFinalizarCompra.addEventListener("click",()=>{

	let montoTotal = document.querySelector(".precio-total");

	Swal.fire({
	title: 'Finalizar compra?',
	text: "El monto es de $"+montoTotal.value,
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Aceptar',
	cancelButtonText: 'Cancelar'
  }).then((result) => {
	if (result.isConfirmed) {
	  Swal.fire(
		'Se pago exitosamente',
		'Gracias por comprar en nuestra tienda, el carrito se vaciara.',
		'success'
	  )

	  carrito.length = 0;
		mostrarCarrito();
	}
  })
});