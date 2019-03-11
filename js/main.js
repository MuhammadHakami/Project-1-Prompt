var search=document.querySelectorAll('.row div');
var resButton=document.querySelector('button');
var turn=0;
var score={1:0,2:0};
var stateSpace={0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''};
var winningStates=[0,3];

function reset(event){
    turn=0
    event.preventDefault()
    for (i=0;i<9;i++){
        search[i].style.backgroundImage=null
    }
}

resButton.addEventListener('click',reset);

function remove(){
    for (i=0;i<9;i++){
    search[i].removeEventListener('click',why)
    }
}

function run(){
    function step(i){
    search[i].addEventListener('click',function why(){
        if (search[i].style.backgroundImage){
            console.log('Chosen block')
        } else {
            if (turn%2==0){
                search[i].style.backgroundImage='url(/home/shadows/Documents/wdi4/Project-1-Prompt/assets/x.jpg)';
                search[i].style.backgroundPosition= 'center';
                search[i].style.backgroundSize='cover';
            } else {
                search[i].style.backgroundImage='url(/home/shadows/Documents/wdi4/Project-1-Prompt/assets/o.jpeg)';
                search[i].style.backgroundPosition='center';
                search[i].style.backgroundSize='cover';
            }
            console.log(turn);
            turn+=1;
        }
        for (k=0;k<9;k++){
            if (search[k].style.backgroundImage){
            stateSpace[k]=search[k].style.backgroundImage
            } else {
                stateSpace[k]='None'
            }
        }
        //console.log(stateSpace)
        function match(){
            player=(turn%2===0)?2:1;
            score[player]+=1
            swal(`Player ${player} Won!`, `${score[1]} VS ${score[2]}`, "success");
            document.querySelector('.swal-modal .swal-button-container button').addEventListener('click',reset)
        }
        if ('None'!==stateSpace[0] & stateSpace[0]===stateSpace[1] & stateSpace[0]===stateSpace[2]){
            match()
        } else if ('None'!==stateSpace[0] & stateSpace[0]===stateSpace[3] & stateSpace[0]===stateSpace[6]){
            match()
        } else if ('None'!==stateSpace[0] & stateSpace[0]===stateSpace[4] & stateSpace[0]===stateSpace[8]){
            match()
        } else if ('None'!==stateSpace[4] & stateSpace[4]===stateSpace[1] & stateSpace[4]===stateSpace[7]){
            match()
        } else if ('None'!==stateSpace[4] & stateSpace[4]===stateSpace[3] & stateSpace[4]===stateSpace[5]){
            match()
        } else if ('None'!==stateSpace[8] & stateSpace[8]===stateSpace[7] & stateSpace[8]===stateSpace[6]){
            match()
        } else if ('None'!==stateSpace[8] & stateSpace[8]===stateSpace[5] & stateSpace[8]===stateSpace[2]){
            match()
        }
        })
    }
    for (i=0;i<9;i++){
        step(i)
    }
}



run();


