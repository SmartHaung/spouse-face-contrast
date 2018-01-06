//index.js
//获取应用实例
Page({
  onShareAppMessage: function () {
    return {
      title: '测测夫妻相',
      path: 'pages/index/index'
    }
  },
  data: {
    defaultUrl: "./add.png",
    url1: "./add.png",
    url2: "./add.png",
    score: 0,
    hiddenLoading: true,
    showResult: false,
    tips: ''
  },
  _getTips: function (score) {
    if (score == -1) {
      return '额，客官，我有个不太成熟的小建议，您可否，重新选择，两张正常的照片呢ㄟ( ▔, ▔ )ㄏ';
    } else if (score > -1 && score <= 30) {
      return '我觉得我们还是测测手相吧ㄟ( ▔, ▔ )ㄏ';
    } else if (score > 30 && score < 60) {
      return '听说，待在一起久了的情侣才有夫妻相，可能你们是异地恋吧ㄟ( ▔, ▔ )ㄏ';
    } else if (score >= 60 && score < 80) {
      return '身无彩凤双飞翼，心有灵犀一点通。革命尚未成功，同志仍需努力。';
    } else if (score >= 80 < 99) {
      return '此时此刻是个好日子，我觉得你们可以去领证了，或者，对ta说一句，我爱你';
    } else if (score == 99) {
      return '少了一分，可能是怕骄傲吧';
    } else if (score == 100) {
      return '哇哦，您确定要和自己结婚吗ㄟ( ▔, ▔ )ㄏ';
    } else if (score > 100) {
      return '这个，肯定是我们出故障了';
    }
  },
  addPhoto(index) {
    var that = this;
    that.setData({
      score: 0,
      showResult: false
    });
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var picName = "face_" + new Date().getFullYear() + ('00' + (new Date().getMonth() + 1)).slice(-2) + ('00' + new Date().getDate()).slice(-2) + Math.random().toString(36).substr(6) + tempFilePaths[0].slice(tempFilePaths[0].length - 4, tempFilePaths[0].length);
        wx.uploadFile({
          url: 'https://userpicture.oss-cn-shenzhen.aliyuncs.com',
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
              that.setData({
                url1: "https://userpicture.oss-cn-shenzhen.aliyuncs.com/" + picName
              });
            } else {
              that.setData({
                url2: "https://userpicture.oss-cn-shenzhen.aliyuncs.com/" + picName
              });
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
    wx.showLoading();
    wx.request({
      url: 'https://www.huangwenbin.xin/localinterface/face/contrast?url1=' + that.data.url1 + "&url2=" + that.data.url2,
      success: function (res) {
        if (res && res.data && res.data.response && res.data.response.code && res.data.response.code == 1003 && res.data.response.msg == "其他程序处理中") {

        } else if (res && res.data && res.data.response && res.data.response.code && res.data.response.code == 1001) {
          that.setData({
            score: parseInt(res.data.response.faceContrastResult.score || 0),
            tips: that._getTips(parseInt(res.data.response.faceContrastResult.score || 0)),
            showResult: true
          });
          wx.hideLoading();
        } else if (res && res.data && res.data.response && res.data.response.code && res.data.response.code != 1001) {
          that.setData({
            score: -1,
            tips: that._getTips(-1),
            showResult: true
          });
          wx.hideLoading();
        }
      }
    })
    setTimeout(function () {
      wx.request({
        url: 'https://www.huangwenbin.xin/interface/face/contrast?url1=' + that.data.url1 + "&url2=" + that.data.url2,
        success: function (res) {

          if (res && res.data && res.data.response && res.data.response.code && res.data.response.code == 1003 && res.data.response.msg == "其他程序处理中") {

          } else {
            if (res && res.data && res.data.response && res.data.response.code && res.data.response.code == 1001) {
              that.setData({
                score: parseInt(res.data.response.faceContrastResult.score || 0),
                tips: that._getTips(parseInt(res.data.response.faceContrastResult.score || 0)),
                showResult: true
              });
              wx.hideLoading();
            } else {
              that.setData({
                score: -1,
                tips: that._getTips(-1),
                showResult: true
              });
              wx.hideLoading();
            }
          }
        }
      })
    }.bind(that), 500)
  }
})