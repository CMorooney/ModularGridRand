var allModulesDocumentLocation = "/e/modules";

//ostensibly this will be called when this script is embedded
//which should be after document is ready to go
initialize();

function initialize() {
    var navUL = getNavUL();

    if(navUL){
      navUL.appendChild(createDummyNavItem("Random", rollTheDie));
    } else {
      handleUnexpectedError("couldn't find the navigation UL to inject our button into :(");
    }
}

function rollTheDie() {
  showLoadingOverlay();

  //we are requesting the root "all" modules page in order
  //to be able to read how many 'pages' of modules there are,
  //which will allow us to generate a random page, then load
  //page and pick a random module from it.
  requestDocument(allModulesDocumentLocation,
                  handleAllModulesPageReturned,
                  handleAllModulesPageRequestError);
}

function handleAllModulesPageReturned(page){
  let totalPages = getTotalPageNumber(page);
  if(totalPages == -1){
    handleUnexpectedError("getTotalPageNumber returned -1, cannot generate a random page");
    return;
  } 

  let randomPageNumber =  Math.floor(Math.random() * totalPages);
  let documentUrl = `/e/modules/index/page:${randomPageNumber}`;
  requestDocument(documentUrl,
                  handleRandomPageReturned,
                  function(s, c) { handleRandomPageRequestError(documentUrl, s, c) });
}

function handleRandomPageReturned(page){
  let moduleDestination = getRandomModuleLinkFromPage(page);
  if(moduleDestination){
    window.location.href = moduleDestination;
  } else {
    handleUnexpectedError(`couldn't navigate to module destination: ${moduleDestination}`);
  }
}

function handleAllModulesPageRequestError(status, content){
  removeLoadingOverlay();

  handleUnexpectedError(
    `error requesting document from ${allModulesDocumentLocation}
    \n${status}\n${content}`
  );
}

function handleRandomPageRequestError(url, status, content){
  removeLoadingOverlay();

  handleUnexpectedError(
    `error requesting random page from ${url}
    \n${status}\n${content}`
  );
}

function handleUnexpectedError(description) {
  //TODO something real, log GH issue?
  console.log("*** mgrid random error //:: \n" + description)
}