const metrikaWrapper = targetFunction => {
    return (...args) => {
        const result = targetFunction(...args)
        return result
    }
}

function func(...args) {
    let count = 0
    const uniqUsers = []

    for (const user of args) {
        const isDuplicate = uniqUsers.some(uniqUser => {
            return (
                uniqUser.login === user.login || uniqUser.password === user.password
            )
        })

        if (!isDuplicate) {
            uniqUsers.push(user)
        }
    }

    for (let i = 0; i < uniqUsers.length; i++) {
        count++
    }

    const res = { date: args[0].date.toISOString().split('T')[0], users: count }
    return res
}