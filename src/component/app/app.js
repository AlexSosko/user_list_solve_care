import React, { Component }  from 'react';

import '../app/app.css';

export default class  App extends Component {

    state = {
        itemList: null
    }

    sortByName = () => {
        const itemList = this.state.itemList
            .sort((a, b) => {
                return (a.name).localeCompare(b.name);
            });
        this.setState({itemList});
    }

    sortByDate = () => {
        const itemList = this.state.itemList
            .sort((a, b) => {
                const c = (b.date - a.date);
                return c;
            });
        this.setState({itemList});        
    }    

    componentDidMount () {
        fetch('https://randomuser.me/api/?nat=gb,us&results=20&inc=name,dob')
            .then(response => response.json())
            .then((res) => {
                    const itemList = res.results
                        .map((item) => {

                            let transformedItem ={};
                            transformedItem.name = item.name.first;
                            transformedItem.date = new Date(item.dob.date);

                            return transformedItem;
                        });
                    this.setState({itemList});
                });
    }

    componentDidUpdate () {
        console.log(this.state.itemList)
    }

    render() {

        if (!this.state.itemList) {
            return (
                <div className="spinner">
                    <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                
            );
        };

        const itemList = this.state.itemList
                .map((item) => {
                    return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.date.getDate()}.{item.date.getMonth()}.{item.date.getFullYear()}</td>
                        </tr>
                    )
                });

        return (
            <div className="container">
                <div>
                    <table className="table thead-dark table-striped" >
                        <thead>
                            <tr>To sort click fild name</tr>
                            <tr>
                                <th onClick = {this.sortByName} >
                                    Name 
                                </th>
                                <th onClick = {this.sortByDate}>
                                    Date of birth
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}