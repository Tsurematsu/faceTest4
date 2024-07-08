import styles from './training.module.css';
export default function Training(){
    return (<div className={styles.parent}>
        <div className={styles.group}>
            <label className={styles.interpretation}>Interpretación</label>
            <canvas id='training' className={styles.canvas}></canvas>
            <div className={styles.controls}>
                <button className={styles.btn} >{"<"}</button>
                <button className={styles.btn} >{"play"}</button>
                <button className={styles.btn} >{">"}</button>
            </div>
            <div className={styles.controlRange} >
                <input type="range" id="training_range" />
            </div>
            <div className={styles.options}>
                <input type="checkbox" name="" id="option_1" />
                <label htmlFor="option_1">Orientación espacial</label>

                <input type="checkbox" name="" id="option_2" />
                <label htmlFor="option_2">sector</label>

                <input type="checkbox" name="" id="option_3" />
                <label htmlFor="option_3">orientación</label>

                <input type="checkbox" name="" id="option_4" />
                <label htmlFor="option_4">Grabar</label>
            </div>
        </div>
        <div className={styles.group2}>
            <div className={styles.addPanel} ><span>+</span></div>
        </div>
    </div>)
}