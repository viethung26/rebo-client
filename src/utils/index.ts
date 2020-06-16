const pushOrPull = (arr: any[], data) => {
    const array = [...arr]
    const index = array.indexOf(data)
    if (index !== -1) {
        array.splice(index , 1)
    } else {
        array.push(data)
    }
    return array
}

export {
    pushOrPull
}