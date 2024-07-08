import dataStore from "../utils/dataStore.js";
let data = dataStore.exist() ? dataStore.get() : [];
export default function training({TensorFlow, ctx}){
    let status_loop = false;
    let keyPoints = {};
    const canvas = document.getElementById('training');
    const ctx_graphic = canvas.getContext('2d');
    const inputRange = document.getElementById('training_range');
    const option_4 = document.getElementById('option_4');
    inputRange.value = 0;
    inputRange.min = 0;
    inputRange.max = 500;
    option_4.addEventListener('change', (e) => {
        const labelRight = document.querySelector('label[for=option_4]');
        if (!e.target.checked) {
            labelRight.innerHTML = "Grabar";
            status_loop = false;
            dataStore.set(data);
        }
        if (e.target.checked) {
            labelRight.innerHTML = "Guardar";
            if (data.length > 0) {data = [];}
            status_loop = true;
            loopPose();
        }
    });

    inputRange.addEventListener('input', (e) => {
        console.log(e.target.value);
    });


    async function loopPose() {
        console.log("grabando...");
        const response = await TensorFlow.detectPose();
        const keyPoints_pose = response.poses;
        const keyPoints_hand = response.hands
        keyPoints = {
            pose: keyPoints_pose.length > 0 ? keyPoints_pose[0].keypoints : [],
            hand_1: keyPoints_hand.length > 0 ? keyPoints_hand[0].keypoints : [],
            hand_2: keyPoints_hand.length > 1 ? keyPoints_hand[1].keypoints : [] 
        }
        data.push(keyPoints);
        inputRange.value = data.length;
        if (data.length > 500) {
            status_loop = false;
            option_4.checked = false;
            dataStore.set(data);
        }
        if (status_loop) {loopPose();}
    }
}