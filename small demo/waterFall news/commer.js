
var messageNum = 10
var curPage = 1
var itemWidth = $('.item').outerWidth(true)
var colNum = parseInt($('.wrap').outerWidth(true)/$('.item').outerWidth(true))
var arr = []
for(var i = 0; i < colNum; i++){
	arr[i]=0
}

start()
var clock = false
$(window).on('scroll',function(){
	if (isVisible($('.load'))) {
		if (clock){
			clearTimeout(clock)
		}
		clock=setTimeout(function(){
			start()
		},450)
	}
})

function start(){
	getData(function(nodes){
		$.each(nodes,function(index,node){
			var $newNodes = getNodes(node)
			$newNodes.find('img').on('load',function(){
				$('.wrap').append($newNodes)
				waterFallPlace($newNodes)
			})
		})
	})
}

function getData(callback){
	$.ajax({
		url:"//platform.sina.com.cn/slide/album_tech",
		dataType:"jsonp",
		jsonp:"jsoncallback",
		data:{
			app_key:"1271687855",
			num: messageNum,
			page:curPage
		}
	}).done(function(ret){
		if (ret && ret.status && ret.status.code == 0) {
			callback(ret.data)
			curPage++
		}else{
			console.log('what')
		}
	})
}

function getNodes(node){
	 var html = ''
	 html+='<li class="item">'
	 html+=	'<a href="'+node.url+'">'
	 html+=		'<img src="'+node.img_url+'" class="image">' 
	 html+=	'</a>'
	 html+= 	'<h4>'+node.short_name+'</h4>'
	 html+= 	'<p>'+node.short_intro+'</p>'	
	 html+= '</li>'

	 return $(html)
}

function waterFallPlace($Nodes){
	var min = Math.min.apply(null,arr)
	var minIndex = arr.indexOf(min)

	$Nodes.css({
		top: min,
		left: minIndex*itemWidth
	})
	arr[minIndex]+=$Nodes.outerHeight(true)
	$('.wrap').height(Math.max.apply(null,arr))
}

function isVisible($load){
	var windowHeight = $(window).height()
	var scrollHeight = $(window).scrollTop()
	var loadHeight = $load.offset().top

	if(loadHeight<windowHeight+scrollHeight){
		return true
	}
	return false
}