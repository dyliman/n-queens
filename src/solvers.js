/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var newBoard = new Board({'n':n});

  var search = function(row){

    row = row || 0;
    if(n === row){
      return newBoard.rows();
    }else{
      for(var col = 0; col < n; col++){
        newBoard.togglePiece(row, col);

        if(!newBoard.hasAnyRooksConflicts()){
          return search(row+1);
        }
        newBoard.togglePiece(row, col);
      }
    }
  }

  var solution = search();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
    var newBoard = new Board({'n':n});

  var search = function(row){

    row = row || 0;
    if(n === row){
      solutionCount += 1;
    }else{
      for(var col = 0; col < n; col++){
        newBoard.togglePiece(row, col);

        if(!newBoard.hasAnyRooksConflicts()){
          search(row+1);
        }
        newBoard.togglePiece(row, col);
      }
    }
  }
  search();  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var newBoard = new Board({'n':n});
  var solution = [];
  var search = function(row){
    row = row || 0;
    if(n === row){
      var maybe = newBoard.rows();
      var count = 0;
      for(var i = 0; i < maybe.length; i++){
        for(var j = 0; j < maybe[i].length; j++){
          count += maybe[i][j];
        }
      }
      if(count === n || n=== 0){
        solution.push(newBoard.rows());
        return;
      }
    }else{
      for(var col = 0; col < n; col++){

        newBoard.togglePiece(row, col);

        if(!newBoard.hasAnyQueenConflictsOn(row, col)){
          search(row+1);
          if(solution.length === 1)
            return;
        }
        newBoard.togglePiece(row, col);
      }
    }

  }

  search();

  if(solution[0] === undefined){
    solution[0] = newBoard.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var newBoard = new Board({'n':n});
  var search = function(row){
    row = row || 0;
    if(n === row){
      var maybe = newBoard.rows();
      var count = 0;
      for(var i = 0; i < maybe.length; i++){
        for(var j = 0; j < maybe[i].length; j++){
          count += maybe[i][j];
        }
      }
      if(count === n || n=== 0){
        solutionCount++;
      }
    }else{
      for(var col = 0; col < n; col++){

        newBoard.togglePiece(row, col);

        if(!newBoard.hasAnyQueenConflictsOn(row, col)){
          search(row+1);
        }
        newBoard.togglePiece(row, col);
      }
    }

  }

  search();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
