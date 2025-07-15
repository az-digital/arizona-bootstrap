var toggleHideInaccessibleBox = document.getElementById("hide-inaccessible");
var inaccessibleElems = document.getElementsByClassName("inaccessible");

if(toggleHideInaccessibleBox !== null) {
  toggleHideInaccessibleBox.addEventListener("change", (event) => {
    for(i = 0; i < inaccessibleElems.length; i++) {
      if(toggleHideInaccessibleBox.checked) {
        inaccessibleElems[i].style.display = "none";
      }
      else {
        inaccessibleElems[i].style.display = "block";
      }
    }
  });
}