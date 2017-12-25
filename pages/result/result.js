//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        score: 0,
        tips: ''
    },
    onLoad: function (options) {
        console.log(options)
        const score = parseInt(options.score || 0);
        this.setData({
            score: score,
            tips: this._getTips(score)
        });
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
    }
})