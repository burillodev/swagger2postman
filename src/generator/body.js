'use strict'

const _ = require('lodash');

module.exports = function() {
  
  return function get(postmanRequest,withoutRequired,withWrongParam){
  	postmanRequest = _.cloneDeep(postmanRequest);
    if (!postmanRequest.aux.body){
  		return postmanRequest;
    }

    let parent;
    if (withoutRequired){
      parent = 'without';
    } else if (withWrongParam){
      parent = 'with';
    } 

    let pathName = _.replace(postmanRequest.request.url.raw,'{{host}}{{port}}{{basePath}}/','')

    global.prefix =  _.toLower(pathName.split('/')[0]+'_'+postmanRequest.request.method+'_')
    global.wrongParamsCatch = withWrongParam;
    global.requiredParamsCatch = withoutRequired;

  	postmanRequest.request.body = {
		mode: "raw",
		raw: JSON.stringify(require('../swagger2json/index.js')(postmanRequest.aux.body,'',parent))
	};
  	return postmanRequest;
  };

}()