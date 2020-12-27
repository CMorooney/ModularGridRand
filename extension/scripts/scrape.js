function getNavUL(){
    let allNavs = document.querySelectorAll(".nav");
    if(allNavs.length < 2) {
        handleUnexpectedError("couldn't find the right ul to inject random button into");
        return null
    }

    return allNavs[1];//expecting it to be the second one found on the page
}

function getRandomModuleLinkFromPage(page){
    let linkCells = page.querySelectorAll('.table-striped td:last-child a');
    if (linkCells.length <= 0){
      handleUnexpectedError("couldn't query links in order to pick a random module from a page")
      return
    }

    let randomCellIndex = Math.floor(Math.random() * linkCells.length) - 1;//-1 for array indexing
    let randomCell = linkCells[randomCellIndex];
    let moduleLink = randomCell.href;

    return moduleLink;
}

function getTotalPageNumber(page){
    let lastPageAnchor = page.querySelector("[rel=last]");

    if (lastPageAnchor === null) {
      handleUnexpectedError("couldn't find last page anchor when finding total pages");
      return;
    }

    let lastPageLink = lastPageAnchor.href
    if (lastPageLink === null) {
      handleUnexpectedError("couldn't read link from lastPageAnchor when finding total pages");
      return;
    }

    //key/value pairs in ModularGrid have their own path spot and are devaluated by ':'
    //try and find the value for the key "page" on the link to the LAST page to get total page count
    let urlSplitByPath = lastPageLink.split('/');
    for(i = 0; i < urlSplitByPath.length; i++) {
      let path = urlSplitByPath[i];

      if(path.includes(":")){
        var keyValuePair = path.split(":");
        if(keyValuePair[0] == "page"){
          let finalPageCount = Number(keyValuePair[1]);
          if (isNaN(finalPageCount)) { break; }
          return finalPageCount
        }
      }
    }

    return -1;//if none found
}