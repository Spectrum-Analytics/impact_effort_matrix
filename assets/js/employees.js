const employeesList = document.querySelector('#employees-list');
const addEmployeesForm = document.querySelector('#add-employee-form');
function renderemployees(doc) {
    let li = document.createElement('li');
    let employeeName = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    li.classList.add('employee');
    employeeName.textContent = doc.data().name;
    //cross.textContent = 'x';
    cross.id = "cross";
    cross.classList.add("bi", "bi-three-dots-vertical");

    li.appendChild(employeeName);
    li.appendChild(cross);

    employeesList.appendChild(li);

    //deleting data from firestore.
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('User').doc(id).delete();
    });
}

// add data to firestore.
addEmployeesForm.addEventListener(
    'submit',(e)=>{
      e.preventDefault();
      db.collection('User').add({
          name: addEmployeesForm.name.value,
          city: addEmployeesForm.city.value
      }); 
      addEmployeesForm.name.value = '';
    }
);

// real time listener.
db.collection('User').onSnapshot(
    snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            console.log(change.doc.data());
            if (change.type=='added') {
                renderemployees(change.doc);
            }else if (change.type == 'removed') {
                let li = employeesList.querySelector('data-id='+ change.doc.id +']');
                employeesList.removeChild(li);
            }
        });
    }
);