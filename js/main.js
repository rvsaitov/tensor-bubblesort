'use strict'

function init() {
	const bubbles = new BubbleSort();
	bubbles.render();
	document.querySelector('.play-button').addEventListener('click', onStart);
	document.querySelector('.newarr-button').addEventListener('click', onReset);
	
	function onStart() {
		bubbles.sortBubbles();
		document.querySelector('.play-button').disabled = true;
	}
	
	function onReset() {
		bubbles.render();
		document.querySelector('.play-button').disabled = false;
	}
}

class BubbleSort {
	constructor(countBubbles) {
		this.countBubbles = countBubbles || 10;
		this.minValue = 1;
		this.maxValue = 15;
	}
	
	generateBubbles() {
		this.bubbles = [];
		this.bubblesElement = [];
		for (let i = 0; i < this.countBubbles; i++) {
			const bubble = new Bubble();
			this.bubbles.push(bubble.getSize());
			this.bubblesElement.push(bubble);
		}
	}
	
	render() {
		clearTimeout(this.timeoutId);
		this.clear();
		this.generateBubbles();
		for (let bubble of this.bubblesElement) {
			bubble.render();
		}
	}
	
	clear() {
		document.querySelector('.sort-array').innerHTML = '';
		document.querySelector('.unsort-array').innerHTML = '';
	}
	
	sortBubbles() {
		const self = this;
		function* gen() {
			for (let i = self.bubbles.length - 1; i > 0; i--) {
				for (let j = 0; j < i; j++) {
					if (self.bubbles[j] > self.bubbles[j + 1]) {
						[self.bubbles[j], self.bubbles[j + 1]] = [self.bubbles[j + 1], self.bubbles[j]];
						yield self.swapBubbles(j);
					}
				}
				self.bubblesElement[i].fillBubble();
			}
			self.bubblesElement[0].fillBubble();
		}
		
		let generator = gen();
		
		(function nextIteration() {
			generator.next();
			self.timeoutId = setTimeout(nextIteration, 500);
		})();
	}
	
	swapBubbles(currentIndex) {
		const currentElement = this.bubblesElement[currentIndex];
		const nextElement = this.bubblesElement[currentIndex + 1];
		
		[this.bubblesElement[currentIndex], this.bubblesElement[currentIndex + 1]] = [this.bubblesElement[currentIndex + 1], this.bubblesElement[currentIndex]];
		
		const delta1 = nextElement.diameter + 20;
		const delta2 = -1 * (currentElement.diameter + 20);
		
		currentElement.move(delta1);
		nextElement.move(delta2);
	}
}

class Bubble {
	constructor() {
		const coeff = 10;
		
		this.position = 0;
		this.size = this.generateBubbleSize();
		this.diameter = this.size * coeff + 30;
		this.create();
	}
	
	generateBubbleSize() {
		const minValue = 1;
		const maxValue = 15;
		
		return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
	}
	
	getSize() {
		return this.size;
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
		this.position = delta + this.position
		this.element.style.transform = `translateX(${this.position}px)`;
		this.element.style.transition = `0.5s transform ease`;
	}
	
	fillBubble() {
		this.element.style.backgroundColor = 'black';
	}
}


init();