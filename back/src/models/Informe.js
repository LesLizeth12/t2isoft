class Informe{
    static tableName = 'informe';
    constructor(Id, InfUsuId, InfEstId, InfZonaId, InfHorId, InfClimaNombre, InfFecActual, Estado){
        this.Id = Id;
        this.InfUsuId = InfUsuId;
        this.InfEstId = InfEstId;
        this.InfZonaId = InfZonaId;
        this.InfHorId = InfHorId;
        this.InfClimaNombre = InfClimaNombre;
        this.InfFecActual = InfFecActual;
        this.Estado = Estado;
    }
}
module.exports = Informe;