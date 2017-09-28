let storageModule = require('./storageModule.js').storage;

storageModule.put('first','firstValue');
// storage.put('second','secondValue');
// storage.put('third','thirdValue');
// storage.put('fouth','fourthValue'); 
// console.log(storage.getAll());

storageModule.save();
storageModule.clear();

storageModule.load(() => storageModule.get('first'));

// console.log(storage.get('first'));
// storage.remove('second');
// storage.update('first','updatedFirst');
// storage.save();
// storage.clear();
// console.log(storage.getAll());
// console.log(storage.getAll());
