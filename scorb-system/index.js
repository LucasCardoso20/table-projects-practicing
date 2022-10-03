//DOM Elements Selection

let companyForm = document.getElementById('company-name')
let quantityForm = document.getElementById('quantity')
let dateForm = document.getElementById('date')
const tbody = document.querySelector('tbody')
const showFormBtn = document.querySelector('.btn-show-form')
const btnSubmit = document.querySelector('.btn-submit')
const form = document.querySelector('form')
const filterName = document.querySelector('.filter-name')
const filterMonth = document.querySelector('.filter-month')
const registers = document.querySelector('.registers')
const clearFilters = document.querySelector('.clear-filters')

//End Of DOM Elements Selection

//Default Variables

let isEditing = false;
let editId;
let valuesArray = []

//End Of Default Variables


//Event Listeners

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    if (!companyForm.value || !quantityForm.value || !dateForm.value) {
        alert('You have to fill the form in order to submit it')
    } else {
        submitForm()
    }
})

showFormBtn.addEventListener('click', () => {
    form.classList.toggle('show-form')
})

filterName.addEventListener('click', (e) => {
    e.preventDefault()

    filterName.parentElement.classList.toggle('filter-active')
    filterNameFunc()
})

filterMonth.addEventListener('click', filterMonthFunc)

clearFilters.addEventListener('click', clearFiltersFunc)

//End Of Event Listeners

function filterQuantity(selectOption) {
    if (selectOption.value === 'default') {
        const renderTableArray = valuesArray.map((item) => {
            return renderTable(item.id, item.companyName, item.quantity, item.date)
        }).join('')

        tbody.innerHTML = renderTableArray
        registers.textContent = 'Number of registers:' + valuesArray.length

    } else if (selectOption.value === 'more-than-ten') {
        const newArray = valuesArray.filter((item) => item.quantity >= 10)

        const renderFilterName = newArray.map((item) => {
            return renderTable(item.id, item.companyName, item.quantity, item.date)
        }).join('')

        tbody.innerHTML = renderFilterName
        registers.textContent = 'Number of registers:' + newArray.length
    } else {
        const arrayMenores = valuesArray.filter((item) => item.quantity < 10)

        const renderFilterName = arrayMenores.map((item) => {
            return renderTable(item.id, item.companyName, item.quantity, item.date)
        }).join('')

        tbody.innerHTML = renderFilterName
        registers.textContent = 'Number of registers:' + arrayMenores.length
    }
}

function filterNameFunc() {
    const checkClassFilter = filterName.parentElement.classList.contains('filter-active')

    if (checkClassFilter) {
        valuesArray = valuesArray.sort((a, b) => {
            if (a.companyName.toLowerCase() < b.companyName.toLowerCase()) { return -1; }
            if (a.companyName.toLowerCase() > b.companyName.toLowerCase()) { return 1; }
            return 0;
        })
    } else {
        valuesArray = valuesArray.sort(() => Math.random() - 0.5)
    }

    const renderFilterName = valuesArray.map((item) => {
        return renderTable(item.id, item.companyName, item.quantity, item.date)
    }).join('')

    tbody.innerHTML = renderFilterName
    registers.textContent = 'Number of registers:' + valuesArray.length
}

function filterMonthFunc() {
    let arrayMonths = []
    const renderTableArray = valuesArray.map((item) => {
        arrayMonths.push(new Date(item.date).getMonth() + 1)
        console.log(arrayMonths)
        return renderTable(item.id, item.companyName, item.quantity, item.date)
    }).join('')

    tbody.innerHTML = renderTableArray
    registers.textContent = 'Number of registers:' + valuesArray.length
}

function removeColumn(id) {

    valuesArray = valuesArray.filter((item) => {
        return item.id !== id
    })

    const renderTableArray = valuesArray.map((item) => {
        return renderTable(item.id, item.companyName, item.quantity, item.date)
    }).join('')

    tbody.innerHTML = renderTableArray
    registers.textContent = 'Number of registers:' + valuesArray.length
}

function editColumn(id) {
    let specificItem = valuesArray.find((item) => item.id === id)
    companyForm.value = specificItem.companyName
    quantityForm.value = specificItem.quantity
    dateForm.value = specificItem.date

    btnSubmit.textContent = "edit";
}

function displayTable(valuesArray) {
    const renderTableArray = valuesArray.map((item) => {
        return renderTable(item.id, item.companyName, item.quantity, item.date)
    }).join('')

    tbody.innerHTML = renderTableArray
    registers.textContent = 'Number of registers:' + valuesArray.length
}

function clearFiltersFunc() {
    shuffle(valuesArray)
    displayTable(valuesArray)
    filterName.parentElement.classList.remove('filter-active')
    document.getElementById('byQuantity').value = 'default'
}

function submitForm() {
    let idForm = new Date().getTime()

    const formValues = {
        companyName: companyForm.value,
        quantity: quantityForm.value,
        date: dateForm.value,
        id: idForm
    }

    btnSubmit.textContent = "Submit";

    const { id, companyName, quantity, date } = formValues

    valuesArray.push({ id, companyName, quantity, date })

    return displayTable(valuesArray)
}


function renderTable(id, companyName, quantity, date) {
    return `<tr key=${id}>
    <td>${companyName}</td>
    <td>${quantity}</td>
    <td>${date}</td>
    <td onclick="editColumn(${id})" role="button" class="edit">
        <i class="bi bi-pencil-square text-success"></i>
    </td>
    <td onclick="removeColumn(${id})" role="button" class="delete">
        <i class="bi bi-trash-fill text-danger"></i>
    </td>
    `
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}