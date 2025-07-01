const CrudRepository = require('../lib/crudRepository');
const Preferencia = require('../models/Preferencia');

class PreferenciaRepository extends CrudRepository{
    constructor(){
        super(Preferencia);
    }
}
module.exports = new PreferenciaRepository();