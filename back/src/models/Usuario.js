class Usuario{
    static tableName = 'usuario';
    constructor(id, usuarioTipoId, usuarioDni, usuarioApePat, usuarioApeMat, usuarioNombres, usuarioGenero, usuarioCorreo, 
        usuarioFecReg, usuarioFecNac, usuarioNom, usuarioPass,estado){
        this.id = id;
        this.usuarioTipoId = usuarioTipoId;
        this.usuarioDni = usuarioDni;
        this.usuarioApePat = usuarioApePat;
        this.usuarioApeMat = usuarioApeMat;
        this.usuarioNombres = usuarioNombres;
        this.usuarioGenero = usuarioGenero;
        this.usuarioCorreo = usuarioCorreo;
        this.usuarioFecReg = usuarioFecReg;
        this.usuarioFecNac = usuarioFecNac;
        this.usuarioNom = usuarioNom;
        this.usuarioPass = usuarioPass;
        this.estado = estado;
    }
}
module.exports = Usuario;