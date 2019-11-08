import express from 'express';

const app = express();
const port = 3000;

app.set("view engine", "html");
app.set('views', __dirname + '/views');
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(port, ()=>{
    console.log(`SearchIt running on port ${3000}`);
});