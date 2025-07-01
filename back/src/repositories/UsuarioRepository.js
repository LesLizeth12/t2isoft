const CrudRepository = require('../lib/crudRepository');
const Usuario = require('../models/Usuario');

class UsuarioRepository extends CrudRepository{
    constructor(){
        super(Usuario);
    }

    async getUsuarioByUsername(usuarioNom){
        const [rows] = await this.pool.query(`select * from usuario  where usuarioNom=?`, [usuarioNom]);
        return rows;
    }
}
module.exports = new UsuarioRepository();