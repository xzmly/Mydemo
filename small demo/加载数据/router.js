 app.get('https://xzmly.github.io/loadMore?index=6&length=5',function(req,res){

 	var curIdx = req.query.index
 	var len = req.query.length
 	var data = [];

 	for(var i=0; i < len; i++){
 		data.push("新闻"+(parseInt(curIdx)+i))
 	}

 	res.send(data)
 });
