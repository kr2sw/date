var maze3 = {
  start : function(x, y, z) {
    maze3.size = [x, y, z];
    maze3.init();
	maze3.make();
  },
  init : function() {
    var x = maze3.size[0];
    var y = maze3.size[1];
    var z = maze3.size[2];
	maze3.stack = [];
	maze3.road = [];
    for(var i = 0; i <= z; i ++){
      maze3.road[i] = [];
      for(var j = 0; j <= y; j ++) {
        maze3.road[i][j] = [];
        for(var k = 0; k <= x; k ++) {
          maze3.road[i][j][k] = 0;
        }
      }
    }
    maze3.road[1][1][0] = maze3.road[1][1][1] = maze3.road[z-1][y-1][x] = 1;
  },
  make : function() {
	var lx = 1, ly = 1, lz = 1;
	var mv = [];

	maze3.stack.push([1,1,1]);
	while(1) {
		var cnt = 0;
		if (lx - 2 > 0 && !maze3.road[lz][ly][lx-2]) mv[cnt++] = [-1, 0, 0];
		if (ly - 2 > 0 && !maze3.road[lz][ly-2][lx]) mv[cnt++] = [0, -1, 0];
		if (lz - 2 > 0 && !maze3.road[lz-2][ly][lx]) mv[cnt++] = [0, 0, -1];
		if (lx + 2 < maze3.size[0] && !maze3.road[lz][ly][lx+2]) mv[cnt++] = [1, 0, 0];
		if (ly + 2 < maze3.size[1] && !maze3.road[lz][ly+2][lx]) mv[cnt++] = [0, 1, 0];
		if (lz + 2 < maze3.size[2] && !maze3.road[lz+2][ly][lx]) mv[cnt++] = [0, 0, 1];
		if (!cnt) {
			var ll = maze3.stack.pop();
			if (!maze3.stack.length) break;
			lx = ll[0];
			ly = ll[1];
			lz = ll[2];
		} else {
			var ll = mv[parseInt(Math.random()*cnt)];
			lx += ll[0];
			ly += ll[1];
			lz += ll[2];
			maze3.road[lz][ly][lx] = 1;
			lx += ll[0];
			ly += ll[1];
			lz += ll[2];
			maze3.road[lz][ly][lx] = 1;

			maze3.stack.push([lx, ly, lz]);
			if (lx == maze3.size[0] - 1 && ly == maze3.size[1] - 1 && lz == maze3.size[2] - 1) maze3.sol = maze3.stack.slice();
		}
	}
  }
}

maze3.start(10,10,4);
console.log(maze3.road);
console.log(maze3.sol);