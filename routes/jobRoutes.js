const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid');

const requireLogin = require('../middlewares/requireLogin');
const requireFields = require('../middlewares/requireFields');

const keys = require('../config/keys');
const { FindInPageOutlined } = require('@material-ui/icons');

module.exports = (app) => {

    //company list to be used to populate in dropdown
    app.get('/api/company_list', requireLogin, async (req, res) => {
        var d = new Date();
        const curdate = d.toISOString();
        var list = await Job.find({ isDeleted: false }, { jobExpiry: { $gt: curdate } }).distinct('companyName');
        res.send(list);
    });
    
    //Get job by page number
    app.get('/api/page_job', requireLogin, async (req, res) => {
        const page = parseInt(req.query.page);
        const PAGE_SIZE = 10;//change this accordingly
        const skip = (page - 1) * PAGE_SIZE;
        const body_batch = req.query.batch;
        const body_companyName = req.query.companies;
        const body_role = req.query.role;
        const sortBy = req.query.sortBy;

        var d = new Date();
        const curdate = d.toISOString();

        var job = await Job.find({
            "$and": [body_batch ? { "batch": { "$in": body_batch } } : {}, { isDeleted: false }, body_companyName ? { "companyName": { "$in": body_companyName } } : {},
            body_role ? { "role": { "$in": body_role } } : {}]
        });
        const jobcount = job.length;
        var jobc = '' + jobcount

        var page_jobs = await Job.find({
            "$and": [body_batch ? { "batch": { "$in": body_batch } } : {}, { isDeleted: false }, body_companyName ? { "companyName": { "$in": body_companyName } } : {},
            body_role ? { "role": { "$in": body_role } } : {}]
        })
            .sort({ [req.query.sortBy]: req.query.comparator })
            .skip(skip)
            .limit(PAGE_SIZE)
            .populate('previewComment');
        var arr = {
            page: page_jobs,
            count: jobc
        }
        res.send(arr);
    })
    
    //  Add Job 
    app.post('/api/add_job',  async (req, res) => {
        //console.log("Here I am");
        try {
            const newId = uuidv4();
            const newJob = await new Job({
                jobId: newId,
                companyName: req.body.companyName,
            }).save();
           // console.log("Here i'm");
            res.send(true);
        }
        catch (err) {
           // console.log(err);
            res.send(err);
        }
    });

    

}