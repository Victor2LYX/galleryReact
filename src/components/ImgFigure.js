/**
 * Created by lyx on 2017/11/30.
 */
require('normalize.css/normalize.css');
require('styles/ImgFigure.scss');

import React from 'react';
class ImgFigure extends React.Component {


    render(){
        var styleObj = {};
        if(this.props.arrange.pos)
        {
            styleObj = this.props.arrange.pos;
        }

        return (
            <figure className="img-figure" style={styleObj}>
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

ImgFigure.defaultProps = {

};
ImgFigure.propTypes = {

};

export default ImgFigure;
