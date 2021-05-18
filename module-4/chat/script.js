let messages = [
  {
    text: "Happy Mother's Day!! 🌻",
    timestamp: new Date(),
    iSentIt: true,
  },
  { text: "Thank you!", timestamp: new Date(), iSentIt: false },
];
updateHTML();

function sendMessage(event) {
  event.preventDefault();
  const messageInput = document.getElementById("messageInput");
  messages.push({
    text: messageInput.value,
    iSentIt: true,
    timestamp: new Date(),
  });

  console.log(messages);
  messageInput.value = "";
  updateHTML();

  generateIncomingMessage();
}

function generateIncomingMessage() {
  messages.push({
    text: `Typing...`,
    iSentIt: false,
    timestamp: new Date(),
  });
  updateHTML();

  const secondsToWait = Math.random() * 10;

  setTimeout(function () {
    messages.splice(messages.length - 1, 1);
    messages.push({
      text: "This is a computer generated response",
      iSentIt: false,
      timestamp: new Date(),
    });
    updateHTML();
  }, secondsToWait * 1000);
}

// alternative:
// function formatDate(timestamp) {
//   let hours = timestamp.getHours();
//   let minutes = timestamp.getMinutes();
//   let isAm = true;
//   if (hours === 12) {
//     isAm = false;
//   } else if (hours === 0) {
//     isAm = true;
//     hours = 12;
//   } else if (hours > 12) {
//     isAm = false;
//     hours -= 12;
//   }
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   return `${hours}:${minutes} ${isAm ? "am" : "pm"}`;
// }

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(timestamp);
}

function editMessage(index) {
  const newMessageText = window.prompt(
    "What would you like the message to say?"
  );

  messages[index].text = newMessageText;
  updateHTML();
}

function deleteMessage(index) {
  if (window.confirm("Are you sure you want to delete this message?")) {
    messages.splice(index, 1);
    updateHTML();
  }
}

function updateHTML() {
  const messagesDiv = document.getElementById("messages");

  let htmlToUpdate = "";
  for (const [index, message] of messages.entries()) {
    if (message.iSentIt) {
      htmlToUpdate += `<div class="row message" id="message">
        <div class="col-2"></div>
        <div class="col-10 text-end">
        <div class="buttons">
        <a onclick="editMessage(${index})">Edit</a> | <a onclick="deleteMessage(${index})">Delete</a>
        </div>
          <span class="messageText"
            >${message.text}</span
          >
          <div class="timestamp">${formatDate(message.timestamp)}</div>
        </div>
      </div>`;
    } else {
      htmlToUpdate += `<div class="row message">
        <div class="col-10">
          <span class="messageText userMessageText"
            >${message.text}</span
          >
          <div class="timestamp">${formatDate(message.timestamp)}</div>
        </div>
      </div>`;
    }
  }
  messagesDiv.innerHTML = htmlToUpdate;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
