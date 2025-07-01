class Horario{
    static tableName = 'horario';
    constructor(id, horEstId, horLlegada, horSalida, horPrecio, horDurac, estado){
        this.id = id;
        this.horEstId = horEstId;
        this.horLlegada = horLlegada;
        this.horSalida = horSalida;
        this.horPrecio = horPrecio;
        this.horDurac = horDurac;
        this.estado = estado;
    }
}
module.exports = Horario;