const contacts = require('./contacts');

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const result = await contacts.listContacts();
        console.table(result);
        break;

    case "get":
        const singleContact = await contacts.getContactById(id);
        console.table(singleContact);
        break;

    case "add":
        const addedContact = await contacts.addContact(name, email, phone);
        console.table(addedContact);
        break;

    case "remove":
        const removedContact = await contacts.removeContact(id);
        console.table(removedContact);
        break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);