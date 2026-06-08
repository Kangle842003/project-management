module.exports = (query) =>{
     let filterStatus = [
            {
                name:"TẤT CẢ",
                class:"",
                status :""
            },
            {
                name:"HOẠT ĐỘNG",
                class:"",
                status :"active"
            },
            {
                name:"DỪNG HOẠT ĐỘNG",
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