// Siguiendo el esquema de la tienda de ropa, quiero hacer un catalogo de clases que un usuario pueda elegir
// Mi idea es que pueda también elegir los días que quiere tener clases
// Y ver de qué manera devolverle un listado de clases y días elegidos, y el total a pagar.


let costoClase = 0

function mostrarPrecio(codigo) {
    switch (codigo) {
        case 1:
            alert("La clase de Animal Flow cuesta $500")
            costoClase = 500
            break
        case 2:
            alert("La clase de Clavas & Mazas cuesta $700")
            costoClase = 700
            break
        case 3:
            alert("La clase de Kettlebells cuesta $600")
            costoClase = 600
            break
        case 4:
            alert("La clase de Danza cuesta $300")
            costoClase = 300
            break
        case 5:
            alert("La clase de MMA cuesta $1000")
            costoClase = 1000
            break
        case 6:
            alert("La clase de Vinyasa Yoga cuesta $400")
            costoClase = 400
            break
        default:
            alert("🤔 No entendimos tu selección.")
            break
    }
}

function consultarClases() {
    let codigoClase = prompt("Ingresa el código numérico de la clase que te gustaría anotarte:")
    if (codigoClase) {
        mostrarPrecio(parseInt(codigoClase))
        elegirDias()
        let respuesta = confirm("¿Deseas consultar el precio por otra clase?")
        if (respuesta === true) {
            consultarClases()
        }
    } else {
        console.warn("Debes ingresar un código válido.")
    }
}

function elegirDias() {
    console.log("Cuántos días a la semana te gustaría practicar?:")
    for (let i = 1; i <= 6; i++) {
        console.log("Viniendo " + i , "veces por semana, tu cuota mensual sería de $" + (costoClase * i)*4)
    }
    console.log("La recompensa es el camino transitado!")
}


// Voy a buscar si hay forma de elegir los días de la semana como Lunes, Martes, etc.
// le pedi a nuestro amigo chatgpt que me diera una funcion para elegir varios dias de la semana: 

function getDiasPractica() {
    const SeleccionDiasPractica = Array.from(document.querySelectorAll('input[name="diaPractica"]:checked'));
    const SeleccionDiasPracticaValues = SeleccionDiasPractica.map(day => day.value);
    const SeleccionDiasPracticaDisplay = document.getElementById('SeleccionDiasPractica');

    if (SeleccionDiasPractica.length > 0) {
        SeleccionDiasPracticaDisplay.textContent = SeleccionDiasPracticaValues.join(', ');
    } else {
        SeleccionDiasPracticaDisplay.textContent = 'No elegiste ningún día';
    }
}

// Y poder sumar el costoClase de un codigo con el de otro para dar un total.



// tiene un string, tiene un número, tiene un true = retorna TRUE
// está vacío '', tiene un 0, tiene un false, tiene un undefined, tiene un null = retorna FALSE
