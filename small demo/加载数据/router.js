 app.get('https://xzmly.github.io/Mydemo/small%20demo/%E5%8A%A0%E8%BD%BD%E6%95%B0%E6%8D%AE/loadMore',function(req,res){

 	var curIdx = req.query.index
 	var len = req.query.length
 	var data = [];

 	for(var i=0; i < len; i++){
 		data.push("新闻"+(parseInt(curIdx)+i))
 	}

 	res.send(data)
 });
