class Informe{
    static tableName = 'informe';
    constructor(id, infUsuarioId, infEstId, infZonaId, infHorId, infClimaNom, infFecActual, estado){
        this.id = id;
        this.infUsuarioId = infUsuarioId;
        this.infEstId = infEstId;
        this.infZonaId = infZonaId;
        this.infHorId = infHorId;
        this.infClimaNom = infClimaNom;
        this.infFecActual = infFecActual;
        this.estado = estado;
    }
}
module.exports = Informe;