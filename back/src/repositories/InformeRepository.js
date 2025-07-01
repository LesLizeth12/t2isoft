const CrudRepository = require('../lib/crudRepository');
const Informe = require('../models/Informe');

class InformeRepository extends CrudRepository{
    constructor(){
        super(Informe);
    }
}
module.exports = new InformeRepository();