module.exports.priceNewProduct =  (item) =>{
    item.priceNew = Math.floor(
        item.price * (100 - item.discountPercentage) / 100
    );
    return item.priceNew
}