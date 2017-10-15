
		$("#btn").addEventListener('click',function(){
			cantainer.ajax("https://xzmly.github.io/Mydemo/small%20demo/%E5%8A%A0%E8%BD%BD%E6%95%B0%E6%8D%AE/loadMore?index="+cantainer.indexNum+"&length=5",
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
						if(!cantainer.isDataArrive){   //判断是不是响应了，没响应，退出
    						 return;
 						}
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
							cantainer.isDataArrive = true   //当前表示是响应数据状态
						}//one if
					}//onready
					httpRequest.open('GET',path,true);	
					httpRequest.send()
					cantainer.isDataArrive = false  //做完数据处理，响应数据后，恢复到没有响应数据状态
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

					indexNum:6,
					isDataArrive:true
			}
		
