const CrudRepository = require('../lib/crudRepository');
const Horario = require('../models/Horario');

class HorarioRepository extends CrudRepository{
    constructor(){
        super(Horario);
    }

    async findHorariosByIdEstacion(estacionId){
        const[rows]=await this.pool.query(`SELECT * FROM estacion e inner join horario h on e.id=h.horEstId where e.id=?`,[estacionId]);
        return rows;
    }
}
module.exports = new HorarioRepository();