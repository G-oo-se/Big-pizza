
class Pizza {
    constructor(image, name, dough, diameter, priceS, priceM, priceL, meat, vegan, bbq, hot, calcone){
        this.image = image
        this.name = name
        this.dough = dough
        this.diameter = diameter
        this.priceS = priceS
        this.priceM = priceM
        this.priceL = priceL
        this.meat = meat
        this.vegan = vegan
        this.bbq = bbq
        this.hot = hot
        this.calcone = calcone
        this.currentPrice = priceS
    }
    display(){
        return `<div class="pizza__card">
        <img src="${this.image}" alt="" class="pizza__cards__img">
        <h3 class="pizza__cards__name">${this.name}</h3>
        <div class="pizza__cards__sort">
            <div class="pizza__cards__sort__type">
                <h2 id="thin" class="dough__item">тонкое</h2>
                <h2 id="regular" class="dough__item">традиционное</h2>
                <div class="dough__block"></div>
            </div>
            <div class="pizza__cards__sort__len">
                <h2 id="small" class="diameter__item">26 см.</h2>
                <h2 id="medium" class="diameter__item">30 см.</h2>
                <h2 id="large" class="diameter__item">40см.</h2>
                <div class="diameter__block"></div>
            </div>
        </div>
        <div class="cost">
            <h3 class="cost__text">${this.currentPrice} ₽</h3>
            <div class="cost__buttonToCart">
                <img src="/assets/images/cost-toCart.png" alt="" class="cost__img">
                <h3 class="cost__toCart">Добавить</h3>
            </div>
        </div>
    </div>`
    }
}
let cart__item = 0
let cartAmount = document.querySelector('.cart__amount')

let menuItems = document.querySelector('.pizza__cards')
console.log(menuItems)

let menu = [
    new Pizza('/assets/images/chizburger-pizza.png', 'Чизбургер-пицца', 'тонкое', 's', 395, 500, 700, true, false, true, false, false),
    new Pizza('/assets/images/cheese-pizza.png', 'Сырная', 'тонкое', 's', 370, 500, 700, false, true, false, false, false),
    new Pizza('/assets/images/crevetka-pizza.png', 'Креветки по-азиатски', 'тонкое', 's', 290, 500, 700, true, false, true, true, false),
    new Pizza('/assets/images/cheesechicken-pizza.png', 'Сырный цыпленок', 'тонкое', 's', 385, 500, 700, true, false, false, false, false),
    new Pizza('/assets/images/gribi.png', 'Овощи и грибы', 'тонкое', 's', 300, 500, 700, false, true, false, false, false),
    new Pizza('/assets/images/pepperoni.png', 'Пеперонни', 'тонкое', 's', 390, 500, 700, true, false, false, false, false),
    new Pizza('/assets/images/diablo.png', 'Диабло', 'тонкое', 's', 430, 500, 700, true, false, true, true, false),
    new Pizza('/assets/images/margarita.png', 'Маргарита', 'тонкое', 's', 270, 500, 700, false, true, false, false, false)
]
for (i=0; i<menu.length; i++){
    menuItems.innerHTML +=  menu[i].display()
}

let sortedPizzas = menu

let cartWd = document.querySelector('.cart__window')
let amount = document.querySelector('#amount')
let total = document.querySelector('#total')
let cartProducts = document.querySelector('.cart__window-products')

function toggleCart() {
    cartWd.classList.toggle('cart__window-active')
    cart.drawProduct()
    console.clear()
}

let cart = {
    items: [],
    amount: 0,
    total: 0,

    drawProduct() {
        cartProducts.innerHTML = ''
        let items = JSON.parse(cartJSON).items
        for(i=0;i<cart.items.length;i++) {
            cartProducts.innerHTML +=
            `<div class="cart__window-product">
            <div class="cart__window-productPizza">
                <img src="${items[i].image}" alt="" class="cart__window-productImg">
                <div class="cart__window-productPizzaText">
                    <p class="cart__window-productPizzaHeader">${items[i].name}</p>
                    <p class="cart__window-productPizzaBottom">${items[i].dough}, ${items[i].diameter}.</p>
                </div>
            </div>
            <p class="cart__window-productPrice">${items[i].currentPrice}</p>
            <img src="/assets/images/crestik.png" alt="" class="cart__window-productClearImg" onclick="clearCartProduct(this.parentElement)">
        </div>`
        }
    },
    
    calcCart() {
        this.total = 0
        this.amount = 0
        for(i=0;this.items.length;i++) {
            this.total += this.items[i].currentPrice
            this.amount++
        }
        amount.innerHTML = this.amount
        total.innerHTML = this.total
    }
}

let cartJSON = JSON.stringify(cart)

function clearCart() {
    cartProducts.innerHTML = ""
    document.querySelector('#amount').innerHTML = "0"
    cartAmount.innerHTML = "0"
    cart.items = []
    cart__item = 0
    cartJSON = JSON.parse(cartJSON)
    cartJSON.items = []
    cartJSON = JSON.stringify(cartJSON)
}

function clearCartProduct(item) {
    item.parentElement.removeChild(item)
    cart.calcCart()
    cart__item = cart__item-1
    cartAmount.
    cartJSON = JSON.parse(cartJSON)
    cartJSON.items.removeChild(item)

}

function config() {
    let doughThin = document.querySelectorAll('#thin')
    let doughRegular = document.querySelectorAll('#regular')
    let diameterS = document.querySelectorAll('#small')
    let diameterM = document.querySelectorAll('#medium')
    let diameterL = document.querySelectorAll('#large')
    let addBtn = document.querySelectorAll('.cost__buttonToCart')
    let pizzaPrice = document.querySelectorAll('.cost__text')
    let doughBlock = document.querySelectorAll('.dough__block')
    let diameterBlock = document.querySelectorAll('.diameter__block')
    for (let i=0; i<sortedPizzas.length; i++){
        doughThin[i].addEventListener('click', function(){
            sortedPizzas[i].dough = 'тонкое'
            
            anime({
                targets: doughBlock[i],
                translateX: 0,
                easing: 'easeInOutExpo',
                duration: 200,
            })
        })
    
        
        doughRegular[i].addEventListener('click', function(){
            sortedPizzas[i].dough = 'традиционное'

            anime({
                targets: doughBlock[i],
                translateX: '100%',
                easing: 'easeInOutExpo',
                duration: 200,
            })
        })
        
        diameterS[i].addEventListener('click', function(){
            sortedPizzas[i].diameter = 's'
            sortedPizzas[i].currentPrice = sortedPizzas[i].priceS
            pizzaPrice[i].innerHTML = ''
            pizzaPrice[i].innerHTML += sortedPizzas[i].currentPrice + ' ₽ '

            anime({
                targets: diameterBlock[i],
                translateX: 0,
                easing: 'easeInOutExpo',
                duration: 200,
            })
            
        })
        diameterM[i].addEventListener('click', function(){
            sortedPizzas[i].diameter = 'm'
            sortedPizzas[i].currentPrice = sortedPizzas[i].priceM
            pizzaPrice[i].innerHTML = ''
            pizzaPrice[i].innerHTML += sortedPizzas[i].currentPrice + ' ₽ '

            anime({
                targets: diameterBlock[i],
                translateX: '240%',
                easing: 'easeInOutExpo',
                duration: 200,
            })
            
        })
        diameterL[i].addEventListener('click', function(){
            sortedPizzas[i].diameter = 'l'
            sortedPizzas[i].currentPrice = sortedPizzas[i].priceL
            pizzaPrice[i].innerHTML = ''
            pizzaPrice[i].innerHTML += sortedPizzas[i].currentPrice + ' ₽ '
            
            anime({
                targets: diameterBlock[i],
                translateX: '485%',
                easing: 'easeInOutExpo',
                duration: 200,
            })
        })
        addBtn[i].addEventListener('click', function() {
            cartJSON = JSON.parse(cartJSON)
            cartJSON.items.push(sortedPizzas[i])
            cartJSON = JSON.stringify(cartJSON)
            console.log(cartJSON)
            cart__item += 1
            cartAmount.innerHTML = cart__item
            amount.innerHTML = cart__item
            cart.items.push(sortedPizzas[i])
        })

    }
}

config()

function displaySortedPizzas() {
    for (i=0; i<sortedPizzas.length; i++){
        menuItems.innerHTML += sortedPizzas[i].display()
    }
    config()
}

document.querySelector('#Meat').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for (i=0; i<menu.length; i++){
        if (menu[i].meat){
            sortedPizzas.push(menu[i])
        }
        
    }
    displaySortedPizzas()
})

document.querySelector('#Vegan').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for (i=0; i<menu.length; i++) {
        if (menu[i].vegan) {
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})

document.querySelector('#Grill').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for (i=0; i<menu.length; i++) {
        if (menu[i].bbq) {
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})

document.querySelector('#Hot').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for (i=0; i<menu.length; i++) {
        if (menu[i].hot) {
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})

document.querySelector('#Closed').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = []
    for (i=0; i<menu.length; i++) {
        if (menu[i].calcone) {
            sortedPizzas.push(menu[i])
        }
    }
    displaySortedPizzas()
})

document.querySelector('#All').addEventListener('click', function(){
    menuItems.innerHTML = ''
    sortedPizzas = menu
    displaySortedPizzas()
    }
)

console.log(sortedPizzas)