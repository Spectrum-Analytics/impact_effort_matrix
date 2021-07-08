const featureList = document.querySelector('#featuresList');
const addFeatureForm = document.querySelector('#addFeatureForm');

function renderFeatures(doc) {
    let feature = document.createElement('div');
    let featureContent = document.createElement('span');

    feature.setAttribute('data-id',doc.id);
    //make element draggable.
    feature.id = doc.id;
    feature.draggable = true;
    feature.setAttribute('ondragstart',"drag(event)")
    featureContent.textContent = doc.data().content;

    feature.classList.add('my-feature');

    feature.appendChild(featureContent);
    featureList.appendChild(feature);
}

// add data to firestore.
addFeatureForm.addEventListener(
    'submit',(e)=>{
      e.preventDefault();
      db.collection('Feature').add({
          name: addFeatureForm.featureContent.value
      }); 
      addFeatureForm.featureContent.value = '';
    }
);

// real time listener.
db.collection('Feature').onSnapshot(
    snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            console.log(change.doc.data());
            if (change.type=='added') {
                renderFeatures(change.doc);
            }else if (change.type == 'removed') {
                let li = featureList.querySelector('data-id='+ change.doc.id +']');
                featureList.removeChild(li);
            }
        });
    }
);