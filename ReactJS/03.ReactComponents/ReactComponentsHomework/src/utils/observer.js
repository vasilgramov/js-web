let observer = {

}

export default {
    addFunc: (name, func) => {
        observer[name] = func
    },
    executeFunc: (name, props) => {
        observer[name](props)
    }
}