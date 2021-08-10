import React, { Component } from 'react';
import axios from 'axios';



class Jobboard extends Component {
    async componentDidMount() {
        
        const comp = await axios.get(`${process.env.PUBLIC_URL}/api/User_list`);
        this.setState({
            listofusers: comp.data
        });
        this.fetchUsers();
    }   
    
    render() {
        return (
            <div> </div>
        )
    }
}
export default Jobboard;


