var queryString = require('query-string');
var _ = require('lodash');
import Mock from 'mockjs';
var Xhr={
	get:function(params){
		if(params.params){
			params.url += '?' + queryString.stringify(params.params)
		};

		return fetch(params.url)
			.then( (response) => response.json() )
			.then( (responseJson) => Mock.mock(responseJson) )
	},
	post:function(params){
		return fetch(params.url,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params.params)
			})
			.then( (response) => response.json() )
			.then( (responseJson) => Mock.mock(responseJson) )
	}
};


module.exports = Xhr;