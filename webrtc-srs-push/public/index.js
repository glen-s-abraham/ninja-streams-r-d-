sdk = new SrsRtcPublisherAsync();

// For example: webrtc://r.ossrs.net/live/livestream
//var url = "webrtc://localhost:8000/live/livestream";
var url = "webrtc://192.168.1.8/live/chakka";

sdk.publish(url).then(function(session){
    console.log(session);
}).catch(function (reason) {
    if (reason instanceof SrsError) {
        if (reason.name === 'HttpsRequiredError') {
            alert(`WebRTC推流必须是HTTPS或者localhost：${reason.name} ${reason.message}`);
        } else {
            alert(`${reason.name} ${reason.message}`);
        }
    }
    // See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#exceptions
    if (reason instanceof DOMException) {
        if (reason.name === 'NotFoundError') {
            alert(`找不到麦克风和摄像头设备：getUserMedia ${reason.name} ${reason.message}`);
        } else if (reason.name === 'NotAllowedError') {
            alert(`你禁止了网页访问摄像头和麦克风：getUserMedia ${reason.name} ${reason.message}`);
        } else if (['AbortError', 'NotAllowedError', 'NotFoundError', 'NotReadableError', 'OverconstrainedError', 'SecurityError', 'TypeError'].includes(reason.name)) {
            alert(`getUserMedia ${reason.name} ${reason.message}`);
        }
    }
    sdk.close();;
    console.error(reason);
});

