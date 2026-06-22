

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

//Permissions
const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]")
    const rows = tablePermissions.querySelectorAll("[data-name]")
    
    buttonSubmit.addEventListener("click",()=>{
        let permission = []
        rows.forEach(row=>{
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")
            if(name =="id"){
                inputs.forEach(input=>{
                    permission.push({
                    id : input.value,
                    permissions:[]
                })
                })
            }
            else{
                inputs.forEach((input,index)=>{
                    if(input.checked){
                        permission[index].permissions.push(name)
                    }
                })
            }
        })
        console.log(permission)
        if(permission.length>0){
        const formChangePermission = document.querySelector("#form-change-permission")
        const inputPermission = formChangePermission.querySelector("input[name='permissions']")
        inputPermission.value =  JSON.stringify(permission)
        formChangePermission.submit()
    }
    })
    
}
//End Permissions

// Permissions data default
    const dataPermissions = document.querySelector("[data-permissions]")
    if(dataPermissions){
        const datas = JSON.parse(dataPermissions.getAttribute("data-permissions"))
        const tablePermissions = document.querySelector("[table-permissions]")
        
        datas.forEach((data,index)=>{
            const permissions = data.permissions

            permissions.forEach(permission=>{
                const row = tablePermissions.querySelector(`[data-name="${permission}"]`)
                const input = row.querySelectorAll("input")[index];

                input.checked = true
            })
        })
    }
// End Permission data default
