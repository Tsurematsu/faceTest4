import TensorFlow from './tensorflow/tensorflow.js'
import training from './training/training.js';
export default async function main({Elementos}){
    window.onload = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true,audio: false});
        const elementoHTML = document.getElementById(1);
        elementoHTML.srcObject = stream;
        elementoHTML.play();
        elementoHTML.muted = true;
        await TensorFlow.loadVideo(elementoHTML);
        const CanvasVideo = document.getElementById('canvas_1');
        CanvasVideo.width = elementoHTML.videoWidth;
        CanvasVideo.height = elementoHTML.videoHeight;
        const ctx = CanvasVideo.getContext('2d');
        // await TensorFlow.load();
        training({TensorFlow, ctx});
    }
}