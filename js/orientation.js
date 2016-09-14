function imgArrShow(imgarr, angle) {
	this.width = document.body.clientWidth > 640 ? 640 : document.body.clientWidth;
	this.height = this.width;//默认
	this.canvas = document.getElementById('canvas');
	this.promptmes = document.getElementById('canvas-prompt-text');
	this.ctx = self.canvas.getContext('2d');
	this.imgarr = imgarr;
	this.angle = parseInt(angle) || 23;
	this.imglength = this.imgarr.length;
	this.loadimgsrc = 'http://7xl619.com1.z0.glb.clouddn.com/load.gif?10010'
	this.loadingbox = document.querySelector('#loadingbox')
	this.boolmobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
	this.showindex = 0
};
var imgArrShowPropty = imgArrShow.prototype
imgArrShowPropty.init = function() {
	var self = this
	self.setInit()//重新设置 canvas 高度并后续
	
	
	if(Boolean(self.boolmobile)) {
		self.promptmes.innerText = '←左右倾斜手机观看动效→';
		self.mobileDirection()
	} else {
		self.promptmes.innerText = '←左右滑动鼠标观看动效→';
		self.pcMouseMove()
	}
};
//提取第一张图片 来获取canvas 应该设置的高度
imgArrShowPropty.setInit=function(){
	var self=this;
	var _img=new Image();
	 _img.src=self.imgarr[0];
	 _img.onload=function(){
	     	self.height=Math.floor(_img.height*(self.width/_img.width))
//	     	console.log(self.height)
	     	//设置canvas 宽高
	     	self.canvas.setAttribute('width', self.width + 'px');
         	self.canvas.setAttribute('height', self.height + 'px');
         	//设置提示的位置
         	self.promptmes.style.top=(self.height/2-20)+'px';
         	//显示 loading 加载图片
         	self.loadWait(true)
	        self.loadAllImg();
	        
	 }
};
//加载缓存所有图片，
imgArrShowPropty.loadAllImg = function() {
	var self = this;
	var _index = 1;
	for(var i = 0; i < self.imglength; i++) {
		var _img = new Image;
		_img.src = self.imgarr[i];
		_img.onload = function() {
			_index++;
			if(_index >= self.imglength) {
				self.promptmes.style.display = 'block'
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
		var _gamma = Math.ceil(e.gamma + self.angle);
		_gamma = _gamma < 0 ? 0 : _gamma;
		_gamma = _gamma > self.angle * 2 ? self.angle * 2 : _gamma;
		var _index = Math.floor(_gamma / (self.angle * 2 / self.imglength));
		if((_gamma < (self.angle-10) || _gamma > (self.angle+10)) && (self.promptmes.style.opacity !== '0')) {
			self.promptmes.style.webkitTransitionDuration = '1s'
			self.promptmes.style.opacity = '0'
		}

		self.drawArrImg(_index);
	}, false)
};
//pc端处理
imgArrShowPropty.pcMouseMove = function() {
	var self = this;
	self.canvas.addEventListener('mousemove', function(e) {
		var _position_x = e.pageX - this.parentElement.offsetLeft;
		_position_x < 0 ? 0 : _position_x;
		var _index = Math.floor(_position_x / (self.width / self.imglength));
		self.drawArrImg(_index);
		if(self.promptmes.style.opacity !== '0') {
			self.promptmes.style.webkitTransitionDuration = '1s';
			self.promptmes.style.opacity = '0';
		}
	}, false)
};
// loading 状态处理
imgArrShowPropty.loadWait = function(bool) {
	var _bool = Boolean(bool);
	var self = this;
	if(_bool) {
		var _loading=self.loadingbox.querySelectorAll('img')[0]
		self.loadingbox.style.display = 'block';
		_loading.style.display='block'
		_loading.style.marginTop=(self.height/2-20)+'px';
	} else {
		self.loadingbox.style.display = 'none'
		self.drawArrImg(Math.floor(self.imgarr.length) / 2)
	}
};
//drawimg 图片进入画布
imgArrShowPropty.drawArrImg = function(index) {
	var self = this;
	if(index < 0) {
		index = 0;
	}
	if(self.showindex != index) {
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
}