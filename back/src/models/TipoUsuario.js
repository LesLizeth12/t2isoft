class TipoUsuario{
    static tableName = 'tipousuario';
    constructor(Id, TipoNombre, Estado){
        this.Id = Id;
        this.TipoNombre = TipoNombre;
        this.Estado = Estado;
    }
}
module.exports = TipoUsuario;