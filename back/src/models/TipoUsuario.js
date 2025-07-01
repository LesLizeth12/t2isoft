class TipoUsuario{
    static tableName = 'tipousuario';
    constructor(id, tipoNom, estado){
        this.id = id;
        this.tipoNom = tipoNom;
        this.estado = estado;
    }
}
module.exports = TipoUsuario;