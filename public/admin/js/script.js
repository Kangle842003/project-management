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

// Tim kiem san pham
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}
// End tim kiem san pham