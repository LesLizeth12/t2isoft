const CrudRepository = require('../lib/crudRepository');
const ZonaTuristica = require('../models/ZonaTuristica');

class ZonaTuristicaRepository extends CrudRepository{
    constructor(){
        super(ZonaTuristica);
    }

    async findZonasByIdEstacion(estacionId){
        const[rows]=await this.pool.query(`SELECT * FROM estacion e inner join zonaturistica z on e.Id=z.ZonaEstId where e.Id=?`,[estacionId]);
        return rows;
    }
}
module.exports = new ZonaTuristicaRepository();