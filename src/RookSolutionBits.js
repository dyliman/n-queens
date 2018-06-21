var RookBoard = function(n){
  this.n = n;
  this.boardSize = Math.pow(2,n-1);
  this.board = new Array(n).fill(0);
  this.solutions = 0;
}

RookBoard.prototype.checkH = function(){
var rows = this.n
var noConflict = 0;
this.board.forEach(function(value){
  for(var i = 0; i < rows; i++){
    if(value === 0){
      noConflict += 1;
      break;
    }else if(value === Math.pow(2,i)){
      noConflict += 1;
      break;
    }
  }
})
if (noConflict === this.n){
  return false;
}
return true
}

RookBoard.prototype.checkV = function(){
for(var i = 0; i < this.n; i++){
  for(var j = i+1; j < this.n; j++){
    if((this.board[i] & this.board[j]) !== 0){
      return true
    }
  }
}
return false
}

RookBoard.prototype.checkR = function(){
if(this.checkH() === true || this.checkV() === true){
  return true;
}
return false
}

RookBoard.prototype.numberOfSolutions = function(row){
    row = row || 0;

    if(row === this.n){
      this.solutions++;
    }else{
      for(var expo = 0; expo < this.n; expo++){
      this.board[row] = Math.pow(2,expo);
        if(!this.checkR()){
          this.numberOfSolutions(row+1);
        }
      this.board[row] = 0;
      }
    }
}

var newBoard = new RookBoard(10);
newBoard.numberOfSolutions()
console.log(newBoard.solutions)
