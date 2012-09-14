(function($){       
	$.fn.extend({   
		fullwidthslide:function(_arg){
			var _this = $(this),
				domName 	= _this.selector,
				container 	= _arg.container,
				imgWidth 	= _arg.singleWidth ,
				timeOut 	= _arg.timeOut,
				slideSpeed 	= _arg.speed || 500,
				prevBtn 	= _arg.prevBtn,
				nextBtn 	= _arg.nextBtn,
				slideFadeTo = _arg.fadeTo ||0.5,
				easeIn 		= _arg.easeIn || "swing" ,  
				easeOut 	= _arg.easeOut || "swing" ,
				$slideBox 	= _this.find(container),
				$slideBoxDOMs = $slideBox.children(),
				childrenNum = $slideBoxDOMs.length,
				slideLeft 	= 0,
				slideLock 	= false,
				allowNext 	= false,
				windowsWidth,
				initLeft,
				timer;

			function initStyle(){

				$slideBox.css({
					width: imgWidth*(childrenNum+1)+"px" //多加一个宽度保险点……
				})

				$slideBoxDOMs.css({
					display: "block",
					float:"left",
					position:"relative"
				})

				$slideBoxDOMs.last().prependTo($slideBox);

			}

			function initWidth(){
				windowsWidth = $(window).width();
				initLeft = windowsWidth/2 -1.5*imgWidth;

				$(domName).css({
					position:"relative",
					overflow:"hidden",
					width: windowsWidth
				})
				
				$slideBox.css({
					marginLeft: initLeft+"px"
				})
			}

			function slideFade(){
				if(slideFadeTo){
					$slideBox.children().stop(true,true).fadeTo(100,slideFadeTo);
					$slideBox.children().eq(1).stop(true,true).fadeTo(100,1);
				}
			}

			function posRelative(){
					$slideBox.children().css({"z-index": "1"});
					$slideBox.children().eq(1).css({"z-index": "100"});
			}

			function autoSlide(){
				if(!slideLock){
						if(!slideLock&&timeOut&&allowNext){
							clearInterval(timer)
						}
						slideLock = true
						$slideBox.children().css({"z-index": "1"});

						if(slideFadeTo){
							$slideBox.children().stop(true,true).fadeTo(100,slideFadeTo);
						}

	 				  	$slideBox.children().last().css({ width: '0px' }).clone().prependTo($slideBox);
	 				  	$slideBox.children().first();
	 				  	$slideBox.children().last().remove();
	 				  	$slideBox.children().first().animate({ width: imgWidth+'px' },slideSpeed,easeIn,function(){
	 				  			if(slideFadeTo){
									$slideBox.children().eq(1).stop(true,true).fadeTo(100,1);
								}

								$slideBox.children().eq(1).css({"z-index": "100"});
								slideLock = false;
								
								if(!slideLock&&timeOut&&allowNext){
									timer = setInterval(autoSlide,timeOut);
									allowNext = false;
								}
	 				  	});
					}
			}

			//init
			initStyle();
			initWidth();
			$(window).resize(function() {
				initWidth();
			});
			slideFade();
			posRelative()

			//auto move
			if(timeOut){
				timer = setInterval(autoSlide,timeOut);
			}
			// next
			if(nextBtn){
				_this.find(nextBtn).click(function(e) {
					allowNext = true;
					autoSlide();
				});
			}

			//prev
			if(prevBtn){
					_this.find(prevBtn).click(function(e) {
						if(!slideLock){
							if(timeOut){
								clearInterval(timer);
							}
							slideLock = true
							if(slideFadeTo){
								$slideBox.children().stop(true,true).fadeTo(100,0.5);
							}
							$slideBox.children().css({"z-index": "1"});
		 				  	$slideBox.children().first().animate({ width: '0px' },slideSpeed,easeOut,function(){
		 				  			$slideBox.children().first().clone().appendTo($slideBox);
		 				  			$slideBox.children().first().remove();
		 				  			$slideBox.children().last().css({ width: imgWidth+'px' })
		 				  			slideLock = false;
									if(timeOut){
										timer = setInterval(autoSlide,timeOut);
									}

									if(slideFadeTo){
										$slideBox.children().eq(1).stop(true,true).fadeTo(100,1);
									}
									$slideBox.children().eq(1).css({"z-index": "100"});

		 				  	});
						}
					})
			}
		}
	});
})(jQuery);
