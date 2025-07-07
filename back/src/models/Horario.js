class Horario{
    static tableName = 'horario';
    constructor(Id, horEstId, HorLlegada, HorSalida, HorPrecio, Estado){
        this.Id = Id;
        this.horEstId = horEstId;
        this.HorLlegada = HorLlegada;
        this.HorSalida = HorSalida;
        this.HorPrecio = HorPrecio;
        this.Estado = Estado;
    }
}
module.exports = Horario;