import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Icon } from "antd";
import 'antd/dist/antd.css';
import { RotateWrapper } from "./style";

class ImageModal extends PureComponent {

  state = {
    width: 550,
    height: 550,
    imgRotate: 0
  }
  //// 控制滚轮缩放
  zoomPicture = (onWheelEvent) => {
    let e = onWheelEvent;
    let imageModalWidth = parseInt(this.state.width);

    // 计算缩放后的大小 每一次滚轮 100px
    let calcWidth = imageModalWidth - e.deltaY;

    // 限制最大 width = 400
    if (calcWidth >= 2000) {
      return;
    }

    // 不让modal由于缩小消失在视野中 限制最小 width = 100
    if (calcWidth < 100) {
      return;
    }
    this.setState({
      width: calcWidth,
      height: calcWidth
    });
    // dom.style.width = `${calcWidth}px`;
  };
  //控制按钮缩放
  zoomIn = () => {
    let calcWidth = this.state.width;
    calcWidth += 50;
    if (calcWidth >= 2000) {
      return;
    }
    this.setState({
      width: calcWidth,
      height: calcWidth
    });
  }

  zoomOut = () => {
    let calcWidth = this.state.width;
    calcWidth -= 50;
    if (calcWidth <= 100) {
      return;
    }
    this.setState({
      width: calcWidth,
      height: calcWidth
    });
  }

  //图片右旋转
  handleRotateRight = () => {
    this.setState({ imgRotate: this.state.imgRotate + 90 });
  }
  //图片左旋转
  handleRotateLeft = () => {
    this.setState({ imgRotate: this.state.imgRotate - 90 })
  }

  openImg = (url) => {
    window.open(url)
  }

  render() {
    const {
      src,
      onCancel,
      imgTitle,
      zoomOnWheel,
      zoom,
      rotate,
      visible,
      alt,
      modalSettings: { ...modalSettings }
    } = this.props;
    return (
      <Modal
        centered
        width={800}
        zIndex={1000}
        bodyStyle={{
          height: "600px",
          width: "780px",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        }}
        visible={visible}
        title={imgTitle}
        onCancel={onCancel}
        getContainer={() => document.getElementById("root")}
        footer={[
          <Button key="back" onClick={() => this.openImg(src)}>
            打开图片
          </Button>
        ]}
        {...modalSettings}
      >
        <RotateWrapper>
          {
            rotate ? (
              <span>
                <Icon type="undo" style={{ fontSize: '22px', marginRight: "10px" }} onClick={() => this.handleRotateLeft(src)} />
                <Icon type="redo" style={{ fontSize: '22px', marginRight: "10px" }} onClick={() => this.handleRotateRight(src)} />
              </span>
            ) : ""
          }
          {
            zoom ? (
              <span>
                <Icon type="zoom-in" style={{ fontSize: '22px', marginRight: "10px" }} onClick={() => this.zoomIn()} />
                <Icon type="zoom-out" style={{ fontSize: '22px', marginRight: "10px" }} onClick={() => this.zoomOut()} />
              </span>
            ) : ""
          }
        </RotateWrapper>
        <img style={{ transform: `rotate(${this.state.imgRotate}deg)` }} src={src} alt={alt} width={this.state.width} height={this.state.height} onWheel={e => zoomOnWheel && this.zoomPicture(e, this.refs.imageModal)} />
      </Modal>
    );
  }
}



export default ImageModal;
