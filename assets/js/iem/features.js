

const featureList = document.querySelector('#featuresList'); // default list to place feautures
const addFeatureForm = document.querySelector('#add-feature-form');

//The matrix quadrants.
const quad1 = document.querySelector('#quad1');// high impact|low effort.
const quad2 = document.querySelector('#quad2');// high impact|high effort.
const quad3 = document.querySelector('#quad3');// low impact|low effort.
const quad4 = document.querySelector('#quad4');// high effort|low effort.

//render feature from firestore to the iem.
function renderFeatures(doc) {

    let feature = makeFeature(doc);
    let featureContent = document.createElement('span');
    
    //get quadrant id.
    let quadId = getFeature(doc).quadId;

    let cross = makeCross();

    let edit = makeUpdate();

    //getting the content.
    featureContent.textContent = getFeature(doc).featureContent;

    // feature.textContent = doc.data().content;

    pushFeatureToQuads(quadId,feature);
    //add feature content to feature div
    feature.appendChild(featureContent);

    feature.appendChild(edit);
    //add cross to feature div

    feature.appendChild(cross);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Feature').doc(id).delete();
    });

    edit.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        var newData = document.getElementById(id).childNodes[0].textContent;
        db.collection('Feature').doc(id).update({content: newData});
    });
}

function getFeature(doc) {
    // get the feature content and quadId from firestore.
    let featureContent = doc.data().content,
        quadId = doc.data().quadId;

    // return content and quadId.
    return {featureContent, quadId};
}

function setFeatureAttributes(feature,doc) {
    feature.id = doc.id;
    feature.classList.add('my-feature');
    feature.contentEditable = "true";
    feature.setAttribute('data-id',doc.id);
}

function makeFeatureDraggable(feature) {
    //make feature element draggable
    feature.draggable = true;
    feature.setAttribute('ondragstart',"drag(event)");
}

function pushFeatureToQuads(quadId,feature) {
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

function makeFeature(doc) {
    //create a feature element that will be rendered on the browser.
    let feature = document.createElement('div');
    //set feature attribures
    setFeatureAttributes(feature,doc);

    //make element draggable.
    makeFeatureDraggable(feature);

    return feature;
}

function makeCross(){
    let cross = document.createElement('div');
    cross.contentEditable = "false";
    cross.textContent = 'x';

    return cross;
}

function makeUpdate(){
    let edit = document.createElement('i');
    edit.className = "bi bi-pencil-square";
    edit.contentEditable = "false";

    return edit;
}

// add data to firestore.
addFeatureForm.addEventListener(
    'submit',(e)=>{
      e.preventDefault();
      db.collection('Feature').add({
          content: addFeatureForm.content.value,
          quadId : 0
      }); 
      addFeatureForm.content.value = '';
    }
);

// real-time listener
db.collection('Feature').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderFeatures(change.doc);
        } else if (change.type == 'removed'){
            let feature = featuresList.querySelector('[data-id=' + change.doc.id + ']');
            featuresList.removeChild(feature);
            // let quadOne = quad1.querySelector('[data-id=' + change.doc.id + ']');
            // quad1.removeChild(quadOne);
            // let quadTwo = quad2.querySelector('[data-id=' + change.doc.id + ']');
            // quad2.removeChild(quadTwo);
            // let quadThree = quad3.querySelector('[data-id=' + change.doc.id + ']');
            // quad3.removeChild(quadThree);
            // let quadFour = quad4.querySelector('[data-id=' + change.doc.id + ']');
            // quad4.removeChild(quadFour);
        }
    });
});