import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
export default new function TensorFlow(){
    const frameCanvas = document.createElement('canvas');
    const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });
    let ready = false;
    let ready_Video = false;
    this.video = null;
    this.messages = null; 
    this.loadVideo = async function(video=null){
        if (video == null) return "video not found";
        this.messages||console.log('loading video ->', video);
        this.video = video;
        await new Promise((resolve, reject)=>{
            this.video.addEventListener('loadedmetadata', (e)=>{
                this.messages||console.log('video loaded');
                resolve();
            });
        });
        return true;
    };
    this.load = async function(){
        this.messages||console.log('loading tensorflow');
        await tf.ready()
        this.messages||console.log('loading pose detection');
        const model_pose = poseDetection.SupportedModels.MoveNet;
        this.detector_pose = await poseDetection.createDetector(model_pose);
        this.messages||console.log('loading hand pose detection');
        const model_hands = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
            runtime: 'tfjs',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
            modelType: 'full'
        }
        this.detector_hand = await handPoseDetection.createDetector(model_hands, detectorConfig);
        this.messages||console.log('tensorflow ready');
        ready = true;
    }
    this.analice = async (frame=null)=>{return true};
    this.detectPose = async function(input={}){
        const {video=null, msg=true} = input;
        msg||console.log('detecting pose');
        if (!ready) {await this.load();}
        if (!ready_Video) {await this.loadVideo();}
        if (this.video == null) {if (video == null) {return "video not found";}this.video = video;}
        frameCanvas.width = this.video.videoWidth;
        frameCanvas.height = this.video.videoHeight;
        frameCtx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
        const frame = frameCtx.getImageData(0, 0, frameCanvas.width, frameCanvas.height)
        msg||console.log('getting frame');
        const response = await this.analice(frame);
        if (response == false) {return;}
        msg||console.log('analysing frame');
        const hands = await this.detector_hand.estimateHands(frame);
        const poses = await this.detector_pose.estimatePoses(frame);
        msg||console.log('pose detected ->', poses);
        msg||console.log('hands detected ->', hands);
        return {hands, poses, response};
    }
}