//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){
    const form = document.querySelector("#form-change-status")
    const path = form.getAttribute("data-path")

    // console.log(path)
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-change-status")
            const statusChange = (status == "active" ? "inactive" : "active")
            const id = button.getAttribute("data-id")
            form.action = `${path}/${statusChange}/${id}?_method=PATCH`
            form.submit()
        })
    })
    
}
//End change-status

// Delete 1 item
const buttonDeleteItem = document.querySelectorAll("[ button-delete-item]")
if(buttonDeleteItem.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item-product")
    buttonDeleteItem.forEach(button=>{
        button.addEventListener("click",()=>{
            const isCofirm = confirm("Ban co chac muon xoa san pham nay !")
            if(isCofirm){
                const path = formDeleteItem.getAttribute("path")
                const id = button.getAttribute("data-id")
                // console.log(id)
                formDeleteItem.action = `${path}/${id}?_method=DELETE`
                formDeleteItem.submit()
            }
        })
    })
}
// End delete 1 item
