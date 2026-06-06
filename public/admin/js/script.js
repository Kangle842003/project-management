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

//Pagination
const buttonPage= document.querySelectorAll("[button-page]")
if(buttonPage.length > 0){
    let url = new URL(window.location.href)
    buttonPage.forEach(button=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-page")
            url.searchParams.set("page",page)
            window.location.href = url.href
        })
       
    })
}
//End Pagination

//change-multi
    // check-box
    const formMulti = document.querySelector("[form-multi]")
    if(formMulti){
        const checkBoxAll = formMulti.querySelector("[check-box-all]")
        const checkBoxItem = formMulti.querySelectorAll("[check-box-item]")
        
        checkBoxAll.addEventListener("click",()=>{
            const checkedAll = checkBoxAll.checked
                if(checkedAll){
                    checkBoxItem.forEach(input=>{
                        input.checked = true
                    })
                }
                else{
                    checkBoxItem.forEach(input=>{
                        input.checked = false
                    })
                }
                })
        if(checkBoxItem.length > 0){
            checkBoxItem.forEach(input=>{
                input.addEventListener("click",()=>{
                    const countChecked = document.querySelectorAll("[check-box-item]:checked").length
                    // console.log(countChecked)
                    if(countChecked == checkBoxItem.length){
                        checkBoxAll.checked = true
                    }
                    else{
                        checkBoxAll.checked = false
                    }
                })
            })
        }
}
    // input-list-id
    const formChangeMulti = document.querySelector("#form-change-multi")
    if(formChangeMulti){
        
        const inputIds = formChangeMulti.querySelector("[input-ids]")
        formChangeMulti.addEventListener("submit",(e)=>{
            e.preventDefault()

            const type = formChangeMulti.querySelector("select").value
            if(type == ""){
                alert("Vui lòng chọn hành động")
                return
            }
            let isConfirm = false
            if(type == "deleteAll"){
                isConfirm = confirm("Ban co chac chan muon xoa nhung san pham da chon")
                if(!isConfirm){
                    return
                }
            }
            let ids =[]
            const checkedItems  = document.querySelectorAll("[check-box-item]:checked")
            if(checkedItems.length>0){
                checkedItems.forEach(input=>{
                    ids.push(input.value) 
                })
                inputIds.value = ids.join(",")
                formChangeMulti.submit()
            }
            else{
                alert("Vui long chon 1 san pham")
            }
          
        })
    }
// end change-multi