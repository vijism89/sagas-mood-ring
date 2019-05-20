import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageForm.css';


class ImageForm extends Component {
    state = {
        selectedImage: 0
    }
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            tags_id: event.target.value
        })
    }
    //this function will increase the value by 1
    handleNextClick = () => {
        this.setState((state) => {
            return { selectedImage: state.selectedImage === 4 ? 0 : state.selectedImage + 1 }
        });
        // this.props.dispatch({ type: 'GET_IMAGES'})
    }
    //this will decrease my value by 1
    handlePreviewClick = () => {
        this.setState((state) => {
            return { selectedImage: state.selectedImage === 0 ? 4 : state.selectedImage - 1 }
        });
    }

    handleTagClick = () => {
        this.props.dispatch({ type: 'GET_TAGS' })
    }

    getImageTags = (imageId) => {
        console.log(imageId)
        this.props.dispatch({ type: 'GET_IMAGETAGS', payload: imageId })
    }

    render() {
        return (
            <div>
                <div className="outerDiv">
                    <div className="previewClick">
                        <button onClick={this.handlePreviewClick} >Previous</button>
                    </div>
                    <div className="imageDiv">
                        {this.props.reduxState.images.map((image, index) => {
                            return index === this.state.selectedImage ? (
                                <img className="imageDesign" src={image.path} alt={image.id} onLoad={() => this.getImageTags(image.id)} />
                            ) : '';
                        })}
                    </div>
                    <div className="nextClick">
                        <button onClick={this.handleNextClick}>Next</button>
                    </div>
                </div>
                <div>
                    <select value={this.props.reduxState.tags.tags_id} onChange={this.handleChange}>
                        <option value="0">Tag Name</option>
                        {this.props.reduxState.tags.map(tag => {
                            return (
                                <option value={tag.id}> {tag.name} </option>
                            )
                        })}
                    </select>
                    <div>
                        <button onClick={this.handleTagClick}>Apply Tag</button>
                    </div>
                </div>
                <div>
                    <p>Tags</p>
                    
                    {this.props.reduxState.imageTags.map(imageTag => {
                        return (
                            <li>{imageTag.name}</li>
                        )
                    })}
                    
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