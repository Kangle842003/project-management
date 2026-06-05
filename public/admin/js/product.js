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