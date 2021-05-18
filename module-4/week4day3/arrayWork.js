const messages = [
  { text: "First message.", outgoing: true },
  { text: "Second message.", outgoing: false },
  { text: "Third message.", outgoing: true },
  { text: "Last message.", outgoing: false },
];

// let messagesText = [];

// for (const message of messages) {
//   messagesText.push(message.text);
// }

//map & filter both loop types - excels when all keys across objects are the same
const messagesText = messages.map(function (message) {
  return message.text;
});

//shorthand for above
// const messagesText = messages.map((message) => message.text);

// ------- ------ ----- ------
let outgoingMessage = [];

// for (const message of messages) {
//   if (message.outgoing) {
//     outgoingMessage.push(message);
//   }
// }

//shorthand
// const outgoingMessages = messages.filter((message) => !message.outgoing);
const outgoingMessages = messages.filter(function (message) {
  if (message.outgoing === true) {
    return true;
  } else {
    return false;
  }
});
console.log(outgoingMessages);
