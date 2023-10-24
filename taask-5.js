/**
 * @typedef Overtaking
 * @property {string} leading
 * @property {string} lagging
 */

/**
 * @param {string[]} racers
 * @param {Overtaking[]} overtaking
 * @param {string} winner
 * @returns {string[][]}
 */
function getRaceFinishingOrder(racers, overtaking, winner) {
    const orders = []
    const currentOrder = [winner]
    const used = new Set()

    const isOrderValid = () => {
        for (const overtake of overtaking) {
            const leadingIdx = currentOrder.indexOf(overtake.leading)
            const laggingIdx = currentOrder.indexOf(overtake.lagging)
            if (leadingIdx === -1 || laggingIdx === -1 || leadingIdx <= laggingIdx) {
                return false
            }
        }
        return true
    }

    const backtrack = () => {
        if (currentOrder.length === racers.length) {
            if (isOrderValid()) {
                orders.push([...currentOrder])
            }
            return
        }

        for (const racer of racers) {
            if (!used.has(racer)) {
                used.add(racer)
                currentOrder.push(racer)
                backtrack()
                used.delete(racer)
                currentOrder.pop()
            }
        }
    }

    backtrack()
    return orders
}

module.exports = getRaceFinishingOrder