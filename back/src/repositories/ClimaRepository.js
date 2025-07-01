const CrudRepository = require('../lib/crudRepository');
const Clima = require('../models/Clima');

class ClimaRepository extends CrudRepository{
    constructor(){
        super(Clima);
    }
}
module.exports = new ClimaRepository();