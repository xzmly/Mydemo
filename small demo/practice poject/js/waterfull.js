var num = 5
var colNum = parseInt($('.img-list').outerWidth(true)/$('.img-list li').outerWidth(true))
var imgWidth = $('.img-list li').outerWidth(true)

var arr = [];
for(var i=0; i<colNum; i++){
    arr[i] = 0
}

    getdata(function(img){
        console.log(123)
        $(img).each(function(index,node){
            var $newNodes = getNode(index,node)
            $newNodes.find('img').on('load',function(){
                $('.img-list').append($newNodes)
                waterFull($newNodes)
            })
        })
    })

function start(){
    $.ajax({
        url: '/newsget',
        method: 'get',
        dataType: 'json',
        data: {
            index: num,
            length: 3
        },
        success: function (ret) {
            callback(ret.arr)
            console.log(123)
        },
        error: function () {
            console.log('fail')
        }
    })
}

function getdata(callback){
    $('.water-add').on('click',function(){
        $.ajax({
            url:'/newsget',
            method:'get',
            dataType:'json',
            data:{
                index:num,
                length:3
            },
            success:function(ret){
                callback(ret.arr)
            },
            error:function(){
                console.log('fail')
            }
        })
    })
}

function getNode(index,node){
    var html = ''
    html += '<li>'
    html +=     '<img src="'+node+'" alt="'+index+'">'
    html += '</li>'
    return $(html)
}


function waterFull($node){
    var min = Math.min.apply(null,arr)
    var minIndex = arr.indexOf(min)

    $node.css({
        left:minIndex*imgWidth,
        top:min
    })

    arr[minIndex] += $node.outerHeight(true)
    $('.water-wrap').height(Math.max.apply(null,arr))
}
