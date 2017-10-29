app.get('/newsget',function(req,res){
    var idx = req.query.index
    var len = req.query.length
    var data = []

    var img = [
        "http://www.ttpaihang.com/image/thumbnews/20141031110213.jpg",
        "http://ngzb.gxnews.com.cn/res/1/20120112/2411326322534953.jpg",
        "http://pic.newssc.org/0/11/02/72/11027242_896722.jpg",
        "http://img4.duitang.com/uploads/item/201506/22/20150622213532_NBaVS.jpeg",
        "http://img1.cache.netease.com/catchpic/2/29/29F348906D3B5499209E9BCD49E2A524.jpg",
        "http://www.jete.cn/uploads/allimg/091118/2-09111Q00924.jpg",
        "http://pic.baike.soso.com/p/20120528/20120528161401-468472049.jpg",
        "http://img2.cache.netease.com/ent/2015/5/16/20150516080337fa9bd_550.jpg",
        "http://i1.cqnews.net/ent/attachement/jpg/site82/20140414/0026187f29a314b59a4f31.jpg",
        "http://img.21pyh.com/article/20140716/115245_7055.jpg",
        "http://fashionimages.mainone.com/yingshiquan/2006-12/05111233817.jpg"
    ]
    function random(min,max){
        return Math.floor(Math.random()*(max-min)+min)
    }

    for(var i=0; i<idx; i++){
        data.push(img[random(0,img.length)])
    }

    res.send({
        status:0,
        arr:data
    })
})