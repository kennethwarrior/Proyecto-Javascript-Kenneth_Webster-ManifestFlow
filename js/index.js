// JSON
const catalogoUrl = "js/catalogo.json";
const cart = JSON.parse(localStorage.getItem("miCarrito")) || [];
const catalog = [];

// Carrito
const miCarrito = {
    items: [],
    total: 0,

    agregarItem(item) {
        this.items.push(item);
        this.calcularTotal();
        this.mostrarCarrito();
    },

    quitarItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.calcularTotal();
            this.mostrarCarrito();
        }
    },

    calcularTotal() {
        this.total = this.items.reduce((acc, item) => acc + item.precio, 0);
    },

    mostrarCarrito() {
        const articuloEnCarrito = document.getElementById("lista-carrito");
        const totalPrecioCarrito = document.getElementById("total-precio");

        // Limpiar miCarrito
        articuloEnCarrito.innerHTML = "";

        // agregar o quitar items
        this.items.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">Price: $${item.precio.toFixed(2)}</p>
                    <button class="btn btn-danger" onclick="miCarrito.quitarItem(${index})">Quitar</button>
                </div>
            `;
            articuloEnCarrito.appendChild(card);
        });

        // Actualizar el total
        totalPrecioCarrito.textContent = `Total: $${this.total.toFixed(2)}`;
    },
};

// Mostrar Catálogo
document.addEventListener("DOMContentLoaded", () => {
    // Fetch
    fetch(catalogoUrl)
        .then(response => response.json())
        .then(data => {
            const catalogoClasesEscuela = document.getElementById("catalogo-clases");
            const catalogoArticulosEscuela = document.getElementById("catalogo-articulos");

            data.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Precio: $${item.precio.toFixed(2)}</p>
                            <button class="btn btn-primary agregar-carrito-boton">Agregar al Carrito</button>
                        </div>
                    </div>
                `;

                const botonAgregarCarrito = li.querySelector('.agregar-carrito-boton');
                botonAgregarCarrito.addEventListener('click', () => agregarAlCarrito(item));

                if (item.categoria === "Clases") {
                    catalogoClasesEscuela.appendChild(li);
                } else if (item.categoria === "Artículos") {
                    catalogoArticulosEscuela.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching catalog:", error);
            displayErrorToast();
        });
});

// Botón "Comprar"
const comprarBtn = document.getElementById("comprar-btn");
comprarBtn.addEventListener("click", () => realizarCompra());

function realizarCompra() {
    // Vaciar el carrito
    miCarrito.items = [];
    miCarrito.total = 0;

    // Mostrar mensaje de agradecimiento
    displaySuccessToast("Gracias por tu compra, te esperamos en el dojo!");

    // Actualizar y mostrar el carrito
    miCarrito.mostrarCarrito();
}

function agregarAlCarrito(item) {
    // Si ya hay una Clase agregada, esto previene que no se vuelva a agregar
    const isItemInCart = miCarrito.items.some(cartItem => cartItem.id === item.id);

    if (!isItemInCart) {
        
        miCarrito.agregarItem(item);
        displaySuccessToast(`${item.nombre} ha sido agregado a tu carrito.`);
    } else {
        
        displayWarningToast(`${item.nombre} ya está en tu carrito.`);
    }
}

function displaySuccessToast(mensaje) {
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "top",
        position: 'right',
        stopOnFocus: true,
        style: {
            background: "#4CAF50",
        },
    }).showToast();
}

function displayErrorToast() {
    Toastify({
        text: "Error al cargar el catálogo. Inténtalo de nuevo.",
        duration: 3000,
        gravity: "top",
        position: 'right',
        style: {
            background: "#ff6666",
        },
    })

}
