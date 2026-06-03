//Loc theo trang thai
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href)
    // console.log(url.href)
    buttonStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const value = button.getAttribute("button-status")
            if(value){
                url.searchParams.set("status",value)
            }
            else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}
//End Loc theo trang thai