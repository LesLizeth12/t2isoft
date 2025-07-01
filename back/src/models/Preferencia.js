class Preferencia{
    static tableName = 'preferencia';
    constructor(id, preUsuarioId, preClimaId,preTipoRuta,preDuracMax,preFecDeseada,estado){
        this.id = id;
        this.preUsuarioId = preUsuarioId;
        this.preClimaId = preClimaId;
        this.preTipoRuta = preTipoRuta;
        this.preDuracMax = preDuracMax;
        this.preFecDeseada = preFecDeseada;
        this.estado = estado;
    }
}
module.exports = Preferencia;