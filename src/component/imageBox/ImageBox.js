import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import 'antd/dist/antd.css';
import ImageModal from './ImageModal';

class ImageBox extends PureComponent {

  state = {
    showImg: false,
  }
  cliclkImg = () => {
    if (this.props.clicked) {
      this.setState({
        showImg: true
      });
    }
  }
  closeImg = () => this.setState({ showImg: false });

  render() {
    const {
      url,
      alt,
      width,
      height,
      clicked,
      imgTitle,
      zoom,
      zoomOnWheel,
      rotate,
      modalSettings
    } = this.props;
    const { showImg } = this.state;
    return (
      <div>
        <img src={url} alt={alt} width={width} height={height} onClick={this.cliclkImg} />
        {
          showImg ?
            (<ImageModal modalSettings={modalSettings} imgTitle={imgTitle} alt={alt} visible={this.state.showImg} onCancel={() => this.closeImg()} src={url} zoom={zoom} zoomOnWheel={zoomOnWheel} rotate={rotate} {...modalSettings}></ImageModal>) : ""
        }
      </div>
    );
  }
}


ImageBox.defaultProps = {
  alt: "图片",
  width: 100,
  height: 100,
  clicked: false,
  zoom: false,
  zoomOnWheel:false,
  rotate: false,
};
ImageBox.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageBox;
