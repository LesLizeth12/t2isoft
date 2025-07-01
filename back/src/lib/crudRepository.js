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

    async findById(id) {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id=?`, [id]);
        return rows[0];
    }

    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, data);
        return { id: result.insertId, ...data }; //...:CONCATENA EN UN SOLO OBJETO
    }

    async update(id, data) {
        await pool.query(`UPDATE ${this.tableName} SET ? WHERE id=?`, [data, id]);
        return this.findById(id);
    }

    async delete(id) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET estado=0 WHERE id=?`, [id]);
        return result.affectedRows > 0;
    }

    async restore(id) {
        const [result] = await pool.query(`UPDATE ${this.tableName} SET estado=1 WHERE id=?`, [id]);
        return result.affectedRows > 0;
    }

    /*
    async findAllClients() {
        const [result] = await pool.query(`SELECT p.id,p.dni,p.nombres,p.apellidos,p.direccion,p.telefono,p.email,p.estado FROM persona p
            LEFT JOIN usuario u ON p.id = u.id_persona
            WHERE u.id IS NULL`);
        return result;
    }
    */

    /*
    async findByIdVenta(id) {
        const [result] = await pool.query(`SELECT * FROM detalle_venta dv 
            INNER JOIN venta v ON dv.id_venta=v.id WHERE dv.id_venta=?`, [id]);
        return result;
    }
    */

    /*
    async findAllUsers() {
        const [result] = await pool.query(`SELECT u.id,username,p.id,p.nombres,p.apellidos,p.direccion,p.telefono,p.email FROM usuario u
            INNER JOIN persona p ON u.id_persona = p.id`);
        return result;
    }
        */

    async findByUsername(id) {
        const [rows] = await pool.query(`SELECT * FROM usuario WHERE usuarioNom=?`, [id]);
        return rows[0];
    }
}
module.exports = CrudRepository;
