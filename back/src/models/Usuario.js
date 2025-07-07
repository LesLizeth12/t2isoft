class Usuario{
    static tableName = 'usuario';
    constructor(Id, UsuTipoId, UsuDni, UsuApePaterno, UsuApeMaterno, UsuNombres, UsuGenero, UsuCorreo, 
        UsuFecRegistro, UsuFecNacimiento, UsuNombre, UsuPassword,Estado){
        this.Id = Id;
        this.UsuTipoId = UsuTipoId;
        this.UsuDni = UsuDni;
        this.UsuApePaterno = UsuApePaterno;
        this.UsuApeMaterno = UsuApeMaterno;
        this.UsuNombres = UsuNombres;
        this.UsuGenero = UsuGenero;
        this.UsuCorreo = UsuCorreo;
        this.UsuFecRegistro = UsuFecRegistro;
        this.UsuFecNacimiento = UsuFecNacimiento;
        this.UsuNombre = UsuNombre;
        this.UsuPassword = UsuPassword;
        this.Estado = Estado;
    }
}
module.exports = Usuario;