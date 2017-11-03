let map = new Map()

export default {
    addFunc(name, func) {
        map.set(name, func) 
    },
    executeFun(name) { 
        map.get(name)()
    }
}