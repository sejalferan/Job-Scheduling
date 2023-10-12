import axios from "axios";
import { useState, useEffect } from "react";


 export const columns = [
    {
        name: 'Name',
        // selector: row => row.name,
        selector: 'name',
    },
    {
        name: 'Survey No.',
        // selector: row => row.surveyno,
        selector: 'surveyno',
    },
    {
        name: 'Village',
        // selector: row => row.village,
        selector: 'village',
    },
    {
        name: 'Taluka',
        // selector: row => row.taluka,
        selector: 'taluka',
    },
    {
        name: 'District',
        // selector: row => row.district,
        selector: 'district',
    },
    {
        name: 'Date',
        // selector: row => row.date,
        selector: 'date',
        sortable: true,
    },
    {
        name: 'Area (in Acres)',
        // selector: row => row.area,
        selector: 'area',
    }
    
];


// const Data = () => { 
// const [jobs,setJobs] = useState('');
//  const getJobs = async () => {
//     try {
//         axios.get('/job', {
//             params: {
//             }
//           })
//           .then ((response) => {
//             const getallData = response.data;
//             setJobs(getallData);
//     });
//     }
//     catch (error){
//         console.log(error);
//     }
// };
// useEffect (()=> {
//     getJobs();
//     console.log(jobs);
// },[]);
// return jobs;
// }

// const data = Data();
// export default columns;