const CrudRepository = require('../lib/crudRepository');
const ZonaTuristica = require('../models/ZonaTuristica');

class ZonaTuristicaRepository extends CrudRepository{
    constructor(){
        super(ZonaTuristica);
    }
}
module.exports = new ZonaTuristicaRepository();