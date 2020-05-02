'use strict'

function init() {
	const bubbles = new BubbleSort();
	bubbles.generateBubbleValues();
	bubbles.render();
	bubbles.sortBubbles();
}

class BubbleSort {
	constructor(countBubbles) {
		this.bubbles = [];
		this.bubblesElement = [];
		this.countBubbles = countBubbles || 10;
		this.minValue = 1;
		this.maxValue = 15;
	}
	
	generateBubbleValues() {
		for (let i = 0; i < this.countBubbles; i++) {
			this.bubbles.push(Math.floor(this.minValue + Math.random() * (this.maxValue + 1 - this.minValue)));
		}
	}
	
	render() {
		for (let size of this.bubbles) {
			const bubble = new Bubble(size);
			this.bubblesElement.push(bubble);
			bubble.render();
		}
	}
	
	sortBubbles() {
		for (let i = this.bubbles.length - 1; i > 0; i--) {
			for (let j = 0; j < i; j++) {
				if (this.bubbles[j] > this.bubbles[j + 1]) {
					[this.bubbles[j], this.bubbles[j + 1]] = [this.bubbles[j + 1], this.bubbles[j]];
					this.swapBubbles(j);
				}
			}
		}
	}
	
	swapBubbles(currentIndex) {
		const currentElement = this.bubblesElement[currentIndex];
		const nextElement = this.bubblesElement[currentIndex + 1];
		
		currentElement.move('towards right');
		nextElement.move('towards left');
	}
}

class Bubble {
	constructor(size) {
		this.size = size;
		this.create();
	}
	
	create() {
		const coeff = 10;
		this.element = document.createElement('div');
		this.element.className = 'bubble';
		this.element.style.width = (this.size * coeff) + 30 + 'px';
		this.element.style.height = (this.size * coeff) + 30 + 'px';
		this.element.textContent = this.size;
	}
	
	render() {
		const containers = document.querySelectorAll('.unsort-array, .sort-array');
		containers[0].append(this.element.cloneNode(true));
		containers[1].append(this.element);
	}
	
	move(delta) {
		console.log(delta);
	}
}


init();