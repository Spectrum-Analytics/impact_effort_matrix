/* /* /*
This document holds utility functions
*/
 
 const projectList = document.querySelector('#project-details');

//create element and render cafe
 function renderCafe(doc){
  let li = document.createElement('li');
  let description = document.createElement('span');
  let name = document.createElement('span');
  let status = document.createElement('div');


  li.setAttribute('data-id', doc.id);
  description.textContent= doc.data().description;
  name.textContent= doc.data().name;
  status.textContent= doc.data().status;
 
  //li.appendChild(description);
  li.appendChild(name);
  //li.appendChild(status);

  projectList.appendChild(li);

}
function parse_query_string(query) {
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
var qs = parse_query_string(query);
console.log(qs);

//getting data
  db.collection('Project').where('name', '==', qs.name).get().then((snapshot) =>{
snapshot.docs.forEach(doc => {
   renderCafe(doc);
   })
});  

//saving data
/* form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('Project').add({
       // description: form.description.value,
        name: form.name.value,
        //status: form.status.value

    });
   // form.description.value='';
    form.name.value='';
    //form.status.value='';

});
 */
                         //rel-time listener
/* db.collection('Project').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            renderCafe(change.doc);
        }
        else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id' + change.doc.id + ']');
            cafeList.removeChild(li);
        }

    })
})  */

