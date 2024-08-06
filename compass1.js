let _heading = 45;

class Compass {
    constructor(size) {
        var _a;
        this.size = size;
        this.container = document.createElement("div");
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.drawCanvas = () => {
            requestAnimationFrame(this.drawCanvas);
            // Clear canvas
            this.ctx.globalCompositeOperation = "source-over";
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const degrees = _heading; // coordinatesToDegrees(coords.x, coords.y);
            const WIDTH_90_DEG = this.canvas.width / 2;
            const WIDTH_360_DEG = this.canvas.width * 2;
            const offset = WIDTH_90_DEG - (degrees / 360) * WIDTH_360_DEG;
            this.drawMarkings(offset - WIDTH_360_DEG);
            this.drawMarkings(offset);
            this.drawMarkings(offset + WIDTH_360_DEG);
            this.drawHeading(degrees);
        };
        this.pixelRatio = (_a = Math.round(devicePixelRatio)) !== null && _a !== void 0 ? _a : 1;
        this.size = size * this.pixelRatio;
        this.canvas.width = this.size;
        this.canvas.height = this.size / 4;
        this.canvas.style.width = this.size / this.pixelRatio + "px";
        this.canvas.style.height = this.size / 4 / this.pixelRatio + "px";
        this.canvas.style.margin = "1em";
        this.drawCanvas();
        requestAnimationFrame(this.drawCanvas);
        this.container.appendChild(this.canvas);
        document.body.appendChild(this.container);
    }
    drawHeading(degrees) {
        const heading = Math.round(degrees)
            .toString()
            .padStart(3, "0");
        this.ctx.font = "18px B612 Mono, monospace";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(heading, this.canvas.width / 2 - (this.ctx.measureText(heading).width + 3) / 2, this.canvas.height - 15);
        this.ctx.fillText("\u{2BC5}", this.canvas.width / 2 - 18 / 2, this.canvas.height - 30);
    }
    drawMarkings(offset) {
        // To include the last line, we subtract 0.5
        const WIDTH_6_DEG = (this.canvas.width - 0.5) * 2 / 360;
        this.ctx.fillStyle = "#fff";
        this.ctx.strokeStyle = "#fff";
        for (let i = 0; i < 360; i += 5) {
            const x = WIDTH_6_DEG * i + offset;
            // Draw lines every 5 degree, with a larger one every 30th
            this.ctx.beginPath();
            if (i % 30 === 0) {
                this.ctx.moveTo(x + 0.5, this.canvas.height / 2 + 0);
                this.ctx.lineTo(x + 0.5, this.canvas.height / 2 + 15);
            }
            else {
                this.ctx.moveTo(x + 0.5, this.canvas.height / 2 + 5);
                this.ctx.lineTo(x + 0.5, this.canvas.height / 2 + 10);
            }
            this.ctx.stroke();
            // Draw cardinal points and headings
            this.ctx.font = "16px B612 Mono, monospace";
            if (i === 0 || i === 360) {
                this.ctx.fillText("N", x - this.ctx.measureText("N").width / 2, this.canvas.height / 2 - 10);
            }
            else if (i === 90) {
                this.ctx.fillText("E", x - this.ctx.measureText("E").width / 2, this.canvas.height / 2 - 10);
            }
            else if (i === 180) {
                this.ctx.fillText("S", x - this.ctx.measureText("S").width / 2, this.canvas.height / 2 - 10);
            }
            else if (i === 270) {
                this.ctx.fillText("W", x - this.ctx.measureText("W").width / 2, this.canvas.height / 2 - 10);
            }
            else if (i % 30 === 0) {
                const heading = Math.round(i);
                this.ctx.font = "12px B612 Mono, monospace";
                this.ctx.fillText(heading, x - this.ctx.measureText(heading).width / 2, this.canvas.height / 2 - 10);
            }
        }
    }
}