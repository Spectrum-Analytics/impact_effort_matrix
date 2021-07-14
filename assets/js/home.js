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


    let aProfile = makeProfileIcon();
    let aEdit = makeEditIcon();
    let aDelete = makeDeleteIcon();
   

    tr.setAttribute('data-id', doc.id);
    a.href = "iem.html?name="+ doc.data().name; 
    a.innerHTML = doc.data().name;
    description.innerHTML = doc.data().description;
    status.innerHTML = doc.data().status;

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
    // tr.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('Project').doc(id).delete();
    // });
}

function makeProfileIcon(){
    let iProfile = document.createElement('i');
    let aProfile = document.createElement('a');

    aProfile.href = "project.html";
    aProfile.style.margin = "2px";
    aProfile.className = "btn btn-primary btn-xs";
    iProfile.className = "bi bi-person-plus-fill";

    aProfile.appendChild(iProfile);

    return aProfile;
}

function makeEditIcon(){
    let iEdit = document.createElement('i');
    let aEdit = document.createElement('a');

    aEdit.href = "project.html";
    aEdit.style.margin = "2px";
    aEdit.className = "btn btn-info btn-xs";
    iEdit.className = "bi bi-pencil-square";
   
    aEdit.appendChild(iEdit);

    return aEdit;

}

function makeDeleteIcon(){
    let iDelete = document.createElement('i');
    let aDelete = document.createElement('a');

    aDelete.style.margin = "2px";
    aDelete.className = "btn btn-danger btn-xs";
    iDelete.className = "bi bi-trash";

    aDelete.appendChild(iDelete);

    return aDelete;

}
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
            let project = projectList.querySelector('[data-id=' + change.doc.id + ']');
            projectList.removeChild(project);
        }
    });
});
