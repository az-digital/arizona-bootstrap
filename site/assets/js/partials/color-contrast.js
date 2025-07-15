var toggleAccessibleBoxElem = document.getElementById("hide-inaccessible");
var inaccessibleElems = document.getElementsByClassName("inaccessible");

if(toggleAccessibleBoxElem !== null) {
  toggleAccessibleBoxElem.addEventListener("change", (event) => {
    for(i = 0; i < inaccessibleElems.length; i++) {
      if(toggleAccessibleBoxElem.checked) {
        inaccessibleElems[i].style.display = "none";
      }
      else {
        inaccessibleElems[i].style.display = "block";
      }
    }
  });
}