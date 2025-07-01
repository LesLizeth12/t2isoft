class Estacion{
    static tableName = 'estacion';
    constructor(id, estNom, estUbi, estDesc, estado){
        this.id = id;
        this.estNom = estNom;
        this.estUbi = estUbi;
        this.estDesc = estDesc;
        this.estado = estado;
    }
}
module.exports = Estacion;