const express =  require('express');
const router = new express.Router();
const Job = require('../../models/Job');
var bodyParser = require('body-parser');
router.use(bodyParser.json());



// 2. We need to  define the router
router.post("/job", async(req,res) => {
    try {
        // const Job = new Job();
        console.log(req.body);
        const createJob = await Job.create(req.body);
        
        res.status(201).send(createJob);

    } catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

// All jobs
router.get("/job", async(req,res)=>{
    try{

        let jobDate = req.query["date"];
        // var jobDate = req.params.date;
        console.log(jobDate);

        if (jobDate){
        const jobsData = await Job.find({date:jobDate});
        console.log(jobsData);
        res.send(jobsData);}
        else 
        {
            const jobsData = await Job.find({});
            console.log(jobsData);
            res.send(jobsData);
        }
        
    }catch(e){
        res.send(e);
    }
})

// router.get("/joball", async(req,res)=>{
//     try{
//         // let jobDate = req.query["date"];
//         // var jobDate = req.params.date;
//         console.log(jobDate);
//         const jobsData = await Job.find({});
//         console.log(jobsData);
//         res.send(jobsData);
//     }catch(e){
//         res.send(e);
//     }
// })

// Individual Job
// router.get("/job/:id", async(req,res)=>{
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

// Delete job by id
// router.delete("/job/:id", async(req,res) => {
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

// Update job by id
// router.patch("/job/:id", async(req,res) => {
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


module.exports = router;