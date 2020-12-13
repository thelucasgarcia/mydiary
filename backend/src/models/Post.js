const _ = require('lodash');
const database = require('../utils/database');
const { v4: uuid } = require('uuid');

class PostSchema {
    constructor(data) {
        this.id = uuid();
        this.title = data.title;
        this.body = data.body;
        this.created_at = data.created_at;
        this.user = data.user;
    }
}

class Post {
    static model = 'posts.json';

    static all() {
        return database.getDataFromDatabase(this.model);
    }

    static find(id) {
        const records = database.getDataFromDatabase(this.model);
        return _.find(records, ['id', id]);
    }

    static create(payload) {
        const record = new PostSchema(payload);
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
        _.remove(records, (item) => { return item.id == id });
        database.setDataFromDatabase(this.model, records);
        return this.find(id);
    }
}

module.exports = Post;