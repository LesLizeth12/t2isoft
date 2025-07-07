const CrudRepository = require('../lib/crudRepository');
const Horario = require('../models/Horario');

class HorarioRepository extends CrudRepository{
    constructor(){
        super(Horario);
    }

    async findHorariosByIdEstacion(estacionId){
        const[rows]=await this.pool.query(`SELECT * FROM estacion e inner join horario h on e.Id=h.HorEstId where e.Id=?`,[estacionId]);
        return rows;
    }
}
module.exports = new HorarioRepository();