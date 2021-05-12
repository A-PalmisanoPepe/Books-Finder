const mobileNavbarReducer = (state = false, action) => {
    switch(action.type) {
        case 'OPEN':
            return true
        case 'CLOSE':
            return false
        default:
            return false
    }
}

export default mobileNavbarReducer;