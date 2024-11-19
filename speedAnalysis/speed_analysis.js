let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
    // enable userInput area
    document.getElementById("userInput").readOnly = false;
    // Set the test text
    document.getElementById("inputText").value = testText;
    
    // Reset results and timer
    document.getElementById("output").innerHTML = "";
    startTime = new Date().getTime();
    
    // Change button text and functionality
    var button = document.getElementById("btn");
    button.innerHTML = "End Test";
    button.onclick = endTest;
}

function endTest(){
    endTime = new Date().getTime();
    // Disable user input
    document.getElementById("userInput").readOnly = true;

    // Calculate time elapsed and words per minute (WPM)
    var timeElapsed = (endTime - startTime) / 1000; // in seconds
    var userTypedText = document.getElementById("userInput").value;
    // Split the text
    var typedWords = userTypedText.split(' ').filter(function (word) {
        return word !== "";
    }).length;
    var wpm = 0; // Default value

    if(timeElapsed!=0 && !isNaN(typedWords)){
        wpm = Math.round(typedWords/(timeElapsed/60));
    }
    var textLength = document.getElementById("userInput").value.length;
    // Display the results
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Typing Test Results:</h2>" +
        "<p>Total Length: " + textLength + "</p>" +
        "<p>Words Typed: " + typedWords + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>";

    // Reset the button
    var button = document.getElementById("btn");
    button.innerHTML = "Start Test";
    button.onclick = startTest;

    // reset UserInputArea
    document.getElementById('userInput').value="";
}