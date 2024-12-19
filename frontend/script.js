// Function to clean data (remove special characters, extra spaces, etc.)
function cleanData(messages) {
    return messages
        .map(line => line.replace(/[^a-zA-Z0-9\s]/g, '').trim()) // Remove special characters
        .filter(line => line.length > 0); // Remove empty lines
}

// Function to process uploaded file
function processFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById("output").textContent = "Please select a file!";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const fileContent = e.target.result;

        // Split file content into lines
        const rawMessages = fileContent.split("\n");

        // Clean the messages
        const cleanedMessages = cleanData(rawMessages);

        // Perform sentiment analysis
        analyzeMessages(cleanedMessages);
    };
    reader.readAsText(file);
}

// Function to process manual input
function processManualInput() {
    const messageInput = document.getElementById("messageInput").value;

    if (!messageInput.trim()) {
        document.getElementById("output").textContent = "Please enter some messages!";
        return;
    }

    // Split input into lines and clean
    const rawMessages = messageInput.split("\n");
    const cleanedMessages = cleanData(rawMessages);

    // Perform sentiment analysis
    analyzeMessages(cleanedMessages);
}

// Function to perform sentiment analysis on messages
function analyzeMessages(messages) {
    const sentiment = new Sentiment();

    // Analyze each message and calculate sentiment score
    const results = messages.map(message => ({
        message: message,
        sentiment: sentiment.analyze(message).score
    }));

    // Format results for display
    const output = results
        .map(result => `Message: "${result.message}" | Sentiment Score: ${result.sentiment}`)
        .join("\n");

    // Update the output section
    document.getElementById("output").textContent = output;

    console.log(results); // Debugging info
}
