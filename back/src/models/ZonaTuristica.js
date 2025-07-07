class ZonaTuristica{
    static tableName = 'zonaturistica';
    constructor(Id, ZonaEstId, ZonaNombre, ZonaDescripcion, Estado){
        this.Id = Id;
        this.ZonaEstId = ZonaEstId;
        this.ZonaNombre = ZonaNombre;
        this.ZonaDescripcion = ZonaDescripcion;
        this.Estado = Estado;
    }
}
module.exports = ZonaTuristica;