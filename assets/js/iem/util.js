/*
This document holds utility functions
*/
 
const projectDetails= document.querySelector('#project-details');

function DisplayProjectName(projectName){
  let name = document.createElement('span');

  name.textContent= projectName;

  projectDetails.prepend(name);

}

function getSelectedProjectName(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }

//project name
var query = window.location.search.substring(1);
var qs = getSelectedProjectName(query);
console.log(qs);

DisplayProjectName(qs.name); 
