let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let slots = document.querySelectorAll(".slot");

let selected = null;

// Step 1: Make all bottles draggable
for (let list of lists) {
    list.addEventListener("dragstart", function (e) {
        selected = this;
    });
}

// Step 2: Allow dropping into each slot (in #left)
slots.forEach(slot => {
    slot.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    slot.addEventListener("drop", function (e) {
        e.preventDefault();
        if (selected && !slot.querySelector(".list")) {
            slot.appendChild(selected);
            selected = null;
        }
    });
});

// Step 3: Allow dropping bottles back into the right box
rightBox.addEventListener("dragover", function (e) {
    e.preventDefault();
});

rightBox.addEventListener("drop", function (e) {
    e.preventDefault();
    if (selected) {
        rightBox.appendChild(selected);
        selected = null;
    }
});

// Generate random correct order once
let bottleIds = ["water", "maple", "olive", "milk", "bottle"];
let correctOrder = shuffleArray([...bottleIds]); // Copy and shuffle

console.log("Correct Order:", correctOrder); // You can remove this later

// Shuffle helper
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Check order button
document.querySelector(".check-btn").addEventListener("click", function () {
    let slots = document.querySelectorAll(".slot");
    let guessedOrder = [];
    
    slots.forEach(slot => {
        let child = slot.querySelector(".list");
        if (child) {
            guessedOrder.push(child.id);
        } else {
            guessedOrder.push(null); // empty slot
        }
    });

    let correct = 0;
    for (let i = 0; i < correctOrder.length; i++) {
        if (guessedOrder[i] === correctOrder[i]) {
            correct++;
        }
    }

    // Determine message
    let message = "";
    if (correct === 5) {
        message = "You win!";
    } else if (correct >= 3) {
        message = "You're close!";
    } else {
        message = "Try again!";
    }

    // Show result
    document.getElementById("res").innerHTML = `Correct positions: <strong>${correct}/5. </strong>${message}`;
});
