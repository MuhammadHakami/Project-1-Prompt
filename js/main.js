var search=document.querySelectorAll('.row div');
var resButton=document.querySelector('button');
var turn=0;
var score={1:0,2:0};
var stateSpace={0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''};
var winningStates=[0,3];
var playerx=document.querySelector('#playerx');
var playero=document.querySelector('#playero');

function reset(event){
    //document.querySelector('.playerx').innerHTML(`Player X: Scored ${score[1]}`)
    //document.querySelector('.playero').innerHTML(`Player O: Scored ${score[2]}`)
    turn=0
    event.preventDefault()
    for (i=0;i<9;i++){
        search[i].style.backgroundImage=null;
        search[i].style.backgroundPosition='left';
        stateSpace={0:'',1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:''};
        search[i].className='shake-slow';
        playerx.textContent="Player X: Scored "+score[1];
        playero.textContent="Player O: Scored "+score[2];
    }
}

function checkWinningReq(stateSpace,search){
    for (k=0;k<9;k++){
        if (search[k].style.backgroundImage){
        stateSpace[k]=search[k].style.backgroundImage
        } else {
            stateSpace[k]=0
        }
    }

    function match(j){
        player=(stateSpace[j]==='url("./assets/x.jpg")')?1:2;
        score[player]+=1
        swal(`Player ${player} Won!`, `${score[1]} VS ${score[2]}`, "success");
        document.querySelector('.swal-modal .swal-button-container button').addEventListener('click',reset)
        document.querySelector('body > div').addEventListener('click',reset)
        turn=0
    }
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
            search[i].style.backgroundImage='url(./assets/x.jpg)';
            search[i].style.backgroundPosition= 'center';
            search[i].style.backgroundSize='cover';
            search[i].className=null;
            stateSpace[i]=search[i].style.backgroundImage;
            let placeHolder=[];
            for (let key in stateSpace){
                if (!stateSpace[key] & key !== i){
                    placeHolder.push(key);
                }
            }
            // opponent
            let n=placeHolder[Math.floor(Math.random()*placeHolder.length)];
            console.log(i+"|||"+placeHolder);
            (n===undefined)?reset(event):1;
            if (n!==undefined){
            search[n].style.backgroundImage='url(./assets/o.jpeg)';
            search[n].style.backgroundPosition='center';
            search[n].style.backgroundSize='cover';
            search[n].className=null;
            checkWinningReq(stateSpace,search);
            }
        }
        //console.log(stateSpace)
        })
    }
    for (i=0;i<9;i++){
        step(i)
    }
}



run();


