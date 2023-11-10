const ClasesDelMes = []

// ARRAY DE CLASES:

const clases = [{codigo: 1, nombre: 'Animal Flow ', precioXclase: 500},
                 {codigo: 2, nombre: 'Clavas & Mazas', precioXclase: 700},
                 {codigo: 3, nombre: 'Kettlebells', precioXclase: 600},
                 {codigo: 4, nombre: 'Danza', precioXclase: 300},
                 {codigo: 5, nombre: 'MMA', precioXclase: 1000},
                 {codigo: 6, nombre: 'Vinyasa Yoga', precioXclase: 700}]



// buscador de clases

function buscarClase(codigo) {
    let claseSeleccionada = clases.find((clase)=> clase.codigo === codigo)
    return claseSeleccionada
}

// prototipo de subscripcion 

function subscripcion() {
    let codigo = prompt("Ingresa el codigo de la clase que querés sumarte")
    let claseSubscrita = buscarClase(parseInt(codigo))

    let cadenciaSemanal = prompt("Ingresa el número de veces que querés practicar a la semana?")

    if (claseSubscrita !== undefined) {
        ClasesDelMes.push(claseSubscrita)
        let respuesta = confirm("Te gustaría anotarte a otra clase?")
        if (respuesta === true) {
            subscripcion()
        } else {
            const compra = new Subscripcion(ClasesDelMes)
            let subtotal = compra.obtenerSubtotal()
            console.table(ClasesDelMes)
            // EN ESTE console.table no sé como hacer para agregar una nueva columna con la cantidad de clases x semana
            // pero ya lo voy a descubrir!
            
            alert("El costo mensual de tu subscripción es de $ " + (subtotal * 4))
        }
    } else {
        alert("Ha ocurrido un error, el codigo de la clase no es correcto. Refrezca la página para volver a empezar.")
    }
}

