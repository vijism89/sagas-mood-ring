import React, { Component } from 'react';


class ImageForm extends Component {
    render() {
        return (
            <div>
            <p>form goes here</p>
            <button>Previous</button>
            <button>Next</button>
            <select>
                <option>Tag Name</option>
            </select>
            <button>Apply Tag</button>
            </div>
        )
    }
}

export default ImageForm;