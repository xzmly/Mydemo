
		$("#btn").addEventListener('click',function(){
			cantainer.ajax("//loadMore?index="+cantainer.indexNum+"&length=5",
				function(obj){
					//成功时候你想干什么
					cantainer.addContent(obj)
				},
				//失败时候你想干什么
				function(xhr){
					console.log(xhr)
				})
		})




			function $(elemt){
				var car=document.querySelector(elemt)
				return car	
			}
			var cantainer={
				//ajax 请求
					ajax:function(path,succssFn,failFn){
					var httpRequest = new XMLHttpRequest();
					httpRequest.onreadystatechange = function(){
						if (httpRequest.readyState === XMLHttpRequest.DONE) {
							if (httpRequest.status === 200){
								var obj = JSON.parse(httpRequest.responseText)
								succssFn(obj)
							}else{
								failFn(httpRequest)
								console.log("出错")
							}//else
						}//one if
					}//onready
					httpRequest.open('GET',path,true);	
					httpRequest.send()
				},//ajax

				//成功时候u执行函数
					addContent:function(obj){
					for(var i=0; i<obj.length; i++){
						var li=document.createElement('li')
						li.innerText = obj[i]
						$('#news').appendChild(li)
					}
					cantainer.indexNum+=5
				},

					indexNum:6
			}
		
