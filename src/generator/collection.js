'use strict'

const fs   = require('fs');
const argv = require('yargs').argv

module.exports = function() {
  
  return function post(title,endpointsPostman){
	if (! argv.target ){
		argv.target = process.cwd()+'/'
	}

	const output = {
		"info": {
			"_postman_id": "8680b1d9-579c-43d2-8035-991b269c31e0",
			"name": title,
			"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
		},
		"item": endpointsPostman
	}

	try {
	  	fs.writeFileSync(argv.target+'/'+title+'.postman_collection.json', JSON.stringify(output));
	} catch(err) {
		require('../utils/error.js')('Error writing the output');
	}
  };

}()