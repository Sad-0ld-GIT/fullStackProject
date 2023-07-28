let express=require("express")
let cors=require("cors")
let mysql=require("mysql")
let bodyparser=require("body-parser")
let server=express()

server.use(bodyparser.json())
server.use(bodyparser.urlencoded({ extended: true }));
server.use(cors())

let db=mysql.createConnection(
{
    host:"localhost",
    user:"root",
    password:"root",
    database:"nbs"
});

db.connect()

server.get("/allEmployees",(req,res)=>{
    db.query("Select * from employees",function(err,results){
        res.json(results)
        res.end()
    })
})

server.post("/saveEmployee",(req,res)=>{
    let empno = req.body.empno
    let ename = req.body.ename
    let esal  = req.body.salary
    let edept = req.body.dept

    let sqlInsert=`insert into employees values(${empno},'${ename}',${esal},'${edept}')`
    //let sqlInsert=` insert into employees values(${req.body.empno},'${req.body.ename}',${req.body.salary},'${req.body.dept}')`

    db.query(sqlInsert,function(err,result){
        if(err){
            res.json({"result":"error"})
        }else{
            res.json({"result":"done"})
        }
    })
})

server.post("/createAccount",(req,res)=>{
    let name= req.body.name
    let country = req.body.country.substring(0,1)
    let accountType = req.body.accountType.substring(0,1)

    let findAccountNumberSQL=`select concat('${accountType}','${country}', ifnull( lpad(max(substr(accno,3,3)) + 1,3,'0'),'001')) as newAccno from bank where substr(accno,2,1)='${country}'`;
    db.query(findAccountNumberSQL,function(err,result){
        if(err){
            console.log(err)
        }else{
            let insertquery=`insert into bank values('${result[0].newAccno}','${name}')`
            db.query(insertquery,function(err,result){
                if (err){
                    console.log(err)
                }
            })
        }
    })
})

server.listen(8000)
