let THISctx = null;

/**
 * Sets the context for drawing operations.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 */
function setContext(context){
    THISctx = context;
}

/**
 * Clears the canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 * */
function clearCanvas({ctx}){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Draws text on the canvas.
 * @param {Object} param0
 * @param {string} param0.text - The text to draw.
 * @param {Object} param0.point - The point where to draw the text.
 * @param {string} [param0.color='black'] - The color of the text.
 * @param {CanvasRenderingContext2D} [param0.ctx=null] - The canvas context.
 */
function drawText({text, point, color = 'black', ctx = null}){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    ctx.fillText(text, point.x, point.y);
}

/**
 * Draws a line across the entire canvas.
 * @param {Object} param0
 * @param {Object|number} param0.point - The point or coordinate for the line.
 * @param {string} [param0.color='blue'] - The color of the line.
 * @param {CanvasRenderingContext2D} param0.ctx - The canvas context.
 * @param {boolean} [param0.horizontal=false] - Whether to draw a horizontal line.
 * @param {boolean} [param0.vertical=false] - Whether to draw a vertical line.
 */
function drawLineAll({point, color = 'blue', ctx, horizontal=false, vertical=false}) {
    if (typeof point !== 'object') {point = {x: point, y: point};}
    if (horizontal) {
        drawLine({startPoint: {x: 0, y: point.y}, endPoint: {x: ctx.canvas.width, y: point.y}, color, ctx});
    }
    if (vertical) {
        drawLine({startPoint: {x: point.x, y: 0}, endPoint: {x: point.x, y: ctx.canvas.height}, color, ctx});
    }
}

/**
 * Draws multiple lines across the entire canvas.
 * @param {Object} param0
 * @param {Array} param0.points - An array of points or coordinates for the lines.
 * @param {string} [param0.color='blue'] - The default color of the lines.
 * @param {CanvasRenderingContext2D} param0.ctx - The canvas context.
 */
function drawLinesAll({points, color = 'blue', ctx}) {
    for (const element of points) {
        drawLineAll({point:element.point, color:element.color??color, ctx, horizontal: element.horizontal??null, vertical:element.vertical??null});
    }
}

/**
 * Draws lines connecting a series of points.
 * @param {Object} param0
 * @param {Array} param0.points - An array of points to connect.
 * @param {string} [param0.color='blue'] - The color of the lines.
 * @param {CanvasRenderingContext2D} [param0.ctx=null] - The canvas context.
 */
function drawPointLines({points, color = 'blue', ctx = null}){
    if (ctx == null) {ctx = THISctx;}
    ctx.strokeStyle = color;
    for (let i = 0; i < points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.stroke();
    }
}

/**
 * Draws a series of horizontal or vertical lines.
 * @param {Object} param0
 * @param {Array} param0.points - An array of points for the lines.
 * @param {Object} [param0.basePoint={x:100, y:100}] - The base point for drawing.
 * @param {string} [param0.color='blue'] - The color of the lines.
 * @param {CanvasRenderingContext2D} param0.ctx - The canvas context.
 * @param {number} [param0.separation=10] - The separation between lines.
 * @param {boolean} [param0.horizontal=true] - Whether to draw horizontal lines.
 * @param {boolean} [param0.vertical=false] - Whether to draw vertical lines.
 */
function drawHLines({
    points, 
    basePoint={x:100, y:100}, 
    color='blue', 
    ctx, 
    separation=10, 
    horizontal = true, 
    vertical = false
}){
    // ... (rest of the function remains the same)
}

/**
 * Draws multiple points on the canvas.
 * @param {Object} param0
 * @param {Array} param0.points - An array of points to draw.
 * @param {string} [param0.color='blue'] - The default color of the points.
 * @param {CanvasRenderingContext2D} [param0.ctx=null] - The canvas context.
 * @param {number} [param0.radio=2] - The radius of the points.
 */
function drawPoints({points, color = 'blue', ctx = null, radio = 2}){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    for (const point of points) {
        if (point.color != undefined) ctx.fillStyle = point.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radio, 0, 2 * Math.PI);
        ctx.fill();
    }
}

/**
 * Draws a box on the canvas.
 * @param {Object} param0
 * @param {Object} param0.dimencion - The dimensions of the box.
 * @param {string} [param0.color='red'] - The color of the box.
 * @param {CanvasRenderingContext2D} [param0.ctx=null] - The canvas context.
 */
function drawBox({dimencion, color = 'red', ctx = null}){
    if (ctx == null) {ctx = THISctx;}
    ctx.strokeStyle = color;
    ctx.beginPath();
    if (dimencion.xMin !== undefined && dimencion.yMin !== undefined) {
        ctx.rect(dimencion.xMin, dimencion.yMin, dimencion.width, dimencion.height);
    }else{
        ctx.rect(dimencion.x, dimencion.y, dimencion.width, dimencion.height);
    }
    ctx.stroke();
}

/**
 * Draws a line on the canvas.
 * @param {Object} param0
 * @param {Object} param0.startPoint - The starting point of the line.
 * @param {Object} param0.endPoint - The ending point of the line.
 * @param {string} [param0.color='red'] - The color of the line.
 * @param {CanvasRenderingContext2D} [param0.ctx=null] - The canvas context.
 */
function drawLine({startPoint, endPoint, color='red', ctx=null}){
    if (ctx == null) {ctx = THISctx;}
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
}

/**
 * Draws a line from a base point to another point.
 * @param {Object} param0
 * @param {Object} param0.point - The point to draw to.
 * @param {Object} param0.basePoint - The base point to draw from.
 * @param {string} [param0.color='red'] - The color of the line.
 * @param {CanvasRenderingContext2D} param0.ctx - The canvas context.
 * @returns {Object} The sum of the vectors.
 */
function drawLineBasePoint({point, basePoint, color='red', ctx}){
    const sumaVectores = {x: point.x + basePoint.x, y: point.y + basePoint.y};
    drawLine({startPoint: basePoint, endPoint: sumaVectores, color, ctx});
    return sumaVectores;
}

/**
 * Draws a single point on the canvas.
 * @param {Object} param0
 * @param {Object} param0.point - The point to draw.
 * @param {string} [param0.color='blue'] - The color of the point.
 * @param {CanvasRenderingContext2D} [param0.ctx=null] - The canvas context.
 * @param {number} [param0.radio=2] - The radius of the point.
 */
function drawPoint({point, color = 'blue', ctx = null, radio=2}){
    if (ctx == null) {ctx = THISctx;}
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radio, 0, 2 * Math.PI);
    ctx.fill();
}

export default {
    points: drawPoints,
    box: drawBox,
    line: drawLine,
    point: drawPoint,
    setContext: setContext,
    pointLines: drawPointLines,
    text: drawText,
    HLines: drawHLines,
    LinesAll: drawLinesAll,
    LineAll: drawLineAll,
    LineBasePoint: drawLineBasePoint,
    clear: clearCanvas
}