require('normalize.css/normalize.css');
require('styles/App1.scss');

import React from 'react';


// 获取图片数据
let imageDatas = require('../data/imageDatas.json');
// 将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr){
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/'+ singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <div className="stage">
            <section className="img-sec" >
13
            </section>
          <nav className="controller-nav">
123
          </nav>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
