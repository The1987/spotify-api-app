import orm from '../config/orm.js'

var store = {
    all: function(table, cb) {
        orm.all(table, function(res) {
            cb(res);
        });
    },
    create: function(table, cols, vals, cb) {
        orm.create(table, cols, vals, function(res) {
            cb(res);
            return res;
        });
    },
    update: function(table, objColVals, condition, cb) {
        orm.update(table, objColVals, condition, function(res) {
            cb(res);
        });
    },
    delete: function(table, condition, cb) {
        orm.delete(table, condition, function(res) {
            cb(res);
        });
    },
    selectWhere: function(table, condition, col, cb){
        orm.selectWhere(table, condition, col, function(res){
            cb(res);
        });
    },
    getRow: function(table, condition, cb){
        orm.getRow(table, condition, function(res){
            cb(res);
        });
    },
    getRowElement: function(table, condition, cb){
        orm.getRowElement(table, condition, function(res){
            cb(res);
        });
    }
};

export default store;