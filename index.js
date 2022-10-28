window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const stickSegments = makeStick(new Point(10, 10), new Point(100, 100), 10);
    console.log(stickSegments.length);
    stickSegments.forEach(segment => {
        drawLine(ctx, segment);
    });
});

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Segment(point1, point2) {
    this.startPoint = point1;
    this.endPoint = point2;
}

function drawLine(ctx, segment) {
    ctx.beginPath();
    ctx.moveTo(segment.startPoint.x, segment.startPoint.y);
    ctx.lineTo(segment.endPoint.x, segment.endPoint.y);
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function makeStick(point1, point2, offset) {
    const segmentList = [new Segment(point1, point2)];
    for (let i = 0; i < 2; i++) {
        const size = segmentList.length;
        for (let j = 0; j <= size; j++) {
            const seg = segmentList.splice(j, 1)[0];
            const midPoint = getMidPoint(seg.startPoint, seg.endPoint);
            const angle = getAngle(seg.startPoint, seg.endPoint);
            const point = getRandomPerpendicularPoint(midPoint, angle, offset);
            segmentList.push(new Segment(seg.startPoint, point));
            segmentList.push(new Segment(point, seg.endPoint));
            if (getRandomInt(2) === 1) {
                segmentList.push(splitSegment(seg.startPoint, point));
            }
        }
        offset /= 2;
    }

    return segmentList;
}

function getRandomPerpendicularPoint(midPoint, angle, offset) {
    const dist = Math.ceil(Math.random() * offset);
    const pointOptionOne = new Point(
        Math.sin(angle) * dist + midPoint.x,
        -Math.cos(angle) * dist + midPoint.y
    );
    const pointOptionTwo = new Point(
        -Math.sin(angle) * dist + midPoint.x,
        Math.cos(angle) * dist + midPoint.y
    );

    return Math.round(Math.random()) ? pointOptionOne : pointOptionTwo;
}

function splitSegment(startPoint, midPoint) {
    const direction = getAngle(startPoint, midPoint);
    const dist = midPoint.x - startPoint.x;
    const endPoint = new Point((Math.sin(direction) * dist) + midPoint.x, (Math.cos(direction) * dist) + midPoint.y);
    return new Segment(midPoint, endPoint);
}

function getMidPoint(point1, point2) {
    return new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
}

function getAngle(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
