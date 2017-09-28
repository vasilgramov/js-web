let storage = (() => {

    let storage = new Map();
    let fs = require('fs');

    function put(key, value) {
        if (!checkIfString(key)) {
            throw new Error('The key must be a String!');
        }

        if (isInStorage(key)) {
            throw new Error('The key is already in the Storage');
        }

        storage.set(key, value);
    }

    function get(key) {
        if (!checkIfString(key)) {
            throw new Error('The key must be a String!');
        }

        if (!isInStorage(key)) {
            throw new Error('The key is not in the Storage');
        }

        return storage.get(key);
    }

    function getAll() {
        if (storage.size == 0) {
            return 'The Storage is empty!';
        }

        return storage;
    }

    function update(key, newValue) {
        if (!checkIfString(key)) {
            throw new Error('The key must be a String!');
        }

        if (!isInStorage(key)) {
            throw new Error('The key must be in the Storage!');
        }

        storage.set(key, newValue);
    }

    function remove(key) {
        if (!checkIfString(key)) {
            throw new Error('The key must be a String!');
        }

        if (!isInStorage(key)) {
            throw new Error('The key must be in the Storage!');
        }


        storage.delete(key);
    }

    function clear() {
        storage.clear();
    }

    function save() {
        fs.writeFile(
            './storage.json', 
            JSON.stringify([...storage]), 
            function(err) { if (err) { return; } }); 
    }

    function load(cb) {
        fs.readFile(
            './storage.json', 
            'utf8', 
            function (err,data) {
            if (err) {  return;  }
        
            storage = new Map(JSON.parse(data));

            console.log(cb());   
          });
    }

    function checkIfString(key) {
        return typeof key === 'string';
    }

    function isInStorage(key) {
        return storage.has(key);
    }

    return {
        put,
        get,
        getAll,
        update,
        remove,
        clear,
        save,
        load
    };
    
})();

module.exports = { storage };
