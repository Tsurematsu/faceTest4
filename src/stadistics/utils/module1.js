export default function module1(){ //prototype
    this.cache = {};
    
    /**
     * 
     * @param {*} listPoints [{x:0, y:0}, {x:1, y:1}, ...]
     * @returns {x:[], y:[]}
     */
    this.separatePoints = (listPoints) => {
        let separate = {x:[], y:[] };
        listPoints.forEach(punto => {
            separate.x.push(Math.floor(punto.x));
            separate.y.push(Math.floor(punto.y));
        });
        this.cache.separatePoints = separate;
        return this.cache.separatePoints;
    }

    /**
 }  * @param {*} list [0, 1, 2, 3, 4, 5]
    * @returns {lower: 0, upper: 5} 
    */
    this.amplitude = (list) => {
        if (list.length === 0) return {upper: 0, lower: 0};
        this.cache.amplitude = {
            upper: Math.max(...list),
            lower: Math.min(...list)
        }
        return this.cache.amplitude;
    }

    /**
    * @param {*} amplitude {x: {upper: 0, lower: 0}, y: {upper: 0, lower: 0}}
    * @returns {width: 0, height: 0} equivalent to area size 
    * */
    this.area = (amplitude) => {
        this.cache.area = {
            width: amplitude.x.upper - amplitude.x.lower,
            height: amplitude.y.upper - amplitude.y.lower
        }
        return this.cache.area;
    }

    /**
     * @param {*} amplitude {x: {upper: 0, lower: 0}, y: {upper: 0, lower: 0}}
     * @param {*} area {width: 0, height: 0}
     * @returns {x: 0, y: 0} middle point of the area, this point is the center of the area
     *  the point total is the center of the canvas
     */
    this.middlePoint = (amplitude, area)=>{
        this.cache.middlePoint = {
            x: amplitude.x.lower + area.width/2,
            y: amplitude.y.lower + area.height/2
        }
        return this.cache.middlePoint;
    }
    
    /**
     * @param {*} middlePoint {x: 0, y: 0}
     * @returns {x: 0, y: 0} orientation of the middle point
     */
    this.orientation = (middlePoint, remanent=null) => {
        if (remanent !== null) {
            this.cache.orientation = {
                x: middlePoint.x - remanent.x,
                y: middlePoint.y - remanent.y,
            }
            remanent.x = middlePoint.x;
            remanent.y = middlePoint.y;
            return this.cache.orientation
        }
    }

    /**
     * @returns {x: 0, y: 0, width: 0, height:
     * 0} remanent point of the last middle point
     */
    this.getRemanent = () => {
        if (!this.cache.remanent) this.cache.remanent = {x:0, y:0, width:0, height:0};
        return this.cache.remanent;
    }

    /**
     * @param {*} orientation {x: 0, y: 0}
     * @returns {point: {x: 0, y: 0}, distance: 0} orientation grade
     * point is the orientation of the middle point
     * distance is the distance from the middle point to the remanent point
     */
    this.orientationGrade = (orientation = {x:1, y:1}) => {
        const AbsAngle = Math.atan2(orientation.y, orientation.x);
        const AbsDistance = Math.sqrt(orientation.x**2 + orientation.y**2);
        const AbsAngleDeg = {
            x: Math.cos(AbsAngle),
            y: Math.sin(AbsAngle),
        };
        
        // Convertir el ángulo a grados y ajustar al rango 0-360
        let degrees = (AbsAngle * 180 / Math.PI + 360) % 360;

        this.cache.orientationGrade = {
            point: AbsAngleDeg,
            distance: AbsDistance,
            angle: degrees
        };
    
        return {
            point: AbsAngleDeg,
            distance: AbsDistance,
            angle: degrees
        };
    };

    this.getDistance = (point1, point2) => {
        return Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);
    };

    this.sumVectors = (vector1, vector2) => {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y
        }
    }

  
}



