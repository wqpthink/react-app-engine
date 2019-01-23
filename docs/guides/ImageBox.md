##ImageBox 组件 #使用场景：
图片显示组件，可以设置选项 clicked，点击浮框查看图片，并可以选择放大、缩小、旋转选项查看图片。 
###组件 api
| 参数 | 说明 |是否必需/默认值 |
| :-------------: | :------------------------------: |:------------------------------: |
| url | 图片资源地址 |是 / null|
| alt | 图片的 alt |否 / ""|
| width | 图片的 width |否 / 100|
| height | 图片的 height |否 / 100|
| clicked | 点击图片是否展示大图 |否 / false|
| imgTitle | 大图的标题 |否 / ""|
| zoom | 大图是否显示缩放按钮 |否 / false|
| zoomOnWheel | 大图是否支持鼠标滑轮显示缩放按钮 |否 / false|
| rotate | 大图是否支持旋转 |否 / false|
| modalSettings | 大图所在 modal 的设置，详情字段见[antd的model的api](https://ant.design/components/modal-cn/)选项|否/false| 
###使用例子：

```js
  render() {
    return (
      <div>
        <ImageBox
          url={url}
          alt="我的图片"
          width={250}
          height={110}
          clicked
          imgTitle="我的图片"
          zoom={true}
          rotate={false}
          modalSettings={{
            title:"nissss"
          }}
        />
      </div>
    );
  }
```
