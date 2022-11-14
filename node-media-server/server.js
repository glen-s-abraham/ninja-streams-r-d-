const NodeMediaServer = require('node-media-server');
const spawn = require('child_process').spawn;
const serverUrl = 'rtmp://localhost'
const saveDir = "/home/glen/Videos/"



const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
};

var nms = new NodeMediaServer(config)
nms.run();

nms.on('prePublish', (id, StreamPath, args) => {
    console.log(`Initiate recording at ${serverUrl}${StreamPath}`)
    initiateRecording(serverUrl + StreamPath, saveDir + StreamPath.split('/').pop() + ".mp4");
});

const initiateRecording = (streamUrl, saveDir) => {
    console.log(`recording started for ${streamUrl} and saving to ${saveDir}`)
    let cmd = 'ffmpeg';
    //ffmpeg -rw_timeout 5000000  -i rtmp://localhost:1935/live/STREAM_NAME -c:v copy -c:a copy test.mp4

    var args = [
        '-rw_timeout',
        '5000000',
        '-i',
        streamUrl,
        '-c:v',
        'copy',
        '-c:a',
        'copy',
        saveDir
    ];
    var proc = spawn(cmd, args);

    proc.stdout.on('data', function (data) {
        console.log(data);
    });

    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function (data) {
        console.log(data);
    });

    proc.on('close', function () {
        console.log('finished');
    });
}