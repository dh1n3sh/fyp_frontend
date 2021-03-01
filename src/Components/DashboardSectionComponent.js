import React, { Component } from "react";
import axios from "./axiosConfig";

export default class DashboardSectionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            type : this.props.type,
            clickHandler: this.props.clickHandler,
            populateData : this.props.populateData
        }

        this.deleteBtn = this.deleteBtn.bind(this);

    }

    static getDerivedStateFromProps(props, state) {
        // if(props === state)

        let newState = {
            data: props.data,
            type : props.type,
            clickHandler: props.clickHandler
        }
        return newState
    }

    deleteBtn(event){
        event.stopPropagation();
        axios.delete('/api/'+this.state.type+'s/'+this.state.data.id.toString()+'/')
            .then((res)=>{
                // console.log(res);
                if(res.status < 300 && res.status > 199 ){
                    this.state.populateData();
                    window.alert(this.state.type + ' deleted !');
                }
                else{
                    window.alert(res.message);
                    console.log(res);
                }
            });
    }

    render() {
        return <div className="dashboard-section" onClick={(e) => { this.state.clickHandler(this.state.data) }}>
                    {this.state.data.name}
                    <img 
                        src='/delete-24px.svg' 
                        alt="del logo" 
                        style={{ float : 'right' , marginRight : '10px' , marginTop : '10px'}}
                        onClick={this.deleteBtn}
                        />
                </div>
    }
}