import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageForm extends Component {

handleClick = () => {
    this.props.dispatch({type:'GET_IMAGES'})
}

handleTagClick = () => {
   this.props.dispatch({type: 'GET_TAGS'})
}
    render() {
        return (
            <div>
            <p>form goes here</p>
            <button onClick={this.handleClick}>Previous</button>
            <button onClick={this.handleClick}>Next</button>
            <select>
                <option>Tag Name</option>
            </select>
            <button onClick={this.handleTagClick}>Apply Tag</button>
            </div>
        )
    }
}

export default connect()(ImageForm);