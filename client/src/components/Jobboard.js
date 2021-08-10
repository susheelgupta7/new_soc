import React, { Component } from 'react';
import axios from 'axios';
import Jobcard from './Jobcard';
import './Jobboard.css';
import { TouchBallLoading } from 'react-loadingg';


class Jobboard extends Component {

    constructor(props) {
        var pg = 1, x = localStorage.getItem("page");
        if (x) {
            pg = parseInt(x);
            localStorage.removeItem("page");
        }
        super(props);

        this.myRef = React.createRef();

        let filterLocalStore;
        if (localStorage.getItem('filterLocalStore')) {
            const filterString = localStorage.getItem('filterLocalStore');
            filterLocalStore = JSON.parse(filterString);
        }

        this.state = {
            jobs: [],
            page: pg,
            selectedCompanies: filterLocalStore ? filterLocalStore.selectedCompanies : [],
            role: filterLocalStore ? filterLocalStore.role : [],
            sortBy: filterLocalStore ? filterLocalStore.sortBy : "postedOn",
            comparator: filterLocalStore ? filterLocalStore.comparator : -1,
            batch: filterLocalStore ? filterLocalStore.batch : [],
            jobcount: 1,
            userJobstack: [],
            floatButton: 0,
            sortingClass: "sorting-filters",
            listofcompanies: [],
            paginationItems: [],
            isFetching: true
        }

        this.refJobs = React.createRef();
    }
    async componentDidMount() {
        
        const comp = await axios.get(`${process.env.PUBLIC_URL}/api/company_list`);
        this.setState({
            listofcompanies: comp.data
        });
        this.fetchJobs();
    }

    setLocal = (x) => {
        localStorage.setItem("page", this.state.page);
    }
    async fetchJobs() {
        this.setState({ isFetching: true });
        var body = {
            page: this.state.page,
            sortBy: this.state.sortBy,
            comparator: this.state.comparator,
            batch: this.state.batch,
            role: this.state.role,
            companies: this.state.selectedCompanies
        }
        var job = await axios({
            method: 'get',
            url: `${process.env.PUBLIC_URL}/api/page_job?page=${this.state.page}`,
            params: body
        });

        const page_jobs = job.data.page;
        const jc = job.data.count;

        const jobcount = parseInt(jc);

        this.setState({
            jobs: page_jobs,
            jobcount: jobcount
        })
        
        if (this.refJobs.current)
            this.refJobs.current.scrollTop = 0;
        this.setState({ isFetching: false });
    }

    async clickHandler(p) {
        const newp = parseInt(p);
        this.setState({
            page: newp
        }, async () => {
            await this.fetchJobs();
        })
    }
    
    
    
    
    render() {
        var JOBS = this.state.jobs;
        return (
            <div className="jobboard-parent">
                
                <div className="jobboard">
                    {
                        this.state.isFetching
                            ?
                            <div className="Loading"> <TouchBallLoading style={{ width: "10rem" }} speed={0} color={"#33b579"} size="large" /></div>
                            :
                            JOBS.length
                                ?
                                <div onClick={this.removeShowSorting} className="jobs" id="jobs" ref={this.refJobs}>
                                    <div>
                                        {
                                            JOBS.map(job => (
                                                //Adding key property here is segregating the the jobs being called and on changing the page calling the,
                                                //child's component again
                                                <Jobcard key={job.jobId} job={job} setLocal={this.setLocal} notButton={this.state.userJobstack.includes(job.jobId)} />
                                            )
                                            )
                                        }
                                    </div>
                                </div>
                               :
                                <div style={{ position: "relative", marginLeft: "50%", left: "-8rem", top: "30%" }}>
                                    <h4 style={{ color: "grey" }}>No matching jobs to show!</h4>
                                    
                                </div>
                    }
                </div>
                
            </div>
        )
    }
}
export default Jobboard;


