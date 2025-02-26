let boxes = document.querySelectorAll(".box"); // Boxes for O & X
let resetBtn = document.querySelector("#reset-btn"); // Reset Game Button 
let newBtn = document.querySelector("#renew-btn"); // New Game Button
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); // Display of winner 

//winning patterns we will use 2D array 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6 ,7, 8]
];


//enable-boxes to reset game
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

// who's turn player 1 or player 2
let turnO = true;

// track the game draw
let count = 0;

// innerText for both player to understand who's turn will be next    
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false; 
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

//Game draw function
const gameDraw = () => {
    msg.innerText = `Game was a draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


//boxes-disabled after winning
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// show the winner on top
const showWinner = (winner) => {
    msg.innerText = `Congo!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//check winner through there positions
const checkWinner = () => {
    for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
                if(pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                }
            }
    }
};

// added both functionality to the button 
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);