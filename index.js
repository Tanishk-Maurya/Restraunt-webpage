import {menuArray} from './data.js'
const menu = document.getElementById("menu")
const orderBox = document.getElementById("order-box-container")
const placeOrderBtn = document.getElementById("place-order-btn")
const modalForm = document.getElementById("form-index")
const payBtn = document.getElementById("submit-form-btn")
const finishMessage = document.getElementById("finish-msg")

const payerNameEl = document.getElementById("user-name")
const cardNumberEl = document.getElementById("user-bank")
const cardCvvEl = document.getElementById("user-cvv")
let orderList = []


function renderMenu() {
    menu.innerHTML = menuArray.map(item =>{
        return `<div class="menu-item">
                    <div class="emoji">${item.emoji} </div>
                    <div class="item-info">
                        <div>${item.name}</div>
                        <div>${item.ingredients}</div>
                        <div>${item.price}</div> 
                    </div>
                    <div>
                        <button id="add-item-button" data-id=${item.id} >+</button>
                    </div>
                </div> ` 
    }).join('')
}
renderMenu()

document.addEventListener('click',function(e){
   
    if(e.target.dataset.id){
        handleAddOrderedItem(e.target.dataset.id)
    }
    else if(e.target.dataset.orderItem){
        handleDeleteOrderedItem(e.target.dataset.orderItem)
    }
    else if(e.target.id ==='place-order-btn'){
        handleCompleteOrder()
    }
    else {
        if(e.target.id === 'submit-form-btn'){
                e.preventDefault()
                handlePaymentBtn()
        }
    }
})


function handleAddOrderedItem(itemId){
    
    orderBox.style.display = 'block'
    menuArray.map(item=>{
        if(itemId == item.id){
            orderList.push(item)

        }
    })
    renderOrderList(orderList)
    finishMessage.style.display = 'none'
}

function renderOrderList(orderList) {
    const orderItemListEl = document.getElementById('order-item-list')
    const orderTotalEl = document.getElementById('order-total')
    let orderTotal = 0

    orderItemListEl.innerHTML = ``
    
    orderList.map((item) => {
        const {name, ingredients, id, price, image} = item
        
        orderItemListEl.innerHTML += `
            <li class="order-item">
                <div>
                    <h3 class="order-item-title">${name}</h3>
                    <button class="remove-btn" data-order-item="${id}">remove</button>
                </div>
                <h4 class="order-item-price">$${price}</h4>
            </li>
        `
        orderTotal += price
    })

    orderTotalEl.innerHTML = `$${(orderTotal).toFixed(2)}`
}


function handleDeleteOrderedItem(itemId){
    let remIndex = ''
    
    orderList.map((item, index) => {
        if(itemId == item.id){
            remIndex = index
        }
    })

    orderList.splice(remIndex, 1)
    
    if(orderList.length === 0){
        orderBox.style.display = 'none'
    }

    renderOrderList(orderList)
}

function handleCompleteOrder(){
    modalForm.style.display =  'block'
    
}

function handlePaymentBtn(){
   modalForm.style.display =  'none'
   orderBox.style.display = 'none'
   finishMessage.style.display = 'block'
   finishMessage.innerHTML = `<h1 id="finsih-msg-text">YOUR ORDER IS SUCCESFUL</h1>`

}

