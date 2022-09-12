const fs = require('fs/promises');
const path = require('path');
const uid = require('uid2');

// find the relative path to the database file

const contactsPath = path.normalize('db/contacts.json');

// =================================================> GET ALL CONTACTS
/**
 * @returns {object}
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
      JSON.stringify(list.filter(contact => contact.id !== contactId.toString()))
    );
    return listContacts();
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
 * @returns {object}
 * function of adding new contact to data base. Generates id with uid library.
 * Overrides data in data base
 */
async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uid(10),
      name,
      email,
      phone,
    };
    const previousList = await listContacts();
    const newList = await JSON.stringify([...previousList, newContact]);
    fs.writeFile(contactsPath, newList);
    return listContacts();
  } catch (err) {
    console.error(err);
  }
}

// Export functions for manipulations with contacts list

module.exports = { listContacts, getContactById, removeContact, addContact, contactsPath };
