let featureList = ["Create Organisation", "Add Employees"];
function addFeature(){
  var inputValue = document.getElementById("AddFeatureContent").value;
  if (inputValue === "") {
    alert("You must write something!!!");
  }
  else {
    featureList.push(inputValue);
    document.getElementById("AddFeatureContent").value = "";
  }       

}

function newFeature() {
    var num = 5;
    var inputValue = document.getElementById("AddFeatureContent").value;
    var feature = document.createElement("DIV");
    feature.id = "drag"+num;
    feature.draggable = "true";
    feature.innerHTML = inputValue;
    feature.style.overflow = "auto";
    feature.style.height = "40px";
    feature.style.width = "270px";
    feature.style.background = "rgb(1, 3, 81)";
    feature.style.color = "white";
    feature.style.textAlign = "center";
    feature.style.borderRadius = "10px";
    feature.style.margin = "5px";
    feature.style.padding = "5px";
    if (inputValue === "") {
      alert("You must write something!!!");
    }
    else {
      featureList.push(inputValue);
      document.getElementById("features-body").appendChild(feature);
      document.getElementById("AddFeatureContent").value = "";
      num++;
    }         
  }

  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });
});