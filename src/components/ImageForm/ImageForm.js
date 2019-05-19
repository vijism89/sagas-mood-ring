import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageForm extends Component {

handleClick = () =>{
    this.props.dispatch({type:'GET_IMAGES'})
}
    render() {
        return (
            <div>
            <p>form goes here</p>
            <button onClick={this.handleClick}>Previous</button>
            <button>Next</button>
            <select>
                <option>Tag Name</option>
            </select>
            <button>Apply Tag</button>
            </div>
        )
    }
}

export default connect()(ImageForm);