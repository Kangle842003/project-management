module.exports  = (query,objectPagination) =>{
    if(query.page){
        const page = parseInt(query.page)
        objectPagination.currentPage = page
        objectPagination.skipItem = (objectPagination.currentPage-1)*objectPagination.limitItem
    }
    return objectPagination
}