window.onload=function(){
	var oInput=document.getElementsByName("item");
	var oInputAll=document.getElementById("checkAll")
	var allinner=document.getElementById("All")
	var span=document.getElementsByTagName('span');
	var num=document.getElementsByName("num");
	var del=document.getElementsByName("delete")
	var money=document.getElementsByName("money")
	var gold=document.getElementById("gold")
	var body=document.getElementsByTagName("body")
	var text=document.getElementById("text");
	

	//s搜索框获得焦点和失去焦点
	text.onfocus=function(){
		var cs=text.parentNode.nextElementSibling
		text.setAttribute("style","border-bottom:1px solid red")
		cs.style.display="none"
	}
	text.onblur=function(){
		var cs=text.parentNode.nextElementSibling
		text.setAttribute("style","border-bottom:1px solid #fff")
		cs.style.display="block"
	}



	//判断总按钮是否会亮起来
	var isCheckAll=function(){
		for(var i=0,n=0;i<oInput.length;i++){
			oInput[i].checked && n++
		}
		oInputAll.checked=n==oInput.length;
	}

	//全选/全不选内容
	function changeInner(){
		if (oInputAll.checked) {
			allinner.innerHTML="全不选"
			Settlement()
		}else{
			allinner.innerHTML="全选"
			cancel()
		}
	}

	//给单个按钮改变全选全不选字体的
	function innerer(){
		if (oInputAll.checked) {
			allinner.innerHTML="全不选"
			Settlement()
		}else{
			allinner.innerHTML="全选"
		}
	}


	//全选/全不选
	oInputAll.onclick=function(){
		for(var i=0;i<oInput.length;i++){
			oInput[i].checked=this.checked		
		}
		changeInner()
	}

	//根据复选个数更新全选框状态
	for(var i=0;i<oInput.length;i++){
		oInput[i].onclick=function(){
			isCheckAll()
			single(this)
			innerer()
		}
	}
	//页面加载时候自动全部选中
	(function(){
		for(var i=0;i<oInput.length;i++){
			oInput[i].checked=true
			oInput[i].onclick()
		}
	})()

	//alert(num[1].childNodes[5])
	//加减事件绑定
	for(var i=0; i<num.length; i++){
		var red=num[i].childNodes[1];
		var add=num[i].childNodes[5];
		red.onclick=function(){
			if (this.nextElementSibling.value==1) {
				return;
			}else if(this.nextElementSibling.value!=1 && this.parentNode.parentNode.childNodes[1].childNodes[1].checked){
				this.nextElementSibling.value--;
				changemoney(this)
				singleChangeMoney(this)
			}else if(this.nextElementSibling.value!=1 && !this.parentNode.parentNode.childNodes[1].childNodes[1].checked){
				this.nextElementSibling.value--;
				changemoney(this)
			}
		}
		add.onclick=function(){
			if (this.previousElementSibling.value==99) {
				return;
			}else if(this.previousElementSibling.value!=99 && this.parentNode.parentNode.childNodes[1].childNodes[1].checked){
				this.previousElementSibling.value++
				changemoney(this)
				singleChangeMoney(this)
			}else if(this.previousElementSibling.value!=99 && !this.parentNode.parentNode.childNodes[1].childNodes[1].checked){
				this.previousElementSibling.value++
				changemoney(this)
			}
			
		}

	}

	//删除按钮绑定事件
	for(var i=0;i<del.length;i++){
		var dela=del[i].childNodes[1];
		dela.onclick=function(){
			if (del.length==1) {
				oInputAll.checked=false;
				this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
				cancel()
				changeInner()
			}else{
				this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
				Settlement()
			}			
		}
	}

	//数量框 获得数目失去焦点之后事件
	for(var i=0;i<num.length;i++){
		var numborder=num[i].childNodes[3]
		numborder.onblur=function(){
			if (this.parentNode.parentNode.childNodes[1].childNodes[1].checked) {
				var totai=this.parentNode.previousElementSibling.childNodes[1].childNodes[1].childNodes[1]
				var dan=this.parentNode.previousElementSibling.childNodes[1].childNodes[3].childNodes[1]
				totai.innerHTML=this.value*dan.innerHTML
				Settlement()
			}else{
				var totai=this.parentNode.previousElementSibling.childNodes[1].childNodes[1].childNodes[1]
				var dan=this.parentNode.previousElementSibling.childNodes[1].childNodes[3].childNodes[1]
				totai.innerHTML=this.value*dan.innerHTML
			}
		}
	}

	//alert(num[0].childNodes[3].parentNode.previousElementSibling.childNodes[1].childNodes[1].childNodes[1].innerHTML)
	
	//加减按钮按的时候改变总价
	function singleChangeMoney(elemt){
		var dan=elemt.parentNode.previousElementSibling.childNodes[1].childNodes[3].childNodes[1].innerHTML;
		if (elemt.className=="add"){
			gold.innerHTML=parseInt(gold.innerHTML)+parseInt(dan)
		}else{
			gold.innerHTML=parseInt(gold.innerHTML)-parseInt(dan)
		}

	}

	//
	function changemoney(elemt){
		var num=elemt.parentNode.previousElementSibling.childNodes[1].childNodes[1].childNodes[1];
		var dan=elemt.parentNode.previousElementSibling.childNodes[1].childNodes[3].childNodes[1].innerHTML;
		if (elemt.className=="add") {
			var add=elemt.previousElementSibling.value;
			num.innerHTML=add*dan
		}else{
			var red=elemt.nextElementSibling.value
			num.innerHTML=parseInt(num.innerHTML)-dan
		}	

	}

	//改变总价格
	function Settlement(){
		var totai=new Array()
		var pp=0;
		for(var i=0;i<money.length;i++){
			//var totai=new Array()
			totai[i]=money[i].childNodes[1].childNodes[1].innerHTML
		}
		for(var j=0;j<totai.length;j++){
			pp+=parseInt(totai[j])
		}
		gold.innerHTML=pp
	}
	Settlement()

	//单个按钮控制总价格
	function single(elemt){
			var inner=elemt.parentNode.nextElementSibling.nextElementSibling.childNodes[1].childNodes[1].childNodes[1].innerHTML
		if (elemt.checked===true) {
			gold.innerHTML=parseInt(gold.innerHTML)+parseInt(inner)
		}else if (!elemt.checked && gold.innerHTML!=0){
			gold.innerHTML=gold.innerHTML-inner
		}
	}
	
	//清空结算结算金额
	function cancel(){
		gold.innerHTML=0
	}

	//页面加载时总价等于单价
	(function(){
		for(var i=0;i<money.length;i++){
			money[i].childNodes[3].childNodes[1].innerHTML=money[i].childNodes[1].childNodes[1].innerHTML
		}
	})()



}