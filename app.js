var http=require("http")
var fs=require('fs')
var  querystring= require('querystring')
http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    var str="";
    var data=[]
    req.on("data",function(data){
        str+=data;
    })
    req.on("end",function(err){
        var json=querystring.parse(str)
        var data = fs.readFileSync('app.txt','utf-8')
        data = JSON.parse(data)
        data.push({user:json.user,pass:json.pass})
        fs.writeFileSync('app.txt',JSON.stringify(data));
        res.write(JSON.stringify(data))
        res.end();
    })
}).listen(9999)
