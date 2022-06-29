import React from "react";

{/* This is a test component to help you build other components easily and fast */}
{/* The idea is that every view in the screen should be a component for better coding,
maintenance and less bugs */}
export class Button extends React.Component {

    constructor(props){
        super(props)
        this.state = {} // every component has its own state
    }

    render() {
        return  <a class='btn btn-primary' href="/create-pin"
        onClick={this.props.onButtonPress}>{this.props.buttonName}</a> 
    }
}