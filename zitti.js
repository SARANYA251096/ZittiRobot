function createZittiAssistant() {
  let roomLastCleaned = null;
  let lastNewspaperFetch = null;
  const shoppingList = [];

  function cleanRoom(currentTime) {
    const currentTimeObject = new Date();
    if (
      roomLastCleaned === null ||
      (currentTimeObject - roomLastCleaned) / 1000 / 60 >= 10
    ) {
      roomLastCleaned = currentTimeObject;
      return `Room is cleaned. It looks tidy now. Job completed at ${currentTime}.`;
    } else {
      const minutesSinceCleaned = Math.floor(
        (currentTimeObject - roomLastCleaned) / 1000 / 60
      );
      return `The room was just cleaned ${minutesSinceCleaned} minute(s) ago. I hope it's not dirty.`;
    }
  }

  function fetchNewspaper(currentTime) {
    const currentDate = new Date().toLocaleDateString();
    if (lastNewspaperFetch === null || lastNewspaperFetch !== currentDate) {
      lastNewspaperFetch = currentDate;
      return "Here is your newspaper.";
    } else {
      return "I think you don't get another newspaper the same day.";
    }
  }

  function addToShoppingList(instruction) {
    const item = instruction.split("Add ")[1].split(" to my shopping list")[0];
    if (shoppingList.includes(item)) {
      return `You already have ${item} in your shopping list.`;
    } else {
      shoppingList.push(item);
      return `${item} added to your shopping list.`;
    }
  }

  function readShoppingList() {
    if (shoppingList.length === 0) {
      return "You have no items in your shopping list.";
    } else {
      const items = shoppingList.join(", ");
      return `Here is your shopping list. ${items}.`;
    }
  }

  function processInstruction(instruction) {
    const currentTime = new Date().toLocaleTimeString();

    if (instruction.startsWith("Hey")) {
      return "Hello, I am doing great.";
    } else if (instruction.startsWith("How's the weather")) {
      return "It's pleasant outside. You should take a walk.";
    } else if (instruction.startsWith("Clean my room")) {
      return cleanRoom(currentTime);
    } else if (instruction.startsWith("Add")) {
      return addToShoppingList(instruction);
    } else if (instruction.startsWith("Fetch the newspaper")) {
      return fetchNewspaper(currentTime);
    } else if (instruction.startsWith("Read my shopping list")) {
      return readShoppingList();
    } else {
      return "Hmm.. I don't know that.";
    }
  }

  return {
    processInstruction,
  };
}

function main() {
  const assistant = createZittiAssistant();

  const instructions = [
    "Hey. How are you?",
    "How's the weather outside?",
    "Is rainy today?",
    "Clean my room within 10 minutes",
    "Fetch the newspaper",
    "Clean my room",
    "Add Bread to my shopping list",
    "Add Eggs to my shopping list",
    "Add Sauce to my shopping list",
    "Add Bread to my shopping list.",
    "Read my shopping list",
    "How much is 5 + 2?",
  ];

  for (const instruction of instructions) {
    const response = assistant.processInstruction(instruction);
    console.log(response);
  }
}

main();
