const addFeatureForm = document.querySelector('#addFeatureForm');

//adding features to firestore.
addFeatureForm.addEventListener(
  'submit',(e)=>{
    e.preventDefault();
    //console.log(addFeatureForm.addFeatureContent.value);

    db.collection("Features").add({
    
      content: addFeatureForm.addFeatureContent.value
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    addFeatureForm.AddFeatureContent.value = '';

  }
);
