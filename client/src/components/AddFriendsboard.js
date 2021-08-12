import React, { Component } from 'react';
import axios from 'axios';



class feedboard extends Component {
    async componentDidMount() {
        
        const comp = await axios.get(`${process.env.PUBLIC_URL}/api/get_all_users`);
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
export default feedboard;


