    // Sprite object constructor
    class Sprite {
        constructor(x, y, size, color) {
            this.x = x;  // x position
            this.y = y;  // y position
            this.size = size;  // Size of the sprite (a square here)
            this.color = color;  // Color of the sprite
            this.vx = Math.random() * 2 - 1;  // Random horizontal velocity
            this.vy = Math.random() * 2 - 1;  // Random vertical velocity
        }

        // Draw sprite as a colored square
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        // Update position and handle edge collision
        update(canvas) {
            this.x += this.vx;
            this.y += this.vy;

            // Reverse direction if it hits the edges of the canvas
            if (this.x < 0 || this.x + this.size > canvas.width) {
                this.vx *= -1;
            }
            if (this.y < 0 || this.y + this.size > canvas.height) {
                this.vy *= -1;
            }
        }

        // Check if point (px, py) is inside the sprite
        isClicked(px, py) {
            return px > this.x && px < this.x + this.size &&
                   py > this.y && py < this.y + this.size;
        }
    }

    // Setup canvas and context
    const canvas = document.getElementById('spriteCanvas');
    const ctx2 = canvas.getContext('2d');

    // Array to hold multiple sprites
    let sprites = [];

    // Create 10 random sprites
    for (let i = 0; i < 10; i++) {
        let size = 30;
        let x = Math.random() * (canvas.width - size);
        let y = Math.random() * (canvas.height - size);
        let color = '#' + Math.floor(Math.random()*16777215).toString(16);  // Random color
        sprites.push(new Sprite(x, y, size, color));
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

        // Update and draw each sprite
        sprites.forEach(sprite => {
            sprite.update(canvas);
            sprite.draw(ctx);
        });

        requestAnimationFrame(animate);  // Continue the loop
    }

    // Handle mouse clicks to interact with sprites
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Check if any sprite is clicked
        sprites.forEach(sprite => {
            if (sprite.isClicked(mouseX, mouseY)) {
                sprite.color = '#' + Math.floor(Math.random()*16777215).toString(16);  // Change color
            }
        });
    });

    // Start the animation
    animate();