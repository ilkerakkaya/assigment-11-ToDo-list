const express=require("express");
const bodyParser=require("body-parser");



const app= express();

let items =["Buy food", "eat food", "again eat food"];
let today= new Date();
    
let options={
    weekday: "long",
    day:"numeric",
    month:"long"
}; 

let day=today.toLocaleDateString("en-US", options);

let workItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){
    
   res.render("login", {button2:"Login", listTitle: day, newListItems: items});
});


app.post('/', (req, res) => {
    let userName = req.body.fName;
    let lastname = req.body.lName;
    let email=req.body.email;
    

    

    //nameList.push(userName);

    if (userName === 'admin' && lastname === 'admin' && email==='admin@admin.com')
      return  res.render('list',{ listTitle: day, newListItems: items});
    else
   return res.render('index', { button1: 'Login',isError: true });
});

app.get("/work", function (req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
    
});

// POST FROM "/" 
app.post("/list", function (req,res){

    let item= req.body.newItem;
        items.push(item);
        res.redirect('/list')
    

} );

//POST FROM "/work" 

app.post("/work", function (req,res){

    let item= req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
} );



app.get("/about", function (req,res) {
    res.render("about");
    
});

app.get("/list",function (req,res){
    res.render("list", {listTitle: "List", newListItems: listTitle});

    
})



// Run server on port 3000
app.listen(3000, function(){
    console.log("server works perfectly");
});