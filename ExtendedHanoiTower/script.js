const rods = {
 A : document.getElementById("A"), 
 B : document.getElementById("B"),
 C : document.getElementById("C"),
};

const start = document.getElementById("start");
const pause = document.getElementById("pause");
const restart = document.getElementById("restart");
const end = document.getElementById("end");
const nextStep = document.getElementById("nextStep");

const moves =[];

function hanoi(from,via,to,n){
    if(n===1){
        moves.push([from,to]);
        return;
    }
    hanoi(from,to,via,n-1);
    // hanoi(from,via,to,1);
    moves.push([from,to]);
    hanoi(via,from,to,n-1);    
}

function recordMoves(from,via,to,n){
    console.log(from,via,to,n);
    if(n==1){
        moves.push([to,via]);
        moves.push([from,to]);
        // hanoi(via,from,to,2);
        moves.push([via,from]);
        moves.push([via,to]);
        moves.push([from,to]);
        return;
    }else{
        recordMoves(from,via,to,n-1);
        hanoi(to,from,via,3*n-2);
        // hanoi(from,via,to,1);
        moves.push([from,to]);
        hanoi(via,from,to,3*n-1);
    }
}

let time;
(() =>{
    const n = window.prompt("please enter the number of disks :");
    time= window.prompt("please enter time (ms) ")
    const disks=[];
    for(let i=0;i<3*n;i++){
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.style.width = `calc(3.5rem + ${3*n-i}rem)`;
        disks.push(disk);
    }
    for(let i=3*n-1;i>=0;i--){
        if(i%3==0){
            rods["A"].appendChild(disks[i]);
        }
        if(i%3==1){
            rods["B"].appendChild(disks[i]);
        }
        if(i%3==2){
            rods["C"].appendChild(disks[i]);
        }
    }
    recordMoves("A","B","C",n);     
})();

function moveDisk(from, to){
    console.log("from : ", from , " to : ", to)
    const fromEl = rods[from];
    const toEl = rods[to];

    const disk = fromEl.firstChild;           
    toEl.insertBefore(disk, toEl.firstChild);                      
}

start.addEventListener("click", ( ) =>{
    start.disabled = true;
    const myInterval = setInterval(() =>{
        if(moves.length === 0){
            return;
        }
        const[from, to] = moves.shift();
        moveDisk(from,to);
    },time)

    pause.addEventListener("click", () => {
        clearInterval(myInterval);
        start.disabled = false;
    })
})

end.addEventListener("click",()=>{
    
    start.disabled = false;
    while(moves.length >=0){
        const[from, to] = moves.shift();
        moveDisk(from,to);
    }
})

nextStep.addEventListener("click",()=>{
    if(moves.length >= 0){
        const[from,to] = moves.shift();
        moveDisk(from,to);
    }
})

restart.addEventListener("click",()=>{
    window.location.reload();
})