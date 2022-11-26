const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async(contactId) => {
    const data = await listContacts();
    const contact = data?.find((contact) => contact.id === contactId);
    return contact;
}

const updateListContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    const [result] = contacts?.splice(contactIndex, 1);
    await updateListContacts(contacts);
    console.table(contacts);
    return result;
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        name,
        email,
        phone,
        id: ((contacts.length + 1).toString()),
    };
    contacts?.push(newContact);
    await updateListContacts(contacts);
    console.table(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}