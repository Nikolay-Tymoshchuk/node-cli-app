const fs = require('fs').promises;
const path = require('path');
import { uid } from 'uid';

// find the relative path to the database file

const contactsPath = path.normalize('db/contacts.json');

// =================================================> GET ALL CONTACTS
/**
 * @returns {array}
 * function of getting all contacts in data base. Return parsed result.
 */
async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contactsList);
  } catch (err) {
    console.error(err);
  }
}

// =================================================>FIND CONTACT BY ID
/**
 *
 * @param {string} contactId
 * @returns {object}
 * function of searching contact by ID in data base.
 */
async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    return contactList.find(contact => contact.id === contactId.toString());
  } catch (err) {
    console.error(err);
  }
}

// ===================================================>DELETE CONTACT BY ID
/**
 *
 * @param {string} contactId
 * function of deleting contact by ID in data base.
 * Overrides data in data base
 */
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

// =====================================================>ADD CONTACT
/**
 *
 * @param {string} name - name of user
 * @param {string} email - email of user
 * @param {string} phone - phone number of user
 *
 * function of adding new contact to data base. Generates id with uid library.
 * Overrides data in data base
 */
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

// Export functions for manipulations with contacts list

export { listContacts, getContactById, removeContact, addContact };
