var QueenBoard = function(n){
  this.n = n;
  this.boardSize = Math.pow(2,n-1);
  this.board = new Array(n).fill(0);
  this.solutions = 0;
}

QueenBoard.prototype.checkH = function(){
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

QueenBoard.prototype.checkV = function(){
for(var i = 0; i < this.n; i++){
  for(var j = i+1; j < this.n; j++){
    if((this.board[i] & this.board[j]) !== 0){
      return true
    }
  }
}
return false
}

QueenBoard.prototype.checkDM = function(){
for(var i = 0; i < this.n; i++){
  var shift = 1;
  for(var j = i+1; j < this.n; j++){
    if((this.board[i] & (this.board[j] << shift)) !== 0){
      return true
    }
    shift++;
  }
}
return false
}

QueenBoard.prototype.checkDm = function(){
for(var i = 0; i < this.n; i++){
  var shift = 1;
  for(var j = i+1; j < this.n; j++){
    if((this.board[i] & (this.board[j] >> shift)) !== 0){
      return true
    }
    shift++;
  }
}
return false
}


QueenBoard.prototype.checkQ = function(){
if(this.checkH() === true || this.checkV() === true || this.checkDM() === true || this.checkDm() === true){
  return true;
}
return false
}

QueenBoard.prototype.numberOfSolutions = function(row){
    row = row || 0;

    if(row === this.n){
      this.solutions++;
    }else{
      for(var expo = 0; expo < this.n; expo++){
      this.board[row] = Math.pow(2,expo);
        if(!this.checkQ()){
          this.numberOfSolutions(row+1);
        }
      this.board[row] = 0;
      }
    }
}

var newBoard = new QueenBoard(16);
// newBoard.board[3] = 1;
// newBoard.board[4] = 2;
// newBoard.board[5] = 4;
// console.log(newBoard.board)
// console.log(newBoard.checkQ())
newBoard.numberOfSolutions()
console.log(newBoard.solutions) //92
