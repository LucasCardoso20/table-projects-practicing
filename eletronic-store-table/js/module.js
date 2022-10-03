
const productDb = (dbName, table) => {
    const db = new Dexie(dbName)
    db.version(1).stores(table)
    db.open()

    return db
}

const bulkCreate = (dbtable, data) => {
    let flag = empty(data)

    if (flag) {
        dbtable.bulkAdd([data])
        console.log("data inserted successfully")
    } else {
        console.log('Please provide data')
    }

    return flag

}

//get data from the database
const getData = (dbtable, fn) => {
    let index = 0;
    let obj = {}

    dbtable.count((count) => {
        if (count) {
            dbtable.each(table => {
                obj = sortObj(table)
                fn(obj, index++)
            })
        }else{
            fn(0)
        }
    })
}

//sort obj

const sortObj = sortobj => {
    let obj = {}
    obj = {
        id: sortobj.id,
        name: sortobj.name,
        seller: sortobj.seller,
        price: sortobj.price
    }

    return obj
}

//validation

const empty = object => {
    let flag = false

    for (const value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true
        } else {
            flag = false
        }
    }

    return flag
}

//creating dynamic element
const createElement = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname)
    if(appendTo){
        appendTo.appendChild(element)
    }
    if(fn){
        return fn(element)
    }
}

export default productDb
export {
    bulkCreate,
    getData,
    createElement
}