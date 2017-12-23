//index.js
//获取应用实例
Page({
  data: {
    defaultUrl: "http://huangwenbin.xin:8080/add.png",
    url1: "http://huangwenbin.xin:8080/add.png",
    url2: "http://huangwenbin.xin:8080/add.png",
    score: 0,
    hiddenLoading: true
  },
  addPhoto(index) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var picName = "face_" + Math.random().toString(36).substr(2) + tempFilePaths[0].slice(tempFilePaths[0].length - 4, tempFilePaths[0].length);
        wx.uploadFile({
          url: 'https://eatingcode.oss-cn-shenzhen.aliyuncs.com',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            name: picName,
            key: picName,
            policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
            OSSAccessKeyId: "LTAIqMsDdr93vdQu",
            success_action_status: "200",
            signature: "PCjq4vpc4gdt3cmU4XTi3eLB+Ow="
          },
          success: function (res) {
            if (index == 1) {
              that.setData({ url1: "http://huangwenbin.xin:8080/" + picName });
            }
            else {
              that.setData({ url2: "http://huangwenbin.xin:8080/" + picName });
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
    if (this.data.defaultUrl == this.data.url1 || this.data.defaultUrl == this.data.url2) {
      wx.showToast({
        title: "请选择图片",
        duration: 2000
      })
      return
    }
    var that = this;
    that.setData({ hiddenLoading: false });
    wx.request({
      url: 'https://www.huangwenbin.xin/interface/face/contrast?url1=' + that.data.url1 + "&url2=" + that.data.url2,
      success: function (res) {
        that.setData({ hiddenLoading: true });
        if (res && res.data && res.data.response && res.data.response.code && res.data.response.code == 1001) {
          that.setData({ score: res.data.response.faceContrastResult.score });
        }
        else {
          wx.showToast({
            title: "测试失败",
            duration: 2000
          })
        }
      }
    })
  }
})
