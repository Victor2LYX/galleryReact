require('normalize.css/normalize.css');
require('styles/Main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure';

// 获取图片数据
let imageDatas = require('../data/imageDatas.json');
// 将图片名信息转成图片URL路径信息
imageDatas = (function getImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);

/*
 * 获取区间内的一个随机值
 */
function getRangeRandom (low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
};
/*
 * 获取 0~30° 之间的一个任意正负值
 */
function get30DegRandom() {
    return Math.ceil(Math.random() * 60 - 30);
};

class AppComponent extends React.Component {
    Constant = {
        centerPos: {
            left: 0,
            top: 0
            },
        hPosRange: {   // 水平方向的取值范围
            leftSecX:[0, 0],
            rightSecX:[0, 0],
            y: [0, 0]
            },
        vPosRange: {    // 垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
            }
        };
    /*
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */
    rearrange(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取

            topImgSpliceIndex = 0,
            //先取出需要居中的图片，设置位置信息
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
            // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
            imgsArrangeCenterArr[0] = {
                pos: centerPos,
                rotate: 0,
                isCenter: true
            };
        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
            //alert(imgsArrangeTopArr[index].pos.top + '|'+ imgsArrangeTopArr[index].pos.left );
        });
        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;
            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
                };
        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });

    }

    constructor(props) {
        super(props);
        //数组对象，用来存储图片的布置信息
        this.state = {
            imgsArrangeArr: [
                /*{
                 pos: {
                 left: '0',
                 top: '0'
                 },
                 rotate: 0,    // 旋转角度
                 isInverse: false,    // 图片正反面
                 isCenter: false,    // 图片是否居中
                 }*/
            ]
        };
    }

    //加载完成后，计算图片的位置范围
    componentDidMount() {

        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
        // 拿到一个imageFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
        //alert(stageW+'|' + stageH+'|'+ imgW+'|'+ imgH+'|');
        //this.Constant = {
        //    centerPos: {
        //        left: halfStageW - halfImgW,
        //        top: halfStageH - halfImgH
        //    },
        //    hPosRange: {   // 水平方向的取值范围
        //        leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
        //        rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
        //        y: [-halfImgH, stageH - halfImgH]
        //    },
        //    vPosRange: {    // 垂直方向的取值范围
        //        x: [halfStageW - imgW, halfStageW],
        //        topY: [-halfImgH, halfStageH - halfImgH * 3]
        //    }
        //};
        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };
        // 计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        // 计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;
        //alert(this.Constant.hPosRange.leftSecX[0]+'|' + this.Constant.hPosRange.leftSecX[1]+'|'
        //    + this.Constant.hPosRange.rightSecX[0]+'|' + this.Constant.hPosRange.rightSecX[1]+'|'
        //    + this.Constant.hPosRange.y[0]+'|' + this.Constant.hPosRange.y[1]+'|'
        //    + this.Constant.vPosRange.topY[0]+'|' + this.Constant.vPosRange.topY[1]+'|'
        //    +  this.Constant.vPosRange.x[0]+'|' +  this.Constant.vPosRange.x[1]);
        this.rearrange(0);
    }

    render() {
        var controllerUnits = [],
            imgFigures = [];
        imageDatas.forEach(function (eleData, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }
            imgFigures.push(<ImgFigure data={eleData} key={index} ref={'imgFigure' + index}
                                       arrange={this.state.imgsArrangeArr[index]}></ImgFigure>);

        }.bind(this));

        return (
            <div className="stage">
                <section className="img-sec" ref="stage">
                    {imgFigures}
                </section>
                <nav className="controller-nav">

                </nav>
            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
