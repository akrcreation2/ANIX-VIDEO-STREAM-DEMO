/* ==========================================
   ANiX VIDEO STREAM
   FFmpeg Engine v1.0
========================================== */

const { FFmpeg } = FFmpegWASM;
const { fetchFile } = FFmpegUtil;

const ffmpeg = new FFmpeg();

let ffmpegReady = false;

/* ==========================================
   LOAD FFMPEG
========================================== */

async function initFFmpeg() {

    if (ffmpegReady) return true;

    try {

        console.log("Loading FFmpeg...");

        await ffmpeg.load({

            coreURL: "./libs/ffmpeg-core.js",

            wasmURL: "./libs/ffmpeg-core.wasm",

            workerURL: "./libs/ffmpeg-core.worker.js"

        });

        ffmpegReady = true;

        console.log("✅ FFmpeg Loaded");

        return true;

    } catch (err) {

        console.error("❌ FFmpeg Load Failed");

        console.error(err);

        return false;

    }

}

/* ==========================================
   CHECK STATUS
========================================== */

function isFFmpegReady() {

    return ffmpegReady;

}

/* ==========================================
   TEST
========================================== */

async function testFFmpeg() {

    const ok = await initFFmpeg();

    if (!ok) return;

    try {

        await ffmpeg.exec([

            "-version"

        ]);

        console.log("✅ FFmpeg Working");

    } catch (err) {

        console.error(err);

    }

}

/* ==========================================
   DOWNLOAD FILE
========================================== */

async function downloadVideo(url) {

    await initFFmpeg();

    const data = await fetchFile(url);

    return data;

}

/* ==========================================
   SAVE FILE
========================================== */

async function saveVideo(fileName, data) {

    await initFFmpeg();

    await ffmpeg.writeFile(

        fileName,

        data

    );

}

/* ==========================================
   READ FILE
========================================== */

async function readVideo(fileName) {

    await initFFmpeg();

    return await ffmpeg.readFile(

        fileName

    );

}

/* ==========================================
   DELETE FILE
========================================== */

async function deleteVideo(fileName) {

    await initFFmpeg();

    try{

        await ffmpeg.deleteFile(fileName);

    }catch(e){}

}

/* ==========================================
   GET ENGINE
========================================== */

function getFFmpeg(){

    return ffmpeg;

}

console.log("ANiX FFmpeg Engine Ready");
