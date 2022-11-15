const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const spawn = require('child_process').spawn;

ffmpeg.setFfmpegPath(ffmpegInstaller.path);


const generateHlsChunks=(sourcePath,destinationDir)=>{
    let cmd = 'ffmpeg';
    //ffmpeg -rw_timeout 5000000  -i rtmp://localhost:1935/live/STREAM_NAME -c:v copy -c:a copy test.mp4

    var args = [
            '-i',
            sourcePath,
            '-profile:v',
            'baseline',
            '-level',
            '3.0',
            '-start_number',
            '0',
            '-hls_time',
            '10',
            '-hls_list_size',
            '0',
            '-f',
            'hls',
            destinationDir
    ]
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
    // ffmpeg(sourcePath,{timeout:432000}).addOptions([
    //     '-profile:v baseline',
    //     '-level 3.0',
    //     '-start_number 0',
    //     'hls_time 10',
    //     '-hls_list_size 0',
    //     '-f hls'
    // ]).output(`${destinationDir}output.m3ud`)
    // .on('start',commandLine=>
    //     console.log('Spawned Ffmpeg with command: ' + commandLine)
    // ).on('error',err=>console.error(err))
    // .on('end',()=>{
    //     console.log(`Chunks written to ${destinationDir}`);
    // })
}


generateHlsChunks('/home/glen/Videos/1Introduction.mp4','/home/glen/Videos/1Introduction/chunk');