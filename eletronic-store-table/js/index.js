import productDb, { bulkCreate, getData, createElement } from "./module.js";

//get elements

let db = productDb('Productdb', {
    products: `++id, name, seller, price`
})

const userId = document.querySelector('.user-id')
const productName = document.querySelector('.product-name')
const productSeller = document.querySelector('.product-seller')
const productPrice = document.querySelector('.product-price')

//buttons

const createBtn = document.querySelector('.btn-create')
const readBtn = document.querySelector('.btn-read')
const updateBtn = document.querySelector('.btn-update')
const deleteBtn = document.querySelector('.btn-delete')

//setting listeners

createBtn.onclick = (e) => {
    e.preventDefault()
    let flag = bulkCreate(db.products, {
        name: productName.value,
        seller: productSeller.value,
        price: productPrice.value
    })

    console.log(flag)

    productName.value = productSeller.value = productPrice.value = ""
    getData(db.products, (data) => {
        userId.innerHTML = data.id + 1 || 1
    })

}

// read button event

readBtn.onclick = table

//update event

updateBtn.onclick = () => {
    const id = Number(userId.value) || 0
    if (id) {
        db.products.update(id, {
            name: productName.value,
            seller: productSeller.value,
            price: productPrice.value,
        }).then((updated) => {
            let get = updated ? `data Updated` : `Couldn't Update Data`
            console.log(get)
        })
    }

    table()
}

//delete All Table

deleteBtn.onclick = () => {
    db.delete()
    db = productDb('Productdb', {
        products: `++id, name, seller, price`
    })
    db.open()
    table()
}

window.onload = () => {
    textId(userId)
}

function textId(textBoxId){
    getData(db.products, data=> {
        textBoxId.textContent = data.id + 1 || 1
    })
}

function table() {
    const tbody = document.querySelector('tbody')

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild)
    }

    getData(db.products, (data) => {
        if (data) {
            createElement("tr", tbody, (tr) => {
                for (const value in data) {
                    createElement("td", tr, td => {
                        td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value]
                    })
                }
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += 'bi bi-pencil-square text-success'
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = editBtn
                    })
                })

                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += 'bi bi-trash-fill text-danger'
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = deleteColumn
                    })
                })
            })
        }
    })
}


function editBtn(e) {
    let id = Number(e.target.dataset.id)

    db.products.get(id, data => {
        userId.value = data.id || 0
        productName.value = data.name || ''
        productSeller.value = data.seller || "",
            productPrice.value = data.price || 0
    })
}

function deleteColumn(e) {
    let id = Number(e.target.dataset.id)
    db.products.delete(id)
    table()
}