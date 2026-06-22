// delete item product-category
const buttonDelete = document.querySelectorAll("[button-delete-item-product-category]")
if(buttonDelete.length > 0){

    buttonDelete.forEach(button=>{
    const form = document.querySelector("[delete-item-product-category]")
    button.addEventListener("click",()=>{
        const isCofirm = confirm("Ban co chac muon xoa danh muc san pham nay !")
        if(isCofirm){
            const id = button.getAttribute("data-id")
                const path = form.getAttribute("path")
                form.action= `${path}/${id}?_method=DELETE`
                form.submit()
        }
    })
})
}

// end delete item product-category