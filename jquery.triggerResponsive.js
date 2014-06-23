
(function(win,doc,$){

	var resize_response = function(prop){
		this.resizeTimer = false;
		this.point = prop.point;
		this.evname = prop.eventName;
		this.reverse = prop.reverse;
		this.callup = true;
		this.calldown = true;
		this.init();
		this.check();
	};

	resize_response.prototype.init = function(){
		var _this = this;
		$(win).resize(function(){
			if (_this.resizeTimer !== false) {
				clearTimeout(_this.resizeTimer);
			}
			_this.resizeTimer = setTimeout(function() {
				_this.check();
			},this.rate);
		});
	};

	resize_response.prototype.check = function(){
		var _s = win.innerWidth ? win.innerWidth:screen.availWidth ;
		if(_s>this.point){
			if(this.callup) {
				if(this.reverse){
					$(doc).trigger('depart-'+this.evname);
				}else{
					$(doc).trigger('arrive-'+this.evname);
				}
				this.callup = false;
				if(!this.calldown) this.calldown = true;
			}
		}else{
			if(this.calldown) {
				if(this.reverse){
					$(doc).trigger('arrive-'+this.evname);
				}else{
					$(doc).trigger('depart-'+this.evname);
				}
				this.calldown = false;
				if(!this.callup) this.callup = true;
			}
		}
	};

	window.resize_response = resize_response;

})(window,document,jQuery);
