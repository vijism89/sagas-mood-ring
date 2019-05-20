import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageForm extends Component {
    state = {
       selectedImage:0
    }
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            tags_id:event.target.value
        })
    }
    //this function will increase the value by 1
    handleNextClick = () => {
        this.setState((state) => {  
            return {selectedImage: state.selectedImage === 4 ? 0 : state.selectedImage + 1}
          });
       // this.props.dispatch({ type: 'GET_IMAGES'})
    }
    //this will decrease my value by 1
    handlePreviewClick = () => {
        this.setState((state) => {
            return {selectedImage: state.selectedImage === 0 ? 4: state.selectedImage - 1}
        });
    }

    handleTagClick = () => {
        this.props.dispatch({ type: 'GET_TAGS' })
    }
    render() {
        return (
            <div>
                <p>form goes here --> </p>
                <button onClick={this.handlePreviewClick} >Previous</button>
                <button onClick={this.handleNextClick}>Next</button>
               
                {this.props.reduxState.images.map((image,index) => {
                        return index === this.state.selectedImage ? (
                           <img src = {image.path} alt={image.id}/> 
                        ) : '';
                    })}
                <select value={this.props.reduxState.tags.tags_id} onChange={this.handleChange}>
                    <option value="0">Tag Name</option>
                    {this.props.reduxState.tags.map(tag => {
                        return (
                            <option value={tag.id}> {tag.name} </option>
                        )
                    })}
                </select>
                <button onClick={this.handleTagClick}>Apply Tag</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(ImageForm);