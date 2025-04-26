const mongoose = require('mongoose');
const { DB_URI } = require('./serverConfig');

let instance;

class DBConnection {
    #isConnected;
    constructor(db_uri) {
        if(instance) {
            throw new Error('Only one connection can exist');
        }

        this.uri = db_uri;
        instance = this;
        this.#isConnected = false;
    }

    async connect() {
        if(this.#isConnected) {
            throw new Error('DB already connected');
        }

        await mongoose.connect(this.uri);
        this.#isConnected = true;
    }

    async disconnect() {
        if(this.#isConnected) {
            await mongoose.disconnect();
            this.#isConnected = false;
        }
    }
}

const db = Object.freeze(new DBConnection(DB_URI));

module.exports = db;