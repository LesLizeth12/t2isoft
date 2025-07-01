class Informe{
    static tableName = 'informe';
    constructor(id, infUsuarioId, infZonaId,infClimaId,infPreId, infFecGen, estado){
        this.id = id;
        this.infUsuarioId = infUsuarioId;
        this.infZonaId = infZonaId;
        this.infClimaId = infClimaId;
        this.infPreId = infPreId;
        this.infFecGen = infFecGen;
        this.estado = estado;
    }
}
module.exports = Informe;