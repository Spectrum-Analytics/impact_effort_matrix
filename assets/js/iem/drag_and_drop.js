//import {getFeature} from 'features.js';

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var featureId = ev.dataTransfer.getData("text");
    console.log("feature id",featureId);
    console.log("quad id",getQuadIdNumber(ev.target.id));
    ev.target.appendChild(document.getElementById(featureId));

    db.collection("Feature").doc(featureId).update({
        quadId : getQuadIdNumber(ev.target.id)
    }).then(()=>{
        console.log("Quad updated successfully!");
    }).catch((error)=>{
        console.error("Error updating quad ", error);
    });
}

function getQuadIdNumber(quadId) {
    switch (quadId) {
        case "featuresList":
            return 0;
            
        case "quad1":
            return 1;
            
        case "quad2":
            return 2;
            
        case "quad3":
            return 3;
            
        case "quad4":
            return 4;
               
        default:
            return -1;
    }
}