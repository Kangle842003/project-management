module.exports = (query) =>{
     let filterStatus = [
            {
                name:"Tat ca",
                class:"",
                status :""
            },
            {
                name:"Hoat Dong",
                class:"",
                status :"active"
            },
            {
                name:"Dung hoat dong",
                class:"",
                status :"inactive"
            }
            
        ]
        if(query.status){
            const index = filterStatus.findIndex(item=>item.status == query.status)
            filterStatus[index].class = "active"
        }
        else{
            const index = filterStatus.findIndex(item=>item.status == "")
            filterStatus[index].class = "active"
        }
    return filterStatus
}