app.get('/getNews',function(req,res){
	var idx = req.query.index
	var len = req.query.length
	var data = []

	for(var i=0; i < len; i++){
		data.push('链接'+(parseInt(idx)+i))
	}

	res.send({
		wrap: 0,
		arr: data
	});
})
