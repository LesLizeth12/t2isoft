const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 

class CrudRepository {
    constructor(model) {
        this.model = model;
        this.tableName = model.tableName;
        this.pool=pool;
    }

    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    async findById(Id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE Id=?`, [Id]);
        return rows[0];
    }

    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, data);
        return { Id: result.insertId, ...data }; //...:CONCATENA EN UN SOLO OBJETO
    }

    async update(Id, data) {
        await pool.query(`UPDATE ${this.tableName} SET ? WHERE Id=?`, [data, Id]);
        return this.findById(Id);
    }

    async delete(Id) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET Estado=0 WHERE Id=?`, [Id]);
        return result.affectedRows > 0;
    }

    async restore(Id) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET Estado=1 WHERE Id=?`, [Id]);
        return result.affectedRows > 0;
    }

    /*
    async findAllClients() {
        const [result] = await pool.query(`SELECT p.Id,p.dni,p.nombres,p.apellIdos,p.direccion,p.telefono,p.email,p.Estado FROM persona p
            LEFT JOIN usuario u ON p.Id = u.Id_persona
            WHERE u.Id IS NULL`);
        return result;
    }
    */

    /*
    async findByIdVenta(Id) {
        const [result] = await pool.query(`SELECT * FROM detalle_venta dv 
            INNER JOIN venta v ON dv.Id_venta=v.Id WHERE dv.Id_venta=?`, [Id]);
        return result;
    }
    */

    /*
    async findAllUsers() {
        const [result] = await pool.query(`SELECT u.Id,username,p.Id,p.nombres,p.apellIdos,p.direccion,p.telefono,p.email FROM usuario u
            INNER JOIN persona p ON u.Id_persona = p.Id`);
        return result;
    }
        */

    async findByUsername(Id) {
        const [rows] = await pool.query(`SELECT * FROM usuario WHERE UsuNombre=?`, [Id]);
        return rows[0];
    }
}
module.exports = CrudRepository;
