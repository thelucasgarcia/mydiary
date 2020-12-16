const _ = require('lodash');
const database = require('../utils/database');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

class UserSchema {
    constructor(data) {
        this.id = uuid();
        this.name = data?.name;
        this.email = data?.email;
        this.password = bcrypt.hashSync(data?.password, 8); // requesting crypt password 
    }
}

class User {
    static model = 'users.json';

    static all() {
        return database.getDataFromDatabase(this.model);
    }
    
    static find(id) {
        const records = database.getDataFromDatabase(this.model);
        return _.find(records, ['id', id]);
    }

    static create(payload) {
        const record = new UserSchema(payload);
        const records = _.concat(database.getDataFromDatabase(this.model), record);
        database.setDataFromDatabase(this.model, records);
        return record;
    }

    static update(id, payload) {
        const records = database.getDataFromDatabase(this.model);
        const index = _.findIndex(records, ['id', id]);
        const record = this.find(id);
        records.splice(index, 1, _.merge(record, payload));
        database.setDataFromDatabase(this.model, records);
        return this.find(id);
    }

    static delete(id) {
        const records = database.getDataFromDatabase(this.model);
        _.remove(records, (item) => { return item.id === id });
        database.setDataFromDatabase(this.model, records);
        return this.find(id);
    }
}

module.exports = User;