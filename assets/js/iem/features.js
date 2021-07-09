//TODO : Apply SOLID principles.

const featureList = document.querySelector('#featuresList');
const addFeatureForm = document.querySelector('#addFeatureForm');

const quad1 = document.querySelector('#quad1');
const quad2 = document.querySelector('#quad2');
const quad3 = document.querySelector('#quad3');
const quad4 = document.querySelector('#quad4');

//render feature from firestore to the iem.
function renderFeatures(doc) {
    let feature = document.createElement('div');
    let featureContent = document.createElement('span');
    //set feature attribures
    feature.setAttribute('data-id',doc.id);
    //make element draggable.
    feature.id = doc.id;
    feature.draggable = true;
    feature.setAttribute('ondragstart',"drag(event)");
    feature.classList.add('my-feature');

    //get quadrant id.
    var quadId = doc.data().quadId;

    //getting the content.
    featureContent.textContent = doc.data().content;

    //add feature content to feature div
    feature.appendChild(featureContent);

    //add the feature to the right quadrant.
    if (quadId==0) {
        featureList.appendChild(feature);
    } else if(quadId==1){
        quad1.appendChild(feature);
    }else if (quadId==2) {
        quad2.appendChild(feature);
    }else if (quadId==3) {
        quad3.appendChild(feature);
    }else if (quadId==4) {
        quad4.appendChild(feature);
    }
    
}

// add data to firestore.
addFeatureForm.addEventListener(
    'submit',(e)=>{
      e.preventDefault();
      db.collection('Feature').add({
          content: addFeatureForm.featureContent.value,
          quadId : 0
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
                //featureList.removeChild(li);
            }
        });
    }
);