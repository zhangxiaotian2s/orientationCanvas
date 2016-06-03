function imgArrShow(imgarr) {
	this.width = document.body.clientWidth > 640 ? 640 : document.body.clientWidth;
	this.height = this.width;
	this.box = document.getElementById('detail-canvasbox')
	this.canvas = document.getElementById('canvas');
	this.canvasbk = document.getElementById('canvasbk');
	this.ctx = this.canvas.getContext('2d');
	this.ctxbk=this.canvasbk.getContext('2d');
	this.imgarr = imgarr;
	this.imglength = this.imgarr.length;
	this.loadimgsrc = 'http://7xl619.com1.z0.glb.clouddn.com/load.gif?10010'
	this.loadingbox = document.querySelector('#loadingbox')
	this.boolmobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
	this.showindex = null
	this.timer = null;
};
var imgArrShowPropty = imgArrShow.prototype
imgArrShowPropty.init = function() {
	var self = this;
	self.canvas.setAttribute('width', self.width + 'px');
	self.canvas.setAttribute('height', self.height + 'px');
	self.canvasbk.setAttribute('width', self.width + 'px');
	self.canvasbk.setAttribute('height', self.height + 'px');
	self.loadWait(true)
	self.loadAllImg();
	self.drawArrImg(0)
	if (Boolean(self.boolmobile)) {
		self.mobileDirection()
	} else {
		self.pcMouseMove()
	}
};
//加载缓存所有图片，
imgArrShowPropty.loadAllImg = function() {
	var self = this;
	var _index = 1;
	for (var i = 0; i < self.imglength; i++) {
		var _img = new Image;
		_img.src = self.imgarr[i];
		_img.onload = function() {
			_index++;
			if (_index >= self.imglength) {
				self.loadWait(false)
			}
		}
	}
};
//手机端处理
imgArrShowPropty.mobileDirection = function() {
	var self = this;
	window.addEventListener("deviceorientation", function(e) {
		//					      e.gamma //横向翻转
		var _gamma = Math.ceil(e.gamma + 90);
		var _index = Math.floor(_gamma / ((180) / self.imglength));
		self.drawArrImg(_index);
	}, false)
};
//pc端处理
imgArrShowPropty.pcMouseMove = function() {
	var self = this;
	self.box.addEventListener('mousemove', function(e) {
		console.log(this.offsetLeft)
		var _position_x = e.pageX - this.parentElement.offsetLeft;
		_position_x < 0 ? 0 : _position_x;
		var _index = Math.floor(_position_x / (self.width / self.imglength));
		self.drawArrImg(_index);
	}, false)
};
// loading 状态处理
imgArrShowPropty.loadWait = function(bool) {
	var _bool = Boolean(bool);
	var self = this;
	if (_bool) {
		//		var _img = new Image;
		//		_img.src = self.loadimgsrc;
		//		_img.onload = function() {
		//			self.ctx.drawImage(_img, (self.width / 2 - 60), (self.height / 2 - 60))
		//		}
		self.loadingbox.style.display = 'block'
	} else {
		//		self.ctx.clearRect(0, 0, self.width, self.height)
		//		self.drawArrImg(Math.floor(self.imgarr.length) / 2)
		self.loadingbox.style.display = 'none'
			//		self.drawArrImg(Math.floor(self.imgarr.length) / 2)
		self.drawArrImg(0)
	}
};
//drawimg 图片进入画布
imgArrShowPropty.drawArrImg = function(index) {
	var self = this;
	if (index < 0) {
		index = 0;
	}
	var _imgbk = new Image();
	   _imgbk = self.imgarr[self.showindex || index]
	if (self.showindex != index) {
		self.showindex = index;
		var _img = new Image();
		_img.src = self.imgarr[index];
		_img.onload = function() {
			clearInterval(self.timer)
			var _img_w = self.width;
			var _img_h = Math.floor((self.width / _img.width) * _img.height);
			self.ctx.clearRect(0, 0, self.width, self.height);
			self.ctx.drawImage(_img, 0, 0, _img_w, _img_h);
			self.ctxbk.drawImage(_img, 0, 0, _img_w, _img_h);
			
		}
	}
};
