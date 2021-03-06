var loadingOverlayId = "mGridRandomLoadingOverlay";

function createDummyNavItem(text, clickHandler){
  let dummyNavItem = document.createElement("li");

  let dummyLinkElement = document.createElement("a");
  dummyLinkElement.href = "#";
  dummyLinkElement.title = "Random";
  dummyLinkElement.onclick = clickHandler;

  let textNode = document.createTextNode(text);
  dummyLinkElement.appendChild(textNode);

  dummyNavItem.appendChild(dummyLinkElement);

  return dummyNavItem;
}

function showLoadingOverlay(){
  if (!getCurrentLoadingOverlay()){
      let div = document.createElement("div");
      div.id = loadingOverlayId;

      let textElement = document.createElement("H1");
      let textNode = document.createTextNode ('sec...');
      textElement.appendChild(textNode);
      div.appendChild(textElement);

      document.body.appendChild(div);
  } else {
      handleUnexpectedError("tried to show a loading overlay -- there's already one present, however");
  }
}

function removeLoadingOverlay(){
  let current = getCurrentLoadingOverlay();
  if(current) { current.remove() } else {
      handleUnexpectedError("tried to remove loading overlay but it wasn't there. this can probably be ignored")
  }
}

function getCurrentLoadingOverlay(){ return document.getElementById(loadingOverlayId); }