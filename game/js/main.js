// Defining varaibles
var search=document.querySelectorAll('.row div');
var resButton=document.querySelector('button');
var turn=0;
var score={1:0,2:0};
var stateSpace={0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''};
var winningStates=[0,3];
var playerx=document.querySelector('#playerx');
var playero=document.querySelector('#playero');
var state=[[0.3,0.3,0.3],]

// Making the reset function for the button to reset
function reset(event){
    turn=0
    event.preventDefault()
    for (i=0;i<9;i++){
        // Changing the background into the default values
        search[i].style.backgroundImage=null;
        search[i].style.backgroundPosition='left';
        stateSpace={0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''};
        // Reset the shaking animation and update the shown score
        search[i].className='shake-slow';
        playerx.textContent="Player X: Scored "+score[1];
        playero.textContent="Player O: Scored "+score[2];
    }
}
// Checking the winning requirements
function checkWinningReq(stateSpace,search){
    // Updating the state object
    for (k=0;k<9;k++){
        if (search[k].style.backgroundImage){
        stateSpace[k]=search[k].style.backgroundImage
        } else {
            stateSpace[k]=0
        }
    }
    // The apply the winning effects and increase the score of the winner
    function match(j){
        player=(stateSpace[j]==='url("./assets/x.jpg")')?1:2;
        score[player]+=1
        swal(`Player ${player} Won!`, `${score[1]} VS ${score[2]}`, "success");
        // Reseting the game
        document.querySelector('.swal-modal .swal-button-container button').addEventListener('click',reset)
        document.querySelector('body > div').addEventListener('click',reset)
        turn=0
    }
    // Check the winning conditions
    if (0!==stateSpace[0] & stateSpace[0]===stateSpace[1] & stateSpace[0]===stateSpace[2]){
        match(0)
    } else if (0!==stateSpace[0] & stateSpace[0]===stateSpace[3] & stateSpace[0]===stateSpace[6]){
        match(0)
    } else if (0!==stateSpace[0] & stateSpace[0]===stateSpace[4] & stateSpace[0]===stateSpace[8]){
        match(0)
    } else if (0!==stateSpace[4] & stateSpace[4]===stateSpace[1] & stateSpace[4]===stateSpace[7]){
        match(4)
    } else if (0!==stateSpace[4] & stateSpace[4]===stateSpace[3] & stateSpace[4]===stateSpace[5]){
        match(4)
    } else if (0!==stateSpace[4] & stateSpace[4]===stateSpace[2] & stateSpace[4]===stateSpace[6]){
        match(4)
    } else if (0!==stateSpace[8] & stateSpace[8]===stateSpace[7] & stateSpace[8]===stateSpace[6]){
        match(8)
    } else if (0!==stateSpace[8] & stateSpace[8]===stateSpace[5] & stateSpace[8]===stateSpace[2]){
        match(8)
    }
}

// Add event listener for the reset button
resButton.addEventListener('click',reset);

// Making the game function
function run(){
    // Making function for the one step in game
    function step(i){
    // Add the event listener for the blocks of tic tac toe
    search[i].addEventListener('click',function why(){
        // Check if the clicked block already chosen
        if (search[i].style.backgroundImage){
            console.log('Chosen block')
        } else {
            // Change the background and remove the skaking effect of the clicked block
            search[i].style.backgroundImage='url(./assets/x.jpg)';
            search[i].style.backgroundPosition= 'center';
            search[i].style.backgroundSize='cover';
            search[i].className=null;
            // Update the current state
            stateSpace[i]=search[i].style.backgroundImage;
            // Make a placeholder to hold all possible available states for the bot
            let placeHolder=[];
            for (let key in stateSpace){
                if (!stateSpace[key] & key !== i){
                    placeHolder.push(key);
                }
            }
            // Randomize the action of the bot
            let n=placeHolder[Math.floor(Math.random()*placeHolder.length)];
            console.log(i+"|||"+placeHolder);
            // In-case all the blocks in tic tac toe has been taken reset the game
            (n===undefined)?reset(event):1;
            // Else let the bot chose a random action
            if (n!==undefined){
            search[n].style.backgroundImage='url(./assets/o.jpeg)';
            search[n].style.backgroundPosition='center';
            search[n].style.backgroundSize='cover';
            search[n].className=null;
            // Check if the winning requirments is met
            checkWinningReq(stateSpace,search);
            }
        }
        })
    }
    // Loop through the function indefinitely waiting for the the click
    for (i=0;i<9;i++){
        step(i)
    }
}

// Run the function
run();