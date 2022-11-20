var maze2 = {
  start : function(x, y) {
    maze2.size = [x, y];
    maze2.init();
	maze2.make();
  },
  init : function() {
    var x = maze2.size[0];
    var y = maze2.size[1];
	maze2.stack = [];
	maze2.road = [];
    for(var i = 0; i <= x; i ++){
      maze2.road[i] = [];
      for(var j = 0; j <= y; j ++) {
        maze2.road[i][j] = 0;
      }
    }
    maze2.road[1][0] = maze2.road[1][1] = maze2.road[x-1][y] = 1;
 },
  make : function() {
	var cl = [1, 1];
	var mv = [];

	maze2.stack.push([1,1]);
 	while(1) {
		var cnt = 0;
		if (cl[0] - 2 > 0 && !maze2.road[cl[0]-2][cl[1]]) mv[cnt++] = [0, -1];
		if (cl[1] - 2 > 0 && !maze2.road[cl[0]][cl[1]-2]) mv[cnt++] = [1, -1];
		if (cl[0] + 2 < maze2.size[0] && !maze2.road[cl[0]+2][cl[1]]) mv[cnt++] = [0, 1];
		if (cl[1] + 2 < maze2.size[1] && !maze2.road[cl[0]][cl[1]+2]) mv[cnt++] = [1, 1];
		if (!cnt) {
			var ll = maze2.stack.pop();
			if (!maze2.stack.length) break;
			cl[0] = ll[0];
			cl[1] = ll[1];
		} else {
			var ll = mv[parseInt(Math.random()*cnt)];
			cl[ll[0]] += ll[1];
			maze2.road[cl[0]][cl[1]] = 1;
			cl[ll[0]] += ll[1];
			maze2.road[cl[0]][cl[1]] = 1;

			maze2.stack.push([cl[0],cl[1]]);
			if (cl[0] == maze2.size[0] - 1 && cl[1] == maze2.size[1] - 1) maze2.sol = maze2.stack.slice();
		}
	}
  }
}

maze2.start(10,10);
console.log(maze2.road);
console.log(maze2.sol);
