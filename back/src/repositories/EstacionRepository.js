const CrudRepository = require('../lib/crudRepository');
const Estacion = require('../models/Estacion');

class EstacionRepository extends CrudRepository{
    constructor(){
        super(Estacion);
    }
}
module.exports = new EstacionRepository();