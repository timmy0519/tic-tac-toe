function singleBoard(i,j,board){
    let activate_status = false; 
    let activate_player = 0;
    let ret  = {}
    const div = document.createElement('div');
    div.classList.add("subBoard");
    div.id = `${i}_${j}`;
    div.addEventListener("mouseenter",()=>{
        if(activate_status==true)
            return;
        if(board.getPlayerRound()==0){
            div.classList.add('playerOneBoardHover')
        }else{
            div.classList.add('playerTwoBoardHover')
        }
    })
    div.addEventListener("mouseleave",()=>{
        if(board.getPlayerRound()==0){
            div.classList.remove('playerOneBoardHover')
        }else{
            div.classList.remove('playerTwoBoardHover')
        }
    })
    div.addEventListener("click",()=>{
        if(board.subBoard[i][j].activate_status == true){
            console.log(activate_status)
            return;
        }    
        if(board.getPlayerRound()==0){
            div.classList.remove('playerOneBoardHover')
            div.classList.add('playerOneBoard')
        }else{
            div.classList.remove('playerTwoBoardHover')
            div.classList.add('playerTwoBoard')
        }
        // board.subBoard[i][j].activate_status = true
        ret.activate_status = true;
        ret.activate_player = board.getPlayerRound();
        // todo check
        
        // console.log(div.classList == subBoard[i][j].div.classList)
        board.checkRound(i,j);
        board.changePlayer()
    })
    
    function reset(){
        this.activate_status = false; 
        this.activate_player = 0;
    }
    return Object.assign(ret,{div,activate_status,activate_player,reset,board});
}
let board = (() =>{
    const size = 3;
    let currentRound =0;
    let publicBoard = {};
    let boardDiv = document.querySelector("#board");
    let subBoard = [];
    for(let i=0; i<size;i++){
        subBoard[i] = [];
        for(let j=0; j<size;j++){
            let curPos = singleBoard(i,j,publicBoard);
            subBoard[i][j] = curPos;
            boardDiv.appendChild(curPos.div);
        }
    }

    let playerRound = 0;
    let resetBoard = ()=>{
        // clear class
        currentRound = 0;
        for(let row of subBoard){
            for(let j in row){
                row[j].div.classList = ['subBoard']
                row[j].reset()
            }
        }
    }
    function checkRound(x,y){
        let colLine = true;
        for(let i=0;i<size;i++){
            if(!subBoard[i][y].activate_status || subBoard[i][y].activate_player!=playerRound){
                colLine = false;
                break;
            }
        }
        let rowLine = true;
        for(let j=0;j<size;j++){
            if(!subBoard[x][j].activate_status || subBoard[x][j].activate_player!=playerRound){
                rowLine = false;
                break;
            }
        }
        let rl = true;
        for(let i=0;i<size;i++){
            if(!subBoard[0+i][2-i].activate_status || subBoard[0+i][2-i].activate_player!=playerRound){
                rl = false;
                break;
            }
        }
        let lr = true;
        for(let i=0;i<size;i++){
            if(!subBoard[0+i][0+i].activate_status || subBoard[0+i][0+i].activate_player!=playerRound){
                lr = false;
                break;
            }
        }
        let win = colLine || rowLine || lr || rl;
        // console.log(rowLine)
        if (win){
            endGame(playerRound);
        }
    }
    function endGame(whoWin){
        alert(`Player${whoWin+1} wins!`)
        resetBoard();
    }
    let changePlayer = ()=>{
        playerRound = (playerRound+1)%2;
        currentRound+=1;
        if(currentRound==9){
            alert("Draw.")
            resetBoard();
        }
    }
    let getPlayerRound =()=>{
        return playerRound;
    }
    return Object.assign(publicBoard,{subBoard,boardDiv,getPlayerRound,changePlayer,resetBoard,checkRound});
})()

let resetBut = document.querySelector("#reset")
resetBut.addEventListener("click",()=>{
    board.resetBoard();
})
