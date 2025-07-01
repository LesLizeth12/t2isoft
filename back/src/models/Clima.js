class Clima{
    static tableName = 'clima';
    constructor(id, climaEstId, climaFec, climaTempMax, climaTempMin, estado){
        this.id = id;
        this.climaEstId = climaEstId;
        this.climaFec = climaFec;
        this.climaTempMax = climaTempMax;
        this.climaTempMin = climaTempMin;
        this.estado = estado;
    }
}
module.exports = Clima;