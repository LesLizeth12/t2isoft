class Estacion{
    static tableName = 'estacion';
    constructor(Id, EstNombre, EstDescripcion, Estado){
        this.Id = Id;
        this.EstNombre = EstNombre;
        this.EstDescripcion = EstDescripcion;
        this.Estado = Estado;
    }
}
module.exports = Estacion;