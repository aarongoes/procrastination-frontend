var step = 0;
var prompt = document.createElement("p");
var input = document.createElement("input");
var nextBtn = document.createElement("button");
var content;
const prompts = [
  "What do you <a>want</a> to work on?",
  "What are you trying to <a>avoid</a> by procrasting?",
  "What <a>pain</a> would you feel afterwards, if you procrastinated instead of working on it?",
  "If you <a>get it done</a>, how would you feel about yourself?",
  "What small thing could you do <a>right now</a> to move you forward?",
];
const summaries = [
  "If I <a>do</a> work on my task",
  "If I <a>don't</a> work on my task",
  "I only have to do this <a>small thing</a> to get started",
];
const summaryMap = [3, 2, 4];
const placeholders = [
  "Maths homework",
  "Difficulty and boredom",
  "I'd feel frustrated with myself",
  "I'd feel proud and relaxed",
  "Put my books on my desk",
];
var inputs = [];

document.addEventListener("DOMContentLoaded", function () {
  initializeElements();
});

window.onpopstate = function () {
  if (step != 0) {
    loadStep(--step);
  }
};

function initializeElements() {
  content = document.getElementById("content");
  prompt.id = "prompt";
  input.id = "input";
  input.setAttribute("type", "text");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      saveStep(step);
      loadStep(++step);
    }
  });
  nextBtn.id = "nextBtn";
  nextBtn.addEventListener("click", function () {
    saveStep(step);
    loadStep(++step);
  });
  loadStep(step);
}

function clearContent() {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
}

function saveStep(step) {
  history.pushState({}, "");
  inputs[step] = input.value;
}

function appendPromptChildren() {
  clearContent();
  content.appendChild(prompt);
  content.appendChild(input);
  content.appendChild(nextBtn);
  input.focus();
}

function ready() {
  history.pushState({}, "");
  step++;
  clearContent();
  let heading = document.createElement("h1");
  heading.id = "readyHeading";
  heading.textContent = inputs[4];
  content.appendChild(heading);
}

function notReady() {
  history.pushState({}, "");
  step++;
  clearContent();
  let heading1 = document.createElement("h1");
  heading1.textContent = "Not ready yet?";
  content.appendChild(heading1);
  let heading2 = document.createElement("h3");
  heading2.textContent = "The task is still too big";
  content.appendChild(heading2);
  let paragraph1 = document.createElement("p");
  paragraph1.textContent =
    "Try to make it even smaller. Even just putting your books on your desk can be a way to start. Once you've made some progress towards your goal, you'll find it won't be as hard to keep going.";
  content.appendChild(paragraph1);
  let heading3 = document.createElement("h3");
  heading3.textContent = "I'm feeling tired";
  content.appendChild(heading3);
  let paragraph2 = document.createElement("p");
  paragraph2.innerHTML =
    "Let's do a little energizer. You can find it <a id='energizer' href='https://www.youtube.com/watch?v=tybOi4hjZFQ'>here</a>.";
  content.appendChild(paragraph2);
  let heading4 = document.createElement("h3");
  heading4.textContent = "I don't feel confident I can do it";
  content.appendChild(heading4);
  let paragraph3 = document.createElement("p");
  paragraph3.innerHTML =
    "Make the task smaller until you feel like you can do it. You can also use a <a id='powerpose' href='https://images.theconversation.com/files/462476/original/file-20220511-25-1kzokh.jpg'>power pose</a> to boost your confidence.";
  content.appendChild(paragraph3);
}

function loadStep(step) {
  if (inputs[step]) {
    input.value = inputs[step];
  } else {
    input.value = "";
  }
  if (step < prompts.length) {
    appendPromptChildren();
    prompt.innerHTML = prompts[step];
    input.setAttribute("placeholder", placeholders[step]);
    input.setAttribute("name", "input" + step);
    input.id = "input" + step;
    nextBtn.textContent = "Next";
  } else {
    switch (step) {
      case prompts.length:
        console.log(summaries);
        clearContent();
        let heading = document.createElement("h1");
        heading.textContent = "Let's summarize";
        content.appendChild(heading);
        for (let i = 0; i < summaries.length; i++) {
          console.log("asdf");
          let summary = document.createElement("h3");
          summary.id = "summary" + i;
          summary.innerHTML = summaries[i];
          let answer = document.createElement("p");
          summary.answer = "answer" + i;
          answer.textContent = inputs[summaryMap[i]];
          content.appendChild(summary);
          content.appendChild(answer);
        }
        let buttonWrapper = document.createElement("div");
        buttonWrapper.id = "buttonWrapper";
        let notReadyBtn = document.createElement("a");
        notReadyBtn.id = "notReadyBtn";
        notReadyBtn.textContent = "I don't feel ready yet";
        notReadyBtn.addEventListener("click", () => notReady());
        buttonWrapper.appendChild(notReadyBtn);
        let readyBtn = document.createElement("button");
        readyBtn.textContent = "I feel ready!";
        readyBtn.addEventListener("click", () => ready());
        buttonWrapper.appendChild(readyBtn);
        content.appendChild(buttonWrapper);
        break;
      case 5:
        break;
    }
  }
  console.log(step);
}
