const projectList = document.querySelector('#project-list');
const form = document.querySelector('#add-project-form');

// create element & render cafe
function renderProject(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let description = document.createElement('td');
    let status = document.createElement('td');
    let custom = document.createElement('td');
    let a = document.createElement('a');

    let iProfile = document.createElement('i');
    let aProfile = document.createElement('a');

    let iEdit = document.createElement('i');
    let aEdit = document.createElement('a');

    let iDelete = document.createElement('i');
    let aDelete = document.createElement('a');
   

    tr.setAttribute('data-id', doc.id);
    a.href = "iem.html";
    a.innerHTML = doc.data().name;
    description.innerHTML = doc.data().description;
    status.innerHTML = doc.data().status;

    aProfile.href = "project.html";
    aProfile.style.margin = "2px";
    aProfile.className = "btn btn-primary btn-xs";
    iProfile.className = "bi bi-person-plus-fill";

    aEdit.href = "project.html";
    aEdit.style.margin = "2px";
    aEdit.className = "btn btn-info btn-xs";
    iEdit.className = "bi bi-pencil-square";

    aDelete.href = "project.html";
    aDelete.style.margin = "2px";
    aDelete.className = "btn btn-danger btn-xs";
    iDelete.className = "bi bi-trash";

    aProfile.appendChild(iProfile);
    aEdit.appendChild(iEdit);
    aDelete.appendChild(iDelete);

    custom.appendChild(aProfile);
    custom.appendChild(aEdit);
    custom.appendChild(aDelete);

    name.appendChild(a);

    tr.appendChild(name);
    tr.appendChild(description);
    tr.appendChild(status);
    tr.appendChild(custom);

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
