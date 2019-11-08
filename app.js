var express = require ('express');
var dotenv = require ('dotenv');

const app = express();
dotenv.config();

app.set("view engine", "html");
app.set('views', __dirname + '/views');
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(process.env.PORT, ()=>{
    console.log(`SearchIt running on port ${process.env.PORT}`);
});