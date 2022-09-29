const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const userArr = require("./InitialData")

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/api/student" , async(req, res) => {
    try{
        res.json({
            status: "Success",
            userArr
        })
    }catch (e){
        res.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
})


app.get("/api/student/:id" , async(req, res) => {
    try{
        const idx = userArr.findIndex((obj => obj.id == req.params.id));
        if(idx == -1){
            return res.status(400).json({
                status: "Failure",
                message: "There is no student with given id"
            })
        }
        res.json({
            status: "Success",
            data: userArr[idx]
        })
    }catch (e){
        res.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
})
let newId = userArr.length+1

app.post("/api/student" , async(req, res) => {
    try{

        if(!req.body.name || !req.body.currentClass || !req.body.division){
            res.status(404).json({
                status: "Failure",
                message: "details missing"
            })
        }
        userArr.push({
            id: newId,
            name: req.body.name,
            currentClass: req.body.currentClass ,
            division: req.body.division
        })
          newId++
        res.json({
            status: "success",
            id: newId
        })
        
    }catch (e){
        res.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
})

app.put("/api/student/:id" , async(req, res) => {
    try{
        const idx = userArr.findIndex((obj => obj.id == req.params.id));
        if(idx == -1){
            return res.status(400).json({
                status: "Failure",
                message: "There is no student with given id"
            })
        }
        if(req.body.name)
        userArr[idx].name = req.body.name
        if(req.body.currentClass)
        userArr[idx].currentClass = req.body.currentClass
        if(req.body.division)
        userArr[idx].division = req.body.division
        res.json({
            status: "Success",
            data: userArr[idx]
        })
    }catch (e){
        res.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
})

app.delete("/api/student/:id" , async(req, res) => {
    try{
        const idx = userArr.findIndex((obj => obj.id == req.params.id));
        if(idx == -1){
            return res.status(400).json({
                status: "Failure",
                message: "There is no student with given id"
            })
        }
        userArr.splice(idx, 1)
        res.json({
            status: "Success",
            message: "Record deleted"
        })
    }catch (e){
        res.status(404).json({
            status: "Failure",
            message: e.message
        })
    }
})


app.listen(port, () => console.log(`App listening on port ${8080}!`))

module.exports = app;   