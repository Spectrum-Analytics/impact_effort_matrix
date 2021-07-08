const projectList = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');

// create element & render cafe
function renderProject(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let description = document.createElement('td');
    let status = document.createElement('td');
    let a = document.createElement('a');

    tr.setAttribute('data-id', doc.id);
    a.href = "iem.html";
    a.innerHTML = doc.data().name;
    description.innerHTML = doc.data().description;
    status.innerHTML = doc.data().status;
    
    name.appendChild(a);
    tr.appendChild(name);
    tr.appendChild(description);
    tr.appendChild(status);

    projectList.appendChild(tr);

    // deleting data
    // cross.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('Project').doc(id).delete();
    // });
}

//getting data
// db.collection('Project').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderProject(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Project').add({
        name: form.name.value,
        description: form.description.value,
        status: "active"
    });
    form.name.value = '';
    form.description.value = '';
});

// real-time listener
db.collection('Project').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderProject(change.doc);
        } else if (change.type == 'removed'){
            let li = projectList.querySelector('[data-id=' + change.doc.id + ']');
            projectList.removeChild(li);
        }
    });
});
