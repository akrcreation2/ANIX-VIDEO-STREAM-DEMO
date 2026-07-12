/* ===========================
   ANiX FFmpeg Engine
   Version 1.0
=========================== */

const {
    FFmpeg
} = FFmpegWASM;

const {
    fetchFile
} = FFmpegUtil;

const ffmpeg = new FFmpeg();

let ffmpegReady = false;

async function initFFmpeg(){

    if(ffmpegReady) return;

    try{

        console.log("Loading FFmpeg...");

        await ffmpeg.load();

        ffmpegReady = true;

        console.log("FFmpeg Ready");

    }catch(err){

        console.error(err);

    }

}
