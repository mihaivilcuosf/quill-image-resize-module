import { BaseModule } from './BaseModule';

export class DisplaySize extends BaseModule {
    onCreate = () => {
        // Create the container to hold the size display
        this.display = document.createElement('div');

        // Apply styles
        for(var prop in this.options.displayStyles) {
            this.display.style[prop] = this.options.displayStyles[prop];
        }

        // Attach it
        this.overlay.appendChild(this.display);
    };

    onDestroy = () => {};

    onUpdate = () => {
        if (!this.display || !this.img) {
            return;
        }

        const size = this.getCurrentSize();
        this.display.innerHTML = size.join(' &times; ');
        if (size[0] > 120 && size[1] > 30) {
            // position on top of image
            this.display.style['right'] = '4px';
            this.display.style['bottom'] = '4px';
            this.display.style['left'] = 'auto';
        }
        else if (this.img.style.float == 'right') {
			// position off bottom left
            const dispRect = this.display.getBoundingClientRect();
            this.display.style['right'] = 'auto';
            this.display.style['bottom'] = `-${dispRect.height + 4}px`;
            this.display.style['left'] = `-${dispRect.width + 4}px`;
        }
        else {
            // position off bottom right
            const dispRect = this.display.getBoundingClientRect();
            this.display.style['right'] = `-${dispRect.width + 4}px`;
            this.display.style['bottom'] = `-${dispRect.height + 4}px`;
            this.display.style['left'] = 'auto';
        }
    };

    getCurrentSize = () => [
        this.img.width,
        Math.round((this.img.width / this.img.naturalWidth) * this.img.naturalHeight),
    ];
}
