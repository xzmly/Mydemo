var _goTop = (function (){
    function GoTop(ct){
        this.ct = document.querySelector(ct)
        this.target = document.createElement('button')
        this.bindEvent()
        this.createNode()
    }

    GoTop.prototype.bindEvent = function(num){
        var _this = this
        _this.target.addEventListener('click',function(){
            scrollTo(0,0);
        })
    }

    GoTop.prototype.createNode = function(){
        var _this = this
        window.onscroll = function(){
            if(window.scrollY >= 600){
                _this.target.innerText = "Go to top"
                _this.target.classList.add('main')
                _this.ct.appendChild(_this.target)
                _this.target.style.display="block"
            }else{
                _this.target.classList.remove('main')
                _this.target.style.display="none"
            }
        }
    }
    return  {
        init: function($id){
            new GoTop($id)
        }
    }
})()

var cats = _goTop
module.exports = cats;
