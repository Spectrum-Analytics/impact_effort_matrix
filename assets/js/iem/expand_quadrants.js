const quadHeading = document.querySelectorAll('.quad-heading');

quadHeading.forEach(heading => {
    var quadrant = heading.parentNode;
    heading.addEventListener('click',(e)=>{
        if(quadrant.classList.contains("quadrant")){
            quadrant.classList.remove("quadrant");
            quadrant.classList.add("quad-fullscreen");
        }else if(quadrant.classList.contains("quad-fullscreen")){
            quadrant.classList.remove("quad-fullscreen");
            quadrant.classList.add("quadrant");
        }
    });
});