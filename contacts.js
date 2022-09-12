const fs = require('fs').promises;
const path = require('path');
import { uid } from 'uid';

const contactsPath = path.normalize('db/contacts.json');

async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contactsList);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    return contactList.find(contact => contact.id === contactId.toString());
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts();
    fs.writeFile(
      contactsPath,
      list.filter(contact => contact.id !== contactId.toString())
    );
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uid(),
      name,
      email,
      phone,
    };
    const list = await listContacts();
    const newList = await JSON.stringify([...list, newContact]);
    fs.writeFile(contactsPath, newList);
  } catch (err) {
    console.error(err);
  }
}

module.exports {
	listContacts,
		getContactById,
		
}