function addFeature() {
    let dragId = 17;
    var inputText = document.getElementById("add-feature-content").value;

    document.getElementById("features").innerHTML += "<div class='my-feature' id='drag'"+dragId+" draggable='true' ondragstart='drag(event)'>"+inputText+"</div>";

    document.getElementById("add-feature-content").value="";
    
    dragId++;
}