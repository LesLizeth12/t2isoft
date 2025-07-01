class ZonaTuristica{
    static tableName = 'zonaturistica';
    constructor(id, zonaEstId, zonaNom, zonaDesc, zonaDif, zonaDuracAprox, zonaDistMax, estado){
        this.id = id;
        this.zonaEstId = zonaEstId;
        this.zonaNom = zonaNom;
        this.zonaDesc = zonaDesc;
        this.zonaDif = zonaDif;
        this.zonaDuracAprox = zonaDuracAprox;
        this.zonaDistMax = zonaDistMax;
        this.estado = estado;
    }
}
module.exports = ZonaTuristica;