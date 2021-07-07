(function () { 
	var obj =  function (env) {
        const fs = require('fs'),
            me = this;

        delete require.cache[env.appFolder + '/cloudApp/modules/sql.js'];
        const SQL = require(env.appFolder + '/cloudApp/modules/sql.js');
        const sql = new SQL(env);

        me.run = (incomeData, callback) => {
            switch (incomeData.command) {
                case 'uploadData' : 
                    const fn= env.dataFolder + '/annual-enterprise-survey-2020-financial-year-provisional-csv.csv';
                    fs.readFile(fn, 'utf-8', (err, data)=>{

                        sql.uploadData((queryResult)=>{
                            callback(queryResult);
                        });
                    })
                    break;

                case 'searchByName' : 
                    sql.searchByName(incomeData.name, (queryResult)=>{
                        callback(queryResult);
                    });
                    break;
                    
                case 'deleteById' : 
   
                    sql.deleteById(incomeData.name, (queryResult)=>{
                        callback(queryResult);
                    });
                    break;

                default: 
                    callback({
                        status : 'failure'
                    });
            }
            return true;
        }
	};
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
})();