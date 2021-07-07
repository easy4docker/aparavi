(function () { 
	var obj =  function (env) {
        const fs = require('fs'),
            me = this,
            MYSQL = require(env.root + '/vendor/mysql/node_modules/mysql');

        const cfg = {
            host: '10.10.10.254',
            port : '3306',
            user: 'appuser',
            password: 'password',
            multipleStatements: true
        };
        

        me.uploadData = (callback) => {
            const fn= env.dataFolder + '/annual-review.csv';
            let str = 'CREATE Database IF NOT EXISTS `appDB`; USE `appDB`;';
            str += 'DROP TABLE IF EXISTS `CSVImport`;';
            str += 'CREATE TABLE IF NOT EXISTS `CSVImport` ('
            str +=     '`id` INT NOT NULL';
            str +=     ')  ENGINE=INNODB; ';
            str +=     'ALTER TABLE `CSVImport` ADD  `name` VARCHAR(32) NOT NULL; ';
            str +=     'ALTER TABLE `CSVImport` ADD  `create_at` DATE NOT NULL; ';
            str +=     'ALTER TABLE `CSVImport` ADD  `review` INT NOT NULL; ';
            str +=     "LOAD DATA LOCAL INFILE '" + fn + "' INTO TABLE `CSVImport` FIELDS TERMINATED BY ";
            str +=     "',' LINES TERMINATED BY '\n' IGNORE 1 LINES";
            me.query(str, callback);
        };
        me.searchByName = (name, callback) => {
            let str =  'USE `appDB`; SELECT * FROM `CSVImport` ' + 
            ((name) ?  " WHERE `name` = '" + name + "'" : '') + ';'
            me.query(str, callback);
        };
        me.deleteById = (id, callback) => {
            let str = 'USE `appDB`; DELETE FROM `CSVImport` WHERE `id` = "' + id + '";';
            me.query(str, callback);
        };
		me.query = (sql, callback) => {
            const connection = MYSQL.createConnection(cfg);
            connection.query(sql, (error, results, fields) => {
                connection.end();
                callback((error) ? { status : 'fsilure', message: error.message } : { status : 'success', results: results});
            });
		};
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();