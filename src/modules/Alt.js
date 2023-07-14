import { BaseModule } from './BaseModule';

export class Alt extends BaseModule {
    onCreate = () => {
        // Create the container to hold the size display
        this.display = document.createElement('div');

        // Apply styles
        Object.assign(this.display.style, this.options.altStyles);

        this.display.classList.add("ql-image-alt-editor");
        this.display.innerHTML = `
            <input class="js-alt-text" type="text" style="width: 100px;" placeholder="Alt text" />
        `;

        // Attach it
        this.overlay.appendChild(this.display);

        this.altInput = this.display.querySelector('.js-alt-text');
        this.altInput.value = this.img.alt;

        this.altInput.addEventListener('input', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.img.alt = e.target.value;
        });
    };

    onDestroy = () => {};

    onUpdate = () => {
        if (!this.display || !this.img) {
            return;
        }

        const size = this.getCurrentSize();

        if (size[0] > 120 && size[1] > 30) {
            // position on top of image
            Object.assign(this.display.style, {
                left: '4px',
                bottom: '4px',
                right: 'auto',
            });
        } else {
            // position off bottom right
            const dispRect = this.display.getBoundingClientRect();
            Object.assign(this.display.style, {
                left: `-${dispRect.width - 4}px`,
                bottom: `-${dispRect.height + 4}px`,
                right: 'auto',
            });
        }
    };

    getCurrentSize = () => [
        this.img.width,
        Math.round((this.img.width / this.img.naturalWidth) * this.img.naturalHeight),
    ];
}
