// Array of possible secret words
const words = ["angkor wat", "burj khalifa", "colosseum", "christ the redeemer","eiffel tower","forbidden city","great wall of china","hagia sophia","independence hall","jerash ruins","kremlin","louvre museum","machu picchu"," niagara falls","one world trade center","petra", "qutub minar", "roman forum", "statue of liberty", "taj mahal", "uluru", "versailles palace", "westminster abbey", "xochimilco", "yellowstone national park", "zocalo"];
// Game variables
let secretWord;
let attemptsLeft = 5;
let previousGuesses = [];

// Function to initialize the game
function initializeGame() {
    // Select a random word from the array
    secretWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = 5;
    previousGuesses = [];
    
    // Update hint (first letter of secret word)
    document.getElementById('hint').textContent = `Hint: The word starts with '${secretWord[0].toUpperCase()}'`;
    
    // Reset UI elements
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = `Attempts left: ${attemptsLeft}`;
    document.getElementById('previous-guesses').innerHTML = '';
    document.body.style.backgroundColor = 'white'; // Reset background color
    
    // Enable input and button
    enableGame();
    
    // Log secret word to console for testing
    console.log('Secret word:', secretWord);
}

// Function to check the user's guess
function checkGuess() {
    // Get and process the guess (trim spaces and convert to lowercase)
    const guess = document.getElementById('guess-input').value.trim().toLowerCase();
    document.getElementById('guess-input').value = ''; // Clear input field
    
    // Handle empty input
    if (guess === '') {
        document.getElementById('message').textContent = 'Please enter a valid guess.';
        return;
    }
    
    // Add guess to previous guesses and update the list
    previousGuesses.push(guess);
    updatePreviousGuesses();
    
    // Check if guess is correct
    if (guess === secretWord) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the secret word!';
        document.body.style.backgroundColor = 'lightgreen'; // Win color
        disableGame();
    } else {
        attemptsLeft--;
        document.getElementById('attempts').textContent = `Attempts left: ${attemptsLeft}`;
        
        if (attemptsLeft === 0) {
            document.getElementById('message').textContent = `Game over! The secret word was '${secretWord}'.`;
            document.body.style.backgroundColor = 'lightcoral'; // Loss color
            disableGame();
        } else {
            document.getElementById('message').textContent = `Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`;
        }
    }
}

// Function to update the list of previous guesses
function updatePreviousGuesses() {
    const list = document.getElementById('previous-guesses');
    list.innerHTML = ''; // Clear existing list
    previousGuesses.forEach(guess => {
        const li = document.createElement('li');
        li.textContent = guess;
        list.appendChild(li);
    });
}

// Function to disable input and submit button when game ends
function disableGame() {
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('guess-input').disabled = true;
}

// Function to enable input and submit button
function enableGame() {
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('guess-input').disabled = false;
}

// Function to restart the game
function restartGame() {
    initializeGame();
}

// Event listeners
document.getElementById('submit-btn').addEventListener('click', checkGuess);
document.getElementById('restart-btn').addEventListener('click', restartGame);

// Allow Enter key to submit guess
document.getElementById('guess-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Initialize the game on page load

initializeGame();
