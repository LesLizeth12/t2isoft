const CrudRepository = require('../lib/crudRepository');
const Horario = require('../models/Horario');

class HorarioRepository extends CrudRepository{
    constructor(){
        super(Horario);
    }
}
module.exports = new HorarioRepository();