const CrudRepository = require('../lib/crudRepository');
const Clima = require('../models/Clima');

class ClimaRepository extends CrudRepository{
    constructor(){
        super(Clima);
    }

    async findByEstacionAndFecha(climaEstId, climaFec) {
    const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE climaEstId = ? AND climaFec = ?`,
        [climaEstId, climaFec]
    );
    return rows[0];
}
}
module.exports = new ClimaRepository();