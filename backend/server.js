let express = require("express");
let server = express();
let mysql = require("mysql");
let bodyparser=require("body-parser")
server.use(bodyparser.json())
server.use(bodyparser.urlencoded({ extended: true }));

let db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"nbs2"
});

db.connect();

server.get("/addEmployee",function(re,res){
    res.render("form.ejs")
})

server.post("/saveEmployee",function(req,res){
    let empno=req.body.empno
    let name=req.body.ename
    let salary=req.body.esal
    let dept=req.body.edept
    let insertquery=`insert into employees values(${empno},'${name}',${salary},'${dept}')`
    db.query(insertquery,function(err,data){
        console.log(err)
        db.query("select * from employees",function(err,records){
            res.render("employeeslist.ejs",{employees:records})
            res.end()
        })
    })
})

server.get("/", function(req,res){
    res.render("homepage.ejs");
    res.end()
})

server.get("/allemployees", function(req,res){
    db.query("select * from employees", function(err, data){
    res.render("employeelist.ejs", {employees:data});
    res.end()
   })
})

server.get("/departmentEmployees/:dept", function(req,res){
    let sql = "select * from employees where department='"+req.params.dept+"'"
    db.query(sql, function(err, data){
    res.render("employeelist.ejs", {employees:data});
    res.end()
   })
})

server.get("/departments", function(req,res){
    db.query("select distinct department from employees", function(err, data){
    res.render("departments.ejs", {deptName:data});
    res.end()
    })
})

server.get("/deleteEmployee/:empno", function(req,res){
    let deleteSQL="delete from employees where empno="+req.params.empno
    db.query(deleteSQL,function(err, data){

        db.query("select * from employees",function(err, data){
            res.render("employeelist.ejs",{employees:data})
            res.end()
        })
    })
})

server.get("/show", function(req,res){
    db.query("select * from employees", function(err,data){
        console.log(data)
    })
    res.write("Hello")
    res.end()
});

server.listen(3000)
