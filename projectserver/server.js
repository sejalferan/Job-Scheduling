const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const Job = require('./models/Job');
const port = process.env.PORT || 8000;
connectDB();
const jobrouter = require('./routes/api/Job');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
// 3. we nwwd to register our router
app.use(jobrouter);

// Using promises
// app.post("/job", (req,res) => {
//     console.log(req.body);
//     const job = new Job(req.body);
//     job.save().then(()=> {
//         res.status(201).send(job);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })
// })


// using async await
// app.post("/job", async(req,res) => {
//     try {
//         const job = new Job(req.body);
//         const createJob = await job.save();
//         res.status(201).send(createJob);

//     } catch(e){
//         res.status(400).send(e);
//     }
// })

// // All jobs
// app.get("/job", async(req,res)=>{
//     try{
//         const jobsData = await Job.find();
//         res.send(jobsData);
//     }catch(e){
//         res.send(e);
//     }
// })

// // Individual Job
// app.get("/job/:id", async(req,res)=>{
//     try{
//         const _id = req.params.id;
//         const jobsData = await Job.findById(_id);
//         res.send(jobsData);

//         if(!jobsData){
//             return res.status(404).send();
//         }else {
//             res.send(jobsData);
//         }
//     }catch(e){
//         res.send(e);
//     }
// })

// // Delete job by id
// app.delete("/job/:id", async(req,res) => {
//     try{
//        const id = req.params.id;
//        const deleteJob  = await Job.findByIdAndDelete(id);
//        if(!req.params.id){
//         return res.status(400).send();
//        }
//        res.send(deleteJob);
//     }
//     catch(e){
//        res.status(400).send(e);
//     }
// })

// // Update job by id
// app.patch("/job/:id", async(req,res) => {
//     try{
//         const _id = req.params.id;
//         const updateJob = await Job.findByIdAndUpdate(_id, req.body, {
//             new : true
//         });
//         res.send(updateJob);
//     }   
//     catch (e){
//         res.status(500).send(e);
//     }
// })

app.get('/', (req, res) => {
    res.send("hellow from server.");
})

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})