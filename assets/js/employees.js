const employeesList = document.querySelector('#employees-list');
const addEmployeesForm = document.querySelector('#add-employee-form');
function renderemployees(doc) {
    let li = document.createElement('li');
    let employeeName = document.createElement('span');
    let deleteEmployee = document.createElement('button');
    let profile = document.createElement('button');
    let buttons = document.createElement('div');

    //li.setAttribute('data-id',doc.id);
    li.id = doc.id;
    li.classList.add('employee');
    employeeName.textContent = doc.data().name;
    //deleteEmployee.textContent = 'x';
    //deleteEmployee.id = "cross";
    deleteEmployee.classList.add("bi", "bi-trash");

    profile.classList.add("bi", "bi-person-lines-fill");
    buttons.classList.add("buttons");
    buttons.appendChild(profile);
    buttons.appendChild(deleteEmployee);
    li.appendChild(employeeName);
    //li.appendChild(deleteEmployee);
    li.appendChild(buttons);

    employeesList.appendChild(li);

    //deleting data from firestore.
    deleteEmployee.addEventListener('click',(e)=>{
        e.stopPropagation();
        let employeeId = e.target.parentElement;
        let id = employeeId.parentElement.id;
        db.collection('User').doc(id).delete();
    });

    profile.addEventListener('click',(e)=>{
        e.stopPropagation();
        //let employeeId = e.target.parentElement;
        //let id = employeeId.parentElement.id;
        //db.collection('User').doc(id).delete();
        location.href = "viewUserProfile.html";
    });
}

// add data to firestore.
addEmployeesForm.addEventListener(
    'submit',(e)=>{
      e.preventDefault();
      db.collection('User').add({
          name: addEmployeesForm.name.value,
          email: addEmployeesForm.email.value
      }); 
      addEmployeesForm.name.value = '';
      addEmployeesForm.email.value = '';
    }
);

// real time listener.
db.collection('User').onSnapshot(
    snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type=='added') {
                renderemployees(change.doc);
            }else if (change.type == 'removed') {
                let li = employeesList.querySelector('#'+ change.doc.id);
                employeesList.removeChild(li);
            }
        });
    }
);