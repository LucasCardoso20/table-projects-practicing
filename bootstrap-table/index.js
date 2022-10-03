const nameInput = document.getElementById('name')
const lastNameInput = document.getElementById('lastName')
const ageInput = document.getElementById('age')
const dateInput = document.getElementById('date')
const btn = document.querySelector('.btn')
const tbody = document.querySelector('tbody')
const registros = document.querySelector('h1')


const keyName = document.querySelector('.key-name')
keyName.addEventListener('click', (e)=> {
    keyName.classList.toggle('filter-active')
    filteringTable()
})

let newArray = []

function deleteTable(id) {
    console.log(id)
    newArray = newArray.filter((item) => {
        return item.id !== id
    })

    const IteratingArray = newArray.map((item, index) => {
        return `<tr key=${index}>
            <td>${item.age}</td>
            <td onclick="filteringTable()">${item.name}</td>
            <td>${item.lastName}</td>
            <td>${item.date}</td>
            <td onclick="deleteTable(${item.id})" class="delete">EXCLUIR</td>
        </tr>`
    }).join('')

    tbody.innerHTML = IteratingArray

    registros.innerHTML = newArray.length
}

function filteringTable() {
    console.log('working')
    newArray = newArray.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })

    const IteratingArray = newArray.map((item, index) => {
        return `<tr key=${index}>
            <td>${item.age}</td>
            <td onclick="filteringTable()">${item.name}</td>
            <td>${item.lastName}</td>
            <td>${item.date}</td>
            <td onclick="deleteTable(${item.id})" class="delete">EXCLUIR</td>
        </tr>`
    }).join('')

    tbody.innerHTML = IteratingArray

    registros.innerHTML = newArray.length
}

function renderTable(newArray) {
    const IteratingArray = newArray.map((item, index) => {
        return `<tr key=${index}>
            <td>${item.age}</td>
            <td onclick="filteringTable()">${item.name}</td>
            <td>${item.lastName}</td>
            <td>${item.date}</td>
            <td onclick="deleteTable(${item.id})" class="delete">EXCLUIR</td>
        </tr>`
    }).join('')

    tbody.innerHTML = IteratingArray

    registros.innerHTML = newArray.length

}

function getValues(e) {
    e.preventDefault()
    const idTable = new Date().getTime()
    const valuesObj = {
        id: idTable,
        name: nameInput.value,
        lastName: lastNameInput.value,
        age: ageInput.value,
        date: dateInput.value
    }

    const { id, name, lastName, age, date } = valuesObj

    newArray.push({ id, name, lastName, age, date })

    return renderTable(newArray)
}

btn.addEventListener('click', getValues)

