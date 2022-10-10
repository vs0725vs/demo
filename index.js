let express = require('express');
//1.載入express模組
let app = express();
// 2.使用express
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})
// 5.首頁
let port = 3000;
//3.設定port位置
app.listen(port);
// 4.監聽 port

app.get("/demo.js", function (req, res) {
  res.sendFile(__dirname + "/demo.js")
})
app.get("/css/demo.css", function (req, res) {
  res.sendFile(__dirname + "/css/demo.css")
})

//post
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use(bodyParser.json());
app.post("/ajax", (req,res) => {
    console.log(req.body);
    res.json({
        post_result:'ok',
        body: req.body,
    }) 
})
