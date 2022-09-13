const argv = require('yargs').argv;
const fs = require('fs/promises');

const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
        .then(console.table)
        .catch(error => console.log(error.message));
      break;

    case 'get':
      getContactById(id)
        .then(console.log)
        .catch(error => console.log(error.message));
      break;

    case 'add':
      addContact(name, email, phone)
        .then(console.table)
        .catch(error => console.log(error.message));
      break;

    case 'remove':
      removeContact(id)
        .then(console.table)
        .catch(error => console.log(error.message));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

(async () => {
  await invokeAction(argv);
})();
