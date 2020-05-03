'use strict'

function init() {
	const bubbles = new BubbleSort();
	bubbles.render();
	document.querySelector('.play-button').addEventListener('click', bubbles.sortBubbles.bind(bubbles));
	document.querySelector('.newarr-button').addEventListener('click', bubbles.render.bind(bubbles));
}

class BubbleSort {
	constructor(countBubbles) {
		this.countBubbles = countBubbles || 10;
		this.minValue = 1;
		this.maxValue = 15;
	}
	
	generateBubbleValues() {
		this.bubbles = [];
		this.bubblesElement = [];
		for (let i = 0; i < this.countBubbles; i++) {
			this.bubbles.push(Math.floor(this.minValue + Math.random() * (this.maxValue + 1 - this.minValue)));
		}
	}
	
	render() {
		this.clear();
		this.generateBubbleValues();
		for (let size of this.bubbles) {
			const bubble = new Bubble(size);
			this.bubblesElement.push(bubble);
			bubble.render();
		}
	}
	
	clear() {
		document.querySelector('.sort-array').innerHTML = '';
		document.querySelector('.unsort-array').innerHTML = '';
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
		[this.bubblesElement[currentIndex], this.bubblesElement[currentIndex + 1]] = [this.bubblesElement[currentIndex + 1], this.bubblesElement[currentIndex]];
		const delta1 = nextElement.diameter + 20;
		const delta2 = -1 * (currentElement.diameter + 20);
		
		//currentElement.createClone();
		//nextElement.createClone();
		
		//currentElement.hide();
		//nextElement.hide();
		
		currentElement.move(delta1);
		nextElement.move(delta2);
	}
}

class Bubble {
	constructor(size) {
		const coeff = 10;
		
		this.position = 0;
		this.size = size;
		this.diameter = size * coeff + 30;
		this.create();
	}
	
	create() {
		this.element = document.createElement('div');
		this.element.className = 'bubble';
		this.element.style.width = this.diameter + 'px';
		this.element.style.height = this.diameter + 'px';
		this.element.textContent = this.size;
	}
	
	render() {
		const containers = document.querySelectorAll('.unsort-array, .sort-array');
		containers[0].append(this.element.cloneNode(true));
		containers[1].append(this.element);
	}

	move(delta) {
		//this.clone.style.left = parseInt(this.clone.style.left, 10) + delta + 'px';
		//this.clone.remove();
		//this.show();
		this.position = delta + this.position
		this.element.style.transform = `translateX(${this.position}px)`;
		this.element.style.transition = `1s transform ease`;
	}
	
	getElement() {
		return this.element;
	}
	
	createClone() {
		this.clone = this.element.cloneNode(true);
		this.clone.style.position = 'absolute';
		this.clone.style.left = this.element.offsetLeft - 10 + 'px';
		this.element.after(this.clone);
	}
	
	hide() {
		this.element.style.visibility = 'hidden';
	}
	
	show() {
		this.element.style.visibility = 'visible';
	}
}


init();