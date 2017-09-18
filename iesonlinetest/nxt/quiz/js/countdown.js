function countdown(){
	this.start_time = "30:00";
	this.target_id = "#timer"
}

countdown.prototype.init = function(){
	this.reset();
	setInterval(this.name + '.tick',1000);
}

countdown.prototype.reset = function(){
	time = this.start_time.split(":");
	this.minutes = parseInt(time[0]);
	this.seconds = parseInt(time[1] + 1);
	this.update_target();
}

countdown.prototype.tick = function(){
	if(this.seconds > 0 || this.minutes > 0){
		this.seconds = this.seconds - 1;
	}
	if(this.seconds = 0){
		this.minutes -=  1;
		this.seconds = 59;
	}
	this.update_target()
	
}
countdown.prototype.update_target = function(){
	seconds = this.seconds;
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	$(this.target_id).val(this.minutes + ":" + seconds);
}