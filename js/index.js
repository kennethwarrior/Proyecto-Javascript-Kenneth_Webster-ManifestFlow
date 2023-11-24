/* ENTREGA 3: 

Acá busco que se pueda seleccionar desde el html las clases y los días y te responda con el costo total mensual, 
tal como lo hacía en la consola, ahora sale un mensaje en el html con esa información para el usuario.
BUSQUE HACER UN CODIGO MAS PROLIJO Y MENOS ENQUILOMBADO. JSON Y LOCALSTORAGE ME CUESTA UN POCO, NO QUISE JUGAR MUCHO PARA NO MANDARME ALGUNA MACANA

*/

// Acá defino el costo de cada clase (use costoClases porque arriba para la Entrega 2 usé costoClase para la consola //

 const costoClases = {
    animal: 500,
    yoga: 500,
    mma: 1000,
    danza: 400,
    pesas: 600,
    clavas: 600
};

// esta función guarda info en localStorage

function saveData() {

    // métodos para cada clase de la escuela:

    var animal = document.getElementById("animal").checked;
    var yoga = document.getElementById("yoga").checked;
    var mma = document.getElementById("mma").checked;
    var danza = document.getElementById("danza").checked;
    var pesas = document.getElementById("pesas").checked;
    var clavas = document.getElementById("clavas").checked;

    // método para los dias
    var diasSeleccionados = document.getElementById("dias").value;

    // Aca creamos un objeto para guardar la información: 
    var data = {
        animal: animal,
        yoga: yoga,
        mma: mma,
        danza: danza,
        pesas: pesas,
        clavas: clavas,
        dias: diasSeleccionados
    };

    // Calcular el costo total
    var costoTotal = calcularCostoTotal(data);

    // De Objeto a string JSON
    var jsonData = JSON.stringify(data);

    // Guardar el string JSON en localStorage
    localStorage.setItem("dataEscuelaMovimiento", jsonData);

    // Mensaje con el costo mensual
//    document.getElementById("totalCostoMensual").textContent = "Tu costo mensual es de: $" + costoTotal;
}

// Funcion que calcule el costo mensual (teniendo en cuenta las clases seleccionadas y los dias de practica) 

function calcularCostoTotal(data) {
    var costoTotal = 0;

    // Loop que toma las clases seleccionadas y le agrega los costos correspondientes: 
    for (var nombreClase in data) {
        if (data[nombreClase] && costoClases[nombreClase]) {
            costoTotal += costoClases[nombreClase];
        }
    }

    // Multiplica por dias seleccionados
    costoTotal *= data.dias;

    return costoTotal;
}

// Funcion para cargar la data en localStorage
function loadData() {
    // y nos de el string JSON 
    var jsonData = localStorage.getItem("dataEscuelaMovimiento");

    // Si hay data, parsearla: 
    if (jsonData) {
        var data = JSON.parse(jsonData);
        document.getElementById("animal").checked = data.animal;
        document.getElementById("yoga").checked = data.yoga;
        document.getElementById("mma").checked = data.mma;
        document.getElementById("danza").checked = data.danza;
        document.getElementById("pesas").checked = data.pesas;
        document.getElementById("clavas").checked = data.clavas;
        document.getElementById("dias").value = data.dias;

        // Aca muestra un mensaje con el costo total por mes:
      //  document.getElementById("totalCostoMensual").textContent = "El costo total mensual es de $" + calcularCostoTotal(data);
    }
}

// Función que muestre el total mensual en el html:

        function mostrarCostoTotal() {
            // Cargar data de localStorage
            var jsonData = localStorage.getItem("dataEscuelaMovimiento");
            if (jsonData) {
                var data = JSON.parse(jsonData);

                // Calcular el total
                var costoTotal = calcularCostoTotal(data);

                // Mostrarlo en el html (lo multiplico por 4 asumiendo que un mes tiene al menos 4 semanas, no sé como hacerlo mas preciso.)
                document.getElementById("totalCostoMensual").textContent = "El costo total mensual de tus clases es de $" + costoTotal * 4;
            } else {
                document.getElementById("totalCostoMensual").textContent = "No hay datos aún. Selecciona al menos una clase y un día para practicar.";
            }
        }

// Agrego un addEventListener para evitar errores mientras se carga la página
        window.addEventListener('load', mostrarCostoTotal);

    // Funcion para deshacer la seleccion:

            function deshacerSeleccion() {
                    
                    document.getElementById("animal").checked = false;
                    document.getElementById("yoga").checked = false;
                    document.getElementById("mma").checked = false;
                    document.getElementById("danza").checked = false;
                    document.getElementById("pesas").checked = false;
                    document.getElementById("clavas").checked = false;
        
                   // deshacer los dias
                    document.getElementById("dias").value = "1";
        
                    // deshacer el mensaje con costo total
                    document.getElementById("totalCostoMensual").textContent = "Elige una clase y al menos un día de práctica";
                }


loadData();









/* ACA QUEDA COMENTADO LO DE LA ENTREGA 2:

let costoClase = 0

function mostrarPrecio(codigo) {
    switch (codigo) {
        case 1:
            alert("La clase de Animal Flow cuesta $500")
            costoClase = 500
            break
        case 2:
            alert("La clase de Clavas & Mazas cuesta $600")
            costoClase = 700
            break
        case 3:
            alert("La clase de Kettlebells cuesta $600")
            costoClase = 600
            break
        case 4:
            alert("La clase de Danza cuesta $400")
            costoClase = 300
            break
        case 5:
            alert("La clase de MMA cuesta $1000")
            costoClase = 1000
            break
        case 6:
            alert("La clase de Vinyasa Yoga cuesta $500")
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

*/