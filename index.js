const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      console.table(getContact);
      break;

    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      console.table(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
