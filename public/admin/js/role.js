// delete item role
const buttonDeleteItemRole = document.querySelectorAll("[button-delete-item-role]")
if(buttonDeleteItemRole.length>0){
    const formDeleteItemRole = document.querySelector("#form-delete-item-role")
    buttonDeleteItemRole.forEach(button=>{
    button.addEventListener("click",()=>{
         const isCofirm = confirm("Ban co chac muon xoa san pham nay !")
        if(isCofirm){
            const id = button.getAttribute("value")
            const path = formDeleteItemRole.getAttribute("path")
            formDeleteItemRole.action = `${path}/${id}/?_method=DELETE`
            // console.log(formDeleteItemRole.action)
            formDeleteItemRole.submit()
        }
    })
})
}
// end delete item role