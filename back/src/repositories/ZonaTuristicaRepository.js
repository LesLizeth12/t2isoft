const CrudRepository = require('../lib/crudRepository');
const ZonaTuristica = require('../models/ZonaTuristica');

class ZonaTuristicaRepository extends CrudRepository{
    constructor(){
        super(ZonaTuristica);
    }

    async findZonasByIdEstacion(estacionId){
        const[rows]=await this.pool.query(`SELECT * FROM estacion e inner join zonaturistica z on e.id=z.zonaEstId where e.id=?`,[estacionId]);
        return rows;
    }
}
module.exports = new ZonaTuristicaRepository();