const CrudRepository = require('../lib/crudRepository');
const TipoUsuario = require('../models/TipoUsuario');

class TipoUsuarioRepository extends CrudRepository{
    constructor(){
        super(TipoUsuario);
    }
}
module.exports = new TipoUsuarioRepository();