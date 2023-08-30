// Assigning a var to add to cart buttons
let carts = document.getElementsByClassName('addBasketBtn');

// Populating an array consisting of site products
let products = [
    {
        productName: 'Nike Panda Dunks Low',
        tag: 'pandadunk',
        price: 120,
        inCart: 0
    },
    {
        productName: 'Yeezy Boost 350 V2 Slate',
        tag: 'yeezyboost',
        price: 230,
        inCart: 0
    },
    {
        productName: 'Jordan 1 High-OG Across The Spider-Verse',
        tag: 'jordan1',
        price: 240,
        inCart: 0
    },
    {
        productName: 'New Balance 2002R Protection Pack Rain Cloud',
        tag: 'newbalance',
        price: 200,
        inCart: 0
    },
    {
        productName: 'Nike Sb Dunk Low Premium White',
        tag: 'nikesb',
        price: 125,
        inCart: 0
    }
];

// Looping through all of the cart buttons, if one is clicked a function to update the number of items in cart is called
// As well as a function that calulates to the total of all the items within the cart
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// Function that runs in the background of the page to prevent the cart number count reseting back to 0 once the page is refreshed
function onLoadCartNumbers () {

    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.navItem3 span').textContent = productNumbers;
    }
}

// cartNumbers function calculates the number of items within the shopping basket
// if loop checks to see if there are existing products in baskets, if there isn't it assigns the count to 1
// if there are items within the cart then the count is just increased by 1
// this function also calls setItems which identifies which item has been added to the cart
function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
 
    productNumbers = parseInt(productNumbers);
    document.querySelector('.navItem3 span').textContent = productNumbers + 1;

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.navItem3 span').textContent = 1;
    }

    setItems(product);
}

// function identifies which items have been added to cart and how many of that item exist within the cart
// if the item is not already in the basket it assigns it count to 1 and updates cart items to the add product tag which is then set on local sotrage
// if the item is already in the basket then it's incart tag increases by one
// if another new item is then added the if(cartItems[product.tag] === undefined) loop is triggered which stores the new item on local storage without overwriting the previous item
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if(cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
        [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

// function that calculates the total cost of the items within the basket
// if the cart is empty the else loop triggers and the assigns the cartCost to the price of the item clicked
// if there is an existing item in the cart the if loop triggers and adds the price of the item clicked to the existing cartCost
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function checkoutAlert () {
    alert("End of application");
}

// this function takes all the stored data in local storage and displays it on the basket page
// it identify items within the cart using local storage from set items and assigns a product container
// if both of these variables are found the the inner HTML is updates to display the product name, price, quantity and total cost
// Lastly all the basket items cost are total taking the local storage from totalCost function and displayed with a checkout button
// function is also ran in the background to prevent refresh
function displayCart () {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".basketProducts");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="inBasketContent">
                <div class="inBasketProduct">
                    <span>${item.productName}</span>
                </div>
                <div class="inBasketPrice">
                    <span>£${item.price}.00</span>
                </div>
                <div class="inBasketQuantity">
                    <span>${item.inCart}</span>
                </div>
                <div class"inBasketTotal">
                    <span>£${item.inCart * item.price}.00</span>
                </div>
            </div>
          `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    £${cartCost}.00
                </h4>
                <a href="end-page.html"><button class="checkout">Checkout</button></a>
        `;

    }
    

}

onLoadCartNumbers();
displayCart();