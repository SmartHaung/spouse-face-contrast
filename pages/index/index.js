//index.js
//获取应用实例
Page({
  data: {
    url1: "",
    url2: "",
    score: 0
  },
  addPhoto(index) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var tempUrl = ""
        wx.uploadFile({
          url: 'https://eatingcode.oss-cn-shenzhen.aliyuncs.com',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            name: tempFilePaths[0],
            key: "${filename}",
            policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
            OSSAccessKeyId: "LTAIqMsDdr93vdQu",
            success_action_status: "200",
            signature: "PCjq4vpc4gdt3cmU4XTi3eLB+Ow="
          },
          success: function (res) {
            if (index == 1) {
              that.setData({ url1: tempFilePaths[0].replace("http://tmp/", "http://huangwenbin.xin:8080/") });
            }
            else {
              that.setData({ url2: tempFilePaths[0].replace("http://tmp/", "http://huangwenbin.xin:8080/") });
            }
          }
        })
      }
    })
  },
  addPhotoTwo() {
    this.addPhoto(2)
  },
  addPhotoOne() {
    this.addPhoto(1)
  },
  contrast() {
    var that = this;
    wx.request({
      url: '',
      data: {
        url1: that.data.url1,
        url2: that.data.url2
      },
      success: function (res) {
        that.setData({ score: 100 });
      }
    })
  }
})
