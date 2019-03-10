var search=document.querySelectorAll('.row div');
var reset=document.querySelector('button');
var counter=1; 

reset.addEventListener('click',function(event){
    event.preventDefault()
    for (i=0;i<9;i++){
        search[i].style.backgroundColor=null
    }
})

function run(){
    function step(i){
    search[i].addEventListener('click',function why(){
        if (search[i].style.backgroundColor){
            console.log('Chosen block')
        } else {
            if (counter%2==0){
                search[i].style.backgroundColor='blue';
            } else {
                search[i].style.backgroundColor='red';
            }
            counter+=1;
            console.log(counter);
        }
        })
    }
    for (i=0;i<9;i++){
        step(i)
    }
}

run();
