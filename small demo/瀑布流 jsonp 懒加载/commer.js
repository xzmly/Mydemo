//获取数据
//把数据放到DOM上
var perPageCount = 8
var curPage = 1
var arr =[]
var isDataArrive = false;
var itemWidth = $('.item').width()
var colNum = parseInt($('.list').width()/itemWidth)
var clock

	for(var i=0;i<colNum;i++){
		arr[i]=0
	}

start()
$(window).on('scroll',function(){
	if(isVisible($('.load'))){
		if(clock){
			clearTimeout(clock)
		}
		clock = setTimeout(function(){
			start()
		},700)
	}
})

function start(){
	getData(function(newsList){
		$.each(newsList,function(index,node){
			var $node = getNodes(node)
			$node.find('.image').on('load',function(){
				$('.list').append($node)
				waterFallPlace($node)
			})
		})
	})
}

function getData(callback) {
    $.ajax({
        url: 'http://platform.sina.com.cn/slide/album_tech',
        method: 'GET',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: {
            app_key: '1271687855',
            num: perPageCount,
            page: curPage
        }
    }).done(function (ret) {
        if(ret && ret.status && ret.status.code === '0') {
        	console.log(ret.data)
            callback (ret.data);
            curPage++;
        } else{
            console.log('get error data');
        }
    });
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

function waterFallPlace($nodes){
	var min = Math.min.apply(null,arr)
	var minIndex = arr.indexOf(min)

	$nodes.css({
		top:min,
		left:itemWidth*minIndex
	})
	arr[minIndex]+=$nodes.outerHeight(true)
	$('.list').height(Math.max.apply(null,arr))
}

function isVisible($el) {
    var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        elH = $el.offset().top;
    if(elH < (scrollH + winH + 100) && elH > scrollH){
        return true;
    } else{
    return false;
    }
}


