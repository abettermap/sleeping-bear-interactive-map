// (function() {

//     'use strict';

//     function getBasePath(){

//     	var pref = '',
//     		suff = '',
//     		path = '';

//     	if (window.host === 'friendsofsleepingbear.org'){
//     		path = window.location.origin + '/wp-content/plugins/wp-fosb-map/src/app/';
//     	} else {
//     		path = window.location.origin + '/fosb/wp-content/plugins/wp-fosb-map/src/app/';
//     		console.log('basepath = ' + path);
//     	}

//     	return path;

//     }

//     angular
//         .module('basePathModule')
//         .constant('basePath',{
//         	url: getBasePath()
//         });

// })();

