let originalprice = (document.getElementsByClassName("original-price")[0].textContent.replace('$', ''));    
console.log(originalprice);

let currentpricelement = document.getElementsByClassName("current-price")[0];
console.log(currentpricelement);

let currentprice = currentpricelement.textContent;
console.log(currentprice);

let currentpricevalue = (currentprice.replace('$', ''));
console.log(currentpricevalue);

finalprice = parseInt(currentpricevalue) + 100;
console.log(finalprice);

let mrp = document.getElementsByClassName("original-price");
console.log(mrp);

let mrpvalue = mrp[0].textContent;
console.log(mrpvalue);

let mrpvalueOnly = (mrpvalue.replace('$', ''));
console.log(mrpvalueOnly);

let discount = mrpvalueOnly - (mrpvalueOnly * 100 / 100);
console.log(discount);

let Buttonelement = document.getElementsByClassName("add-to-cart-btn")[0];
 
Buttonelement.addEventListener('click', function() {
    let Button = Buttonelement.textContent;
    console.log(Button);
    Buttonelement.textContent = "Added!";
    Buttonelement.style.backgroundColor = "gray";
    setTimeout(() => {
        Buttonelement.textContent = "Add to Cart"; 
        Buttonelement.style.backgroundColor = ""; 
    }, 1500);

    alert("added to cart");
})

let newdiscount = document.getElementById("apply-discount");
newdiscount.addEventListener('click', function() {
    let discountinput = document.getElementById("discount").value;
    console.log(discountinput);
    let discountedprice = originalprice - (originalprice * discountinput / 100);
    console.log(discountedprice);
    currentpricelement.textContent = "$" + discountedprice.toFixed(2);
    let productCard = document.getElementsByClassName("product-card")[0];
    if (parseFloat(discountinput) >= 50) {
        productCard.style.backgroundColor = "lightyellow";
    } else {
        productCard.style.backgroundColor = "white";
    }
});

document.getElementById("qty").addEventListener("input", function() {
    let quantity = parseInt(this.value);
    let pricePerItem = parseFloat(originalprice);
    let totalPrice = quantity * pricePerItem;
    currentpricelement.textContent = "$" + totalPrice.toFixed(2);
});
