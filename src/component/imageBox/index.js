import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import ImageBox from "./ImageBox";


const para = {
  url: "http://ykfwapp.oss-cn-hangzhou.aliyuncs.com/doctor/2018/03/22/138367860376592384.jpg?Expires=4675286988&OSSAccessKeyId=LTAIXDLmmnPp2xUJ&Signature=6Kx7d3sPfsGwRhOTmg0kjyjck5I%3D"
}
class Testcontainer extends PureComponent {
  handleMenuClick = e => {
    console.log("e:", e);
  };
  render() {
    return (
      <div>
        <ImageBox
          url={para.url}
          alt="我的图片"
          width={250}
          height={110}
          clicked
          imgTitle="我的图片"
          zoom={true}
          rotate={true}
          modalSettings={{
            title:"nissss"
          }}
        />
      </div>
    );
  }
}
ReactDOM.render(<Testcontainer/>, document.getElementById("root"));
