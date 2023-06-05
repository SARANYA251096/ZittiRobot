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
    }

    const minutesSinceCleaned = Math.floor(
      (currentTimeObject - roomLastCleaned) / 1000 / 60
    );
    return `The room was just cleaned ${minutesSinceCleaned} minute(s) ago. I hope it's not dirty.`;
  }

  function fetchNewspaper(currentTime) {
    const currentDate = new Date().toLocaleDateString();
    if (lastNewspaperFetch === null || lastNewspaperFetch !== currentDate) {
      lastNewspaperFetch = currentDate;
      return "Here is your newspaper.";
    }

    return "I think you don't get another newspaper the same day.";
  }

  function addToShoppingList(instruction) {
    const item = instruction.split("Add ")[1].split(" to my shopping list")[0];
    if (shoppingList.includes(item)) {
      return `You already have ${item} in your shopping list.`;
    }

    shoppingList.push(item);
    return `${item} added to your shopping list.`;
  }

  function readShoppingList() {
    if (shoppingList.length === 0) {
      return "You have no items in your shopping list.";
    }

    const items = shoppingList.join(", ");
    return `Here is your shopping list: ${items}.`;
  }

  const instructionMap = {
    Hey: () => "Hello, I am doing great.",
    "How's the weather": () => "It's pleasant outside. You should take a walk.",
    "Clean my room": () => cleanRoom(new Date().toLocaleTimeString()),
    Add: (instruction) => addToShoppingList(instruction),
    "Fetch the newspaper": () =>
      fetchNewspaper(new Date().toLocaleTimeString()),
    "Read my shopping list": () => readShoppingList(),
    default: () => "Hmm.. I don't know that.",
  };

  function processInstruction(instruction) {
    const currentTime = new Date().toLocaleTimeString();

    const instructionKeys = Object.keys(instructionMap);
    const matchedKey = instructionKeys.find((key) =>
      instruction.startsWith(key)
    );
    const matchedFunction =
      instructionMap[matchedKey] || instructionMap.default;

    return matchedFunction(instruction);
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

