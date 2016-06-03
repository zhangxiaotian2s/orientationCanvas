function imgArrShow(imgarr) {
	this.width = document.body.clientWidth > 640 ? 640 : document.body.clientWidth;
	this.height = this.width;
	this.canvas = document.getElementById('canvas');
	this.ctx = self.canvas.getContext('2d');
	this.imgarr = imgarr;
	this.imglength = this.imgarr.length;
	this.loadimgsrc = 'http://7xl619.com1.z0.glb.clouddn.com/load.gif?10010'
	this.loadingbox = document.querySelector('#loadingbox')
	this.boolmobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
	this.showindex = 0
};
var imgArrShowPropty = imgArrShow.prototype
imgArrShowPropty.init = function() {
	var self = this;
	self.canvas.setAttribute('width', self.width + 'px');
	self.canvas.setAttribute('height', self.height + 'px');
	self.loadWait(true)
	self.loadAllImg();
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
		//	e.gamma //横向翻转
		var _gamma = Math.ceil(e.gamma +45);
		_gamma=_gamma < 0 ? 0 : _gamma;
		_gamma=_gamma > 90 ? 90 : _gamma
		var _index = Math.floor(_gamma / (90/ self.imglength));
		self.drawArrImg(_index);
	}, false)
};
//pc端处理
imgArrShowPropty.pcMouseMove = function() {
	var self = this;
	self.canvas.addEventListener('mousemove', function(e) {
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
		self.loadingbox.style.display = 'block'
	} else {
		self.loadingbox.style.display = 'none'
		self.drawArrImg(Math.floor(self.imgarr.length) / 2)
	}
};
//drawimg 图片进入画布
imgArrShowPropty.drawArrImg = function(index) {
	var self = this;
	if (index < 0) {
		index = 0;
	}
	if (self.showindex != index) {
		self.showindex = index;
		var _img = new Image;
		_img.src = self.imgarr[index];
		_img.onload = function() {
			self.ctx.clearRect(0, 0, self.width, self.height)
			var _img_w = self.width;
			var _img_h = Math.floor((self.width / _img.width) * _img.height);
			self.ctx.drawImage(_img, 0, 0, _img_w, _img_h);
		}
	}
};