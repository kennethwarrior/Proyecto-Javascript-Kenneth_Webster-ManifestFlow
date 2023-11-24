class subscripcionUsuario { 
    constructor(SubDeClases) {
        this.ClasesDelMes = SubDeClases
    }
    obtenerSubtotal() {
        if (this.ClasesDelMes.length > 0) { 
            return this.ClasesDelMes.reduce((acumulador, clase)=> acumulador + clase.precioXclase, 0)
        }
    }
}