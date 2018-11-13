import React, { Component } from 'react';
import * as d3 from "d3";
 
class Arc extends Component {
    constructor(props) {
        super(props);
        this.arc = d3.arc();
    }
 
    componentWillMount() {
        this.updateD3(this.props);
    }
 
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }
 
    updateD3(newProps) {
        this.arc.innerRadius(newProps.innerRadius);
        this.arc.outerRadius(newProps.outerRadius);
    }
 
    render() {
        return (
            <path d={this.arc(this.props.data)}
                  style={{fill: this.props.color}}></path>
        );
    }
}
 
export default Arc;
