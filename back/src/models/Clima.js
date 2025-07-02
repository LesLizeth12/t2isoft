class Clima{
    static tableName = 'clima';
    constructor(id, climaEstId, climaFec, climaTempActual, climaTempMax, climaTempMin, estado){
        this.id = id;
        this.climaEstId = climaEstId;
        this.climaFec = climaFec;
        this.climaTempActual = climaTempActual;
        this.climaTempMax = climaTempMax;
        this.climaTempMin = climaTempMin;
        this.estado = estado;
    }
}
module.exports = Clima;