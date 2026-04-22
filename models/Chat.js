const pool = require('../services/database')


class Chat {
    static async all() {
        const query = 'SELECT id, name, is_public, expired_at, created_at FROM chats;'

        const result = await pool.query(query);

        return result.rows;
    }

    static async create({name, is_public, password, expired_at}) {
        const query = 'INSERT INTO chats (name, is_public, password, expired_at) VALUES ($1, $2, $3, $4) RETURNING *;'
        const data = new Date(Date.now() + expired_at * 60 * 60 * 1000);
        const values = [name, is_public, password || null, data];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    static async getById(id) {
        const query = 'SELECT id, name, is_public, expired_at, created_at FROM chats WHERE id = $1 LIMIT 1';
        const values = [id];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    static async update({name, is_public, password, expired_at, id}) {
        const query = 'UPDATE chats SET name = $1, is_public = $2, password = $3, expired_at = $4 WHERE id = $5 LIMIT 1 RETURNING *;'
        const values = [name, is_public, password, expired_at, id];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM chats WHERE id = $1 LIMIT 1 *;'
        const values = [id]

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    static async deleteExpired() {
        const query = 'DELETE FROM chats WHERE expired_at <= NOW() RETURNING *;'

        const result = await pool.query(query);

        return result.rows;
    }

    static async getChatForLogin(id) {
        const query = 'SELECT * FROM chats WHERE id = $1 LIMIT 1;'
        const values = [id];

        const result = await pool.query(query, values);

        return result.rows[0];
    }
}

/**
 * id 
name 
is_public
password
expired_at
created_at
 */

module.exports = Chat;