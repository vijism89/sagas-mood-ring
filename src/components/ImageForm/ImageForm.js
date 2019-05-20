import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageForm.css';


class ImageForm extends Component {
    //local state to hold some objects
    state = {
        selectedImage: 0,
        tags_id: '',
        images_id: ''
    }
    //function to update the tags
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            tags_id: event.target.value
        })
    }
    //this function will increase the value by 1
    handleNextClick = () => {
        this.setState((state) => {
            //increase the value by 1 if the image index is 0
            return { selectedImage: state.selectedImage === 4 ? 0 : state.selectedImage + 1 }
        });
        // this.props.dispatch({ type: 'GET_IMAGES'})
    }
    //this will decrease my value by 1
    handlePreviewClick = () => {
        this.setState((state) => {
            //decrease the value by 1 if the image index is 4
            return { selectedImage: state.selectedImage === 0 ? 4 : state.selectedImage - 1 }
        });
    }
    //this will get my tags
    handleTagClick = () => {
        const result = this.props.reduxState.tags.filter(tag => tag.id === this.state.tags_id);
        console.log(result);
        if (result.length > 0) {
            alert('Image Already Tagged');
        } else {
            this.props.dispatch({ type: 'POST_TAGS', payload: this.state })
        }
    }
    //this will return my image with the tags
    getImageTags = (imageId) => {
        console.log(imageId);
        this.setState({
            images_id: '' + imageId
        });
        this.props.dispatch({ type: 'GET_IMAGETAGS', payload: imageId })
    }

    handleDelete = (idToDelete) => {
           this.setState({
               tags_id: '' + idToDelete
           });
           this.props.dispatch({ type: 'DELETE_TAGS',payload: idToDelete})
    }

    render() {
        return (

            <div>
                <div className="outerDiv">
                    <div className="imageDiv">
                    {/*mapping the images array and displaying them by index */}
                        {this.props.reduxState.images.map((image, index) => {
                            {/*checking the state which image to display */}
                            return index === this.state.selectedImage ? (
                                <div><h3>Image Title: {image.title}</h3>
                                <img className="imageDesign" 
                                src={image.path} alt={image.id}
                                onLoad={() => this.getImageTags(image.id)} />  </div>
                            ) : '';
                        })}
                    </div>
                    <div className="previousClick">
                        <button onClick={this.handlePreviewClick} >Previous</button>
                    </div>
                    <div className="nextClick">
                        <button onClick={this.handleNextClick}>Next</button>
                    </div>
                </div>
                <div className="outerDiv">

                    <div className="selectTag">
                        <select value={this.props.reduxState.tags.tags_id}
                            onChange={this.handleChange} >
                            <option value="0">Tag Name</option>
                            {this.props.reduxState.tags.map(tag => {
                                return (
                                    <option value={tag.id}> {tag.name} </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="clickTag">
                        <button onClick={this.handleTagClick}>Apply Tag</button>
                    </div>
                    <div className="displayTags">
                        <p>Tags</p>
                        {this.props.reduxState.imageTags.map(imageTag => {
                            return (
                                <li>{imageTag.name}
                                    <button value={imageTag.id} onClick={this.handleDelete}>Delete</button>
                                </li>
                            )
                        })}
                    </div>
                </div>
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