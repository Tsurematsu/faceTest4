import styles from './VideoComponent.module.css';
// import { useRef } from 'react';
// import script from './VideoComponent.js';
export default function VideoComponent({id}) {

    return (<div className={styles.parent}>
        <div className={styles.videoModule} >
            <video id={id} src=""></video>
            <canvas id={`canvas_${id}`}></canvas>
        </div>
    </div>);
}