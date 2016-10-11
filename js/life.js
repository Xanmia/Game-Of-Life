var GameOfLife = function (canvas, x, y, w, h, colors) {
	this.cellArray = [];
	this.NewcellArray = [];
	this.cellSize = 5;
	this.canvas = canvas;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	this.backColor = '#36bdfc';
	this.foreColor = '#73defc';

	if (colors) {
		this.backColor = colors.back;
		this.foreColor = colors.fore;
	}

	this.lifespan = 2;//Math.random()*(2-1)+1;
	this.ttl = this.lifespan;

	//this.lives = 0;
	this.init();
	/////initial layout of the array/cell life

}

GameOfLife.prototype.init = function () {
	this.lives = 0;
	for (var y = 0; y < this.height;) {
		this.cellArray[y / this.cellSize] = [];
		for (var x = 0; x < this.width;) {
			if (Math.random() * 100 > 70) {
				this.cellArray[y / this.cellSize][x / this.cellSize] = 1;
			}
			else {
				this.cellArray[y / this.cellSize][x / this.cellSize] = 0;
			}
			x += this.cellSize;
		}
		y += this.cellSize;
	}
}

GameOfLife.prototype.update = function () {
	if (this.ttl > this.lifespan) {
		this.canvas.fillStyle = this.backColor;
		this.canvas.fillRect(this.x, this.y, this.width, this.height);
		//this.canvas.clearRect(this.x,this.y,this.width,this.height);
		this.NewcellArray = [];
		//if (this.lives === 3){this.init();}
		for (var y = 0; y < this.height;) {
			this.NewcellArray[y / this.cellSize] = [];
			for (var x = 0; x < this.width;) {
				if (this.cellArray[y / this.cellSize][x / this.cellSize]) {///draw where ever you are drawing
					this.canvas.fillStyle = this.foreColor;
					this.canvas.fillRect(this.x + x, this.y + y, this.cellSize, this.cellSize);

				}
				this.checkRules({ x: x, y: y });

				x += this.cellSize;
			}
			y += this.cellSize;
		}
		this.cellArray = this.NewcellArray;
		//this.lives+=1;
		this.ttl = 0;
	}
	this.ttl++;
}

GameOfLife.prototype.checkRules = function (s) {
	var current = this.cellArray[s.y / this.cellSize][s.x / this.cellSize];

	var lives = 0;

	if (this.cellArray[(s.y / this.cellSize) - 1] != undefined && this.cellArray[(s.y / this.cellSize) - 1][(s.x / this.cellSize) - 1] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize) - 1][(s.x / this.cellSize) - 1];
	}
	if (this.cellArray[(s.y / this.cellSize)] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) - 1] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) - 1];
	}
	if (this.cellArray[(s.y / this.cellSize) + 1] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize)] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize) + 1][(s.x / this.cellSize)];
	}
	if (this.cellArray[(s.y / this.cellSize)] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) + 1] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) + 1];
	}
	if (this.cellArray[(s.y / this.cellSize) - 1] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize)] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize) - 1][(s.x / this.cellSize)];
	}
	if (this.cellArray[(s.y / this.cellSize) - 1] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) + 1] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize) - 1][(s.x / this.cellSize) + 1];
	}
	if (this.cellArray[(s.y / this.cellSize) + 1] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) - 1] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize) + 1][(s.x / this.cellSize) - 1];
	}
	if (this.cellArray[(s.y / this.cellSize) + 1] != undefined && this.cellArray[(s.y / this.cellSize)][(s.x / this.cellSize) + 1] != undefined) {
		lives += this.cellArray[(s.y / this.cellSize) + 1][(s.x / this.cellSize) + 1];
	}


	if (current) {
		if (lives == 2 || lives == 3) {
			this.NewcellArray[s.y / this.cellSize][s.x / this.cellSize] = 1;
		}
		else {
			this.NewcellArray[s.y / this.cellSize][s.x / this.cellSize] = 0;
		}
	}
	else if (lives == 3) {
		this.NewcellArray[s.y / this.cellSize][s.x / this.cellSize] = 1;
	}
	else {
		this.NewcellArray[s.y / this.cellSize][s.x / this.cellSize] = 0;
	}

}