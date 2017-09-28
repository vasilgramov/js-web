// let storage = (() => {

//     let storage = new Map();
//     let fs = require('fs');

//     function put(key, value) {
//         if (!checkIfString(key)) {
//             throw new Error('Key must be a String!');
//         }

//         if (isInStorage(key)) {
//             throw new Error('Key is already in the Storage');
//         }

//         storage.set(key, value);
//     }

//     function get(key) {
//         if (!checkIfString(key)) {
//             throw new Error('Key must be a String!');
//         }

//         if (!isInStorage(key)) {
//             throw new Error('Key is no in the Storage');
//         }
//     }

//     function getAll() {
//         if (storage.size == 0) {
//             return 'The Storage is empty!';
//         }

//         return storage;
//     }

//     function update(key, newValue) {
//         if (!checkIfString(key)) {
//             throw new Error('Key must be a String!');
//         }

//         if (!isInStorage(key)) {
//             throw new Error('Key must be in the Storage!');
//         }

//         storage.set(key, newValue);
//     }

//     function remove(key) {
//         if (!checkIfString(key)) {
//             throw new Error('Key must be a String!');
//         }

//         if (!isInStorage(key)) {
//             throw new Error('Key must be in the Storage!');
//         }


//         storage.delete(key);
//     }

//     function clear() {
//         storage.clear();
//     }

//     function save() {
//         fs.writeFile(
//             '/home/vladix/Programmig/JSWeb/ExpressJS/02.NodeJSIntroduction/IntroductionToNodeHomework/storage.json', 
//             JSON.stringify([...storage]), 
//             function(err) { if (err) { return; } }); 
//     }

//     function load(cb) {
//         fs.readFile(
//             '/home/vladix/Programmig/JSWeb/ExpressJS/02.NodeJSIntroduction/IntroductionToNodeHomework/storage.json', 
//             'utf8', 
//             function (err,data) {
//             if (err) {  return;  }
        
//             storage = new Map(JSON.parse(data));

//             console.log(storageModule);
//             cb();   
//           });
//     }

//     function checkIfString(key) {
//         return typeof key === 'string';
//     }

//     function isInStorage(key) {
//         return storage.has(key);
//     }

//     return {
//         put,
//         get,
//         getAll,
//         update,
//         remove,
//         clear,
//         save,
//         load
//     };
    
// })();

// module.exports = { storage };


let storage = new Map();
let fs = require('fs');

function put(key, value) {
    if (!checkIfString(key)) {
        throw new Error('Key must be a String!');
    }

    if (isInStorage(key)) {
        throw new Error('Key is already in the Storage');
    }

    storage.set(key, value);
}

function get(key) {
    if (!checkIfString(key)) {
        throw new Error('Key must be a String!');
    }

    if (!isInStorage(key)) {
        throw new Error('Key is no in the Storage');
    }

    let item = storage.get(key);
    return item;
}

function getAll() {
    if (storage.size == 0) {
        return 'The Storage is empty!';
    }

    return storage;
}

function update(key, newValue) {
    if (!checkIfString(key)) {
        throw new Error('Key must be a String!');
    }

    if (!isInStorage(key)) {
        throw new Error('Key must be in the Storage!');
    }

    storage.set(key, newValue);
}

function remove(key) {
    if (!checkIfString(key)) {
        throw new Error('Key must be a String!');
    }

    if (!isInStorage(key)) {
        throw new Error('Key must be in the Storage!');
    }


    storage.delete(key);
}

function clear() {
    storage.clear();
}

function save(cb) {
    fs.writeFile(
        '/home/vladix/Programmig/JSWeb/ExpressJS/02.NodeJSIntroduction/IntroductionToNodeHomework/storage.json', 
        JSON.stringify([...storage]), 
        function(err) { if (err) { return; } 
        
        console.log(cb());
    }); 
}

function load(cb) {
    fs.readFile(
        '/home/vladix/Programmig/JSWeb/ExpressJS/02.NodeJSIntroduction/IntroductionToNodeHomework/storage.json', 
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

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    remove: remove,
    clear: clear,
    save: save,
    load: load 
}