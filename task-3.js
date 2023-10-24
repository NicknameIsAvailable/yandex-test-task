module.exports = function sortData(array, order, field) {
    const templateSet = new Set(order)
    const templateLength = order.length

    function getOrderIndex(item) {
        if (templateSet.has(item)) {
            return templateOrderMap.get(item)
        }
        return templateLength
    }

    const templateOrderMap = new Map()
    for (let i = 0; i < templateLength; i++) {
        templateOrderMap.set(order[i], i)
    }

    function findFirstField(obj) {
        const queue = [obj]
        const visited = new Set()
        while (queue.length > 0) {
            const currentObj = queue.shift()
            for (const key in currentObj) {
                if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                    queue.push(currentObj[key])
                } else {
                    return key
                }
            }
        }
    }

    array.sort((a, b) => {
        const orderA = getOrderIndex(field ? findField(a, field) : a)
        const orderB = getOrderIndex(field ? findField(b, field) : b)

        if (orderA !== orderB) {
            return orderA - orderB
        }

        if (typeof a === 'string') {
            return String(a).localeCompare(String(b))
        } else if (typeof a === 'number') {
            return a - b
        } else {
            // Handle other data types as needed
            return 0
        }
    })

    return array
}

function findField(obj, field) {
    const keys = field.split('.')
    let currentObj = obj
    for (const key of keys) {
        if (currentObj[key] === undefined) {
            return undefined
        }
        currentObj = currentObj[key]
    }
    return currentObj
}