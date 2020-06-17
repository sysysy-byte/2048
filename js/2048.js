var numberArr = new Array();
var score = 0;

window.onload = function(){
	document.getElementById('score').innerText = 0;
	
	newgrame();
	
	var newgamebutton = document.getElementById('newgamebutton');
	newgamebutton.onclick = function(){
		score = 0;
		document.getElementById('score').innerText = 0;
		newgrame();
	}
}

function newgrame(){
	score = 0;
	//清空原有的棋盘区域
	removeAll();
	//棋盘格的初始化
	initGridCell();
	//数字格的初始化
	initNumberCell();
	//在两个随机位置生成两个随机数字（2，4）
	getRandNumber();
	getRandNumber();
	
	// showNumber()
}
//棋盘格的初始化
function initGridCell(){
	var grid_container = document.getElementById('grid_container');
	
	for(var i = 0;i<4; i++){
		for(var j=0; j<4; j++){
			var gird_cell = document.createElement('div');
			gird_cell.setAttribute('class','gird_cell');
			grid_container.appendChild(gird_cell);
			gird_cell.style.left =20+120*j+"px";
			gird_cell.style.top =20+120*i+"px";
		}
	}
	//初始化游戏数据
	for(var i=0;i<4;i++){
		numberArr[i] = new Array();
		for(var j=0;j<4;j++){
			numberArr[i][j] = 0;
		}
	}
}
//数字格的初始化
function initNumberCell(){
	var grid_container = document.getElementById('grid_container');
	// console.log(grid_container);
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var number_cell = document.createElement('div');
			number_cell.setAttribute('class','number_cell');
			
			number_cell.setAttribute('id','number_cell-'+i+'-'+j);
			
			grid_container.appendChild(number_cell);
			number_cell.style.left =20+120*j+"px";
			number_cell.style.top =20+120*i+"px";
			// number_cell.style.background ="#FF0";
			// number_cell.innerText = numberArr[i][j];
		}
	}
}

//显示游戏数据到数字格上
function showNumber(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var number_cell = document.getElementById('number_cell-'+i+'-'+j);
			// console.log(number_cell);
			if(numberArr[i][j]==0){
				number_cell.style.display = 'none';
			}else{
				number_cell.style.display = 'block';
				number_cell.style.background = setBgColor(numberArr[i][j]);
				number_cell.style.color = setColor(numberArr[i][j]);
				number_cell.innerText = numberArr[i][j];
				if(numberArr[i][j]>=1024){
					number_cell.style.fontSize = "45px";
				}else{
					number_cell.style.fontSize = "60px";
				}
			}
		}
	}
}

//在两个随机位置生成两个随机数字（2，4）
function getRandNumber(){
	
	//是否存在空的位置
	if(hasEmptyPosition() == true){
		//生成随机位置
		var randx = parseInt(Math.floor(Math.random()*4));
		var randy = parseInt(Math.floor(Math.random()*4));
		
		while(true){
			if(numberArr[randx][randy] == 0){
				break;
			}else{
				randx = parseInt(Math.floor(Math.random()*4));
				randy = parseInt(Math.floor(Math.random()*4));
			}
		}
		//生成随机数字
		var randNumber = Math.random()<0.5?2:4;
		numberArr[randx][randy] = randNumber;
		
		// console.log(randx,randy,randNumber)
		showNumber();
	}
}

//清空原有棋盘区域
function removeAll(){
	var grid_container = document.getElementById('grid_container');
	// console.log(ggrid_container);
	var nodes = grid_container.childNodes;
	for(var i =nodes.length-1; i>=0; i--){
		grid_container.removeChild(nodes[i]);
	}
}

//2048游戏的上下左右移动控制
document.onkeydown = function(ev){
	// console.log(ev.keyCode);
	
	switch(ev.keyCode){
		
		case 37: //left
				moveLeft();
				getRandNumber();
				isGamenOver();
				break;
		case 38: //up
				moveUp();
				getRandNumber();
				isGamenOver();
				break;
		case 39: //right
				moveRight();
				getRandNumber();
				isGamenOver();
				break;
		case 40: //down
				moveDown();
				getRandNumber();
				isGamenOver();
				break;
	}
}

function moveLeft(){
	//是否能够向左移动
	if(canMoveLeft() == true){
		for(var i=0; i<4; i++){
			for(var j=1; j<4; j++){
				if(numberArr[i][j] != 0){
					for(var k=0; k<j; k++){
						if(numberArr[i][k] == 0 && hasObstacleRow(i,k,j,numberArr)){
							//可以移动
							numberArr[i][k] = numberArr[i][j];
							numberArr[i][j] = 0;
						}else if(numberArr[i][k] == numberArr[i][j] && hasObstacleRow(i,k,j,numberArr)){
							//可以移动
							numberArr[i][k] += numberArr[i][j];
							score += numberArr[i][k];
							document.getElementById('score').innerText = score;
							numberArr[i][j] = 0;
						}
					}
				}
			}
		}
		return true;
	}
	return false;
}
function moveUp(){
	//是否能够向上移动
	if(canMoveUp() == true){
		for(var i=1; i<4; i++){
			for(var j=0; j<4; j++){
				if(numberArr[i][j] != 0){
					for(var k=0; k<i; k++){
						if(numberArr[k][j] == 0 && hasObstacleCol(j,k,i,numberArr)){
							//可以移动
							numberArr[k][j] = numberArr[i][j];
							numberArr[i][j] = 0;
						}else if(numberArr[k][j] == numberArr[i][j] && hasObstacleCol(j,k,i,numberArr)){
							//可以移动
							numberArr[k][j] += numberArr[i][j];
							score += numberArr[k][j];
							document.getElementById('score').innerText = score;
							numberArr[i][j] = 0;
						}
					}
				}
			}
		}
		return true;
	}
	return false;
}
function moveRight(){
	//是否能够向右移动
	if(canMoveRight() == true){
		for(var i=0; i<4; i++){
			for(var j=2; j>=0; j--){
				if(numberArr[i][j] != 0){
					for(var k=3; k>j; k--){
						if(numberArr[i][k] == 0 && hasObstacleRow(i,j,k,numberArr)){
							//可以移动
							numberArr[i][k] = numberArr[i][j];
							numberArr[i][j] = 0;
						}else if(numberArr[i][k] == numberArr[i][j] && hasObstacleRow(i,j,k,numberArr)){
							//可以移动
							numberArr[i][k] += numberArr[i][j];
							score += numberArr[i][k];
							document.getElementById('score').innerText = score;
							numberArr[i][j] = 0;
						}
					}
				}
			}
		}
		return true;
	}
	return false;
}
function moveDown(){
	//是否能够向下移动
	if(canMoveDown() == true){
		for(var i=2; i>=0; i--){
			for(var j=0; j<4; j++){
				if(numberArr[i][j] != 0){
					for(var k=3; k>i; k--){
						if(numberArr[k][j] == 0 && hasObstacleCol(j,i,k,numberArr)){
							//可以移动
							numberArr[k][j] = numberArr[i][j];
							numberArr[i][j] = 0;
						}else if(numberArr[k][j] == numberArr[i][j] && hasObstacleCol(j,i,k,numberArr)){
							//可以移动
							numberArr[k][j] += numberArr[i][j];
							score += numberArr[k][j];
							document.getElementById('score').innerText = score;
							numberArr[i][j] = 0;
						}
					}
				}
			}
		}
		return true;
	}
	return false;
	
}
function isGamenOver(){
	//没有空位置并且不能向上下左右移动
	if(hasEmptyPosition() == false
		&&canMoveLeft() == false
		&&canMoveRight() == false
		&&canMoveUp() == false
		&&canMoveDown() == false){
			alert("Game Over");
		}
}

//设置数字格背景颜色
function setBgColor(number){
	switch(number){
		case 2:    return "#eee4da"; break;
		case 4:    return "#ece0c8"; break;
		case 8:    return "#f2b179"; break;
		case 16:   return "#f59563"; break;
		case 32:   return "#f67c5f"; break;
		case 64:   return "#f65e3b"; break;
		case 128:  return "#edcf72"; break;
		case 256:  return "#edcc61"; break;
		case 512:  return "#9c0";    break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#09c";    break;
		case 4096: return "#a6c";    break;
		case 8192: return "#93c";    break;
	}
}

//设置数字格字体颜色
function setColor(number){
	if(number<=4){
		return "#776E65";
	}else{
		return "#FFF";
	}
}

//判断是否存在空位
function hasEmptyPosition(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(numberArr[i][j] == 0){
				return true;
			}
		}
	}
	return false;
}

//判断是否能够左移
function canMoveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(numberArr[i][j-1] == 0 || numberArr[i][j-1] == numberArr[i][j]){
				return true;
			}
		}
	}
	return false;
}

//判断是否能够向右移动
function canMoveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(numberArr[i][j+1] == 0 || numberArr[i][j+1] == numberArr[i][j]){
				return true;
			}
		}
	}
	return false;
}

//判断是否能够向上移动
function canMoveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(numberArr[i-1][j] == 0 || numberArr[i-1][j] == numberArr[i][j]){
				return true;
			}
		}
	}
	return false;
}

//判断是否能够向下移动
function canMoveDown(){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(numberArr[i+1][j] == 0 || numberArr[i+1][j] == numberArr[i][j]){
				return true;
			}
		}
	}
	return false;
}

//判断行方向上是否存在障碍物
function hasObstacleRow(row,col1,col2,numberArr){
	for(var i=col1+1; i<col2; i++){
		if(numberArr[row][i] != 0){
			return false;
		}
	}
	return true;
}

//判断列方向上是否有障碍物
function hasObstacleCol(col,row1,row2,numberArr){
	for(var i=row1+1; i<row2; i++){
		if(numberArr[i][col] != 0){
			return false;
		}
	}
	return true;
}