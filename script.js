const container = document.getElementById('bar-container');
const algoSelect = document.getElementById('algo-select');
const statusText = document.getElementById('status');
const timeText = document.getElementById('timer');
const stepsText = document.getElementById('steps');
const timeComp = document.getElementById('time-complexity');
const spaceComp = document.getElementById('space-complexity');
const explanationText = document.getElementById('algorithm-explanation');
const speedSelect = document.getElementById('speed-range');
const pauseBtn = document.getElementById('pause-btn');

let array = [], steps = 0, startTime, isPaused = false;
let timerInterval;

const explanations = {
  bubble: "This algorithm takes repeated passes through the list and, for each pass, it compares adjacent entries, swapping them if they are in the wrong order to bubble the larger ones to the correct position at the end of each pass..",
  selection: "This algorithm sorts an array by repeatedly finding the minimum (or maximum) element from the unsorted part and putting it at the beginning (or end) of the sorted part.",
  insertion: "This algorithm builds the final sorted array one item at a time, taking elements from the input and inserting them into the appropriate position in the already sorted part of the array.",
  merge: "A divide-and-conquer algorithm that recursively divides an array into two halves, sorts them independently, and then merges the sorted halves back together to produce a single sorted array.",
  quick: "A divide-and-conquer algorithm that selects a 'pivot' element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot, then recursively sorts the sub-arrays."
};

const complexities = {
  bubble: { time: "O(n²)", space: "O(1)" },
  selection: { time: "O(n²)", space: "O(1)" },
  insertion: { time: "O(n²)", space: "O(1)" },
  merge: { time: "O(n log n)", space: "O(n)" },
  quick: { time: "O(n log n)", space: "O(log n)" },
};

// Pause/resume logic
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseBtn.innerText = isPaused ? 'Resume' : 'Pause';
});

async function waitWhilePaused() {
  while (isPaused) await sleep(100);
}

function updateExplanation() {
  const algo = algoSelect.value;
  explanationText.innerText = explanations[algo];
  timeComp.innerText = complexities[algo].time;
  spaceComp.innerText = complexities[algo].space;
}

function generateBars(num = 50) {
  container.innerHTML = '';
  array = [];
  for (let i = 0; i < num; i++) {
    let val = Math.floor(Math.random() * 350) + 20;
    array.push(val);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${val}px`;
    container.appendChild(bar);
  }
  steps = 0;
  stepsText.innerText = steps;
  statusText.innerText = 'Ready';
  timeText.innerText = '0.00s';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  steps = 0;
  updateExplanation();
  const speedMap = {
  slow: 1500,
  medium: 800,
  fast: 200
};
const speed = speedMap[speedSelect.value];

  startTime = performance.now();
  statusText.innerText = 'Sorting...';

  timerInterval = setInterval(() => {
    let elapsed = (performance.now() - startTime) / 1000;
    timeText.innerText = `${elapsed.toFixed(2)}s`;
  }, 100);

  switch (algoSelect.value) {
    case 'bubble': await bubbleSort(speed); break;
    case 'selection': await selectionSort(speed); break;
    case 'insertion': await insertionSort(speed); break;
    case 'merge': await mergeSort(0, array.length - 1, speed); break;
    case 'quick': await quickSort(0, array.length - 1, speed); break;
  }

  clearInterval(timerInterval);
  statusText.innerText = 'Sorted!';
}

// ========= SORTING ALGORITHMS ==========

async function bubbleSort(speed) {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].classList.add('comparing');
      bars[j + 1].classList.add('comparing');
      await waitWhilePaused(); await sleep(speed);
      steps++; stepsText.innerText = steps;

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      bars[j].classList.remove('comparing');
      bars[j + 1].classList.remove('comparing');
    }
    bars[array.length - i - 1].classList.add('sorted');
  }
}

async function selectionSort(speed) {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[j].classList.add('comparing');
      await waitWhilePaused(); await sleep(speed);
      if (array[j] < array[min]) min = j;
      bars[j].classList.remove('comparing');
      steps++; stepsText.innerText = steps;
    }

    [array[i], array[min]] = [array[min], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[min].style.height = `${array[min]}px`;
    bars[i].classList.add('sorted');
  }
}

async function insertionSort(speed) {
  const bars = document.getElementsByClassName('bar');
  for (let i = 1; i < array.length; i++) {
    let key = array[i], j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;
      bars[j].classList.add('comparing');
      await waitWhilePaused(); await sleep(speed);
      bars[j].classList.remove('comparing');
      j--;
      steps++; stepsText.innerText = steps;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].classList.add('sorted');
  }
}

async function mergeSort(start, end, speed) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid, speed);
  await mergeSort(mid + 1, end, speed);
  await merge(start, mid, end, speed);
}

async function merge(start, mid, end, speed) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;
  const bars = document.getElementsByClassName('bar');

  while (i < left.length && j < right.length) {
    bars[k].classList.add('comparing');
    await waitWhilePaused(); await sleep(speed);

    if (left[i] <= right[j]) {
      array[k] = left[i++];
    } else {
      array[k] = right[j++];
    }

    bars[k].style.height = `${array[k]}px`;
    bars[k].classList.remove('comparing');
    steps++; stepsText.innerText = steps;
    k++;
  }

  while (i < left.length) {
    array[k] = left[i++];
    bars[k].style.height = `${array[k]}px`;
    k++; await waitWhilePaused(); await sleep(speed); steps++; stepsText.innerText = steps;
  }

  while (j < right.length) {
    array[k] = right[j++];
    bars[k].style.height = `${array[k]}px`;
    k++; await waitWhilePaused(); await sleep(speed); steps++; stepsText.innerText = steps;
  }
}

async function quickSort(low, high, speed) {
  if (low < high) {
    let pi = await partition(low, high, speed);
    await quickSort(low, pi - 1, speed);
    await quickSort(pi + 1, high, speed);
  } else if (low >= 0 && high >= 0 && low < array.length && high < array.length) {
    document.getElementsByClassName('bar')[low].classList.add('sorted');
  }
}

async function partition(low, high, speed) {
  const bars = document.getElementsByClassName('bar');
  let pivot = array[high], i = low - 1;
  bars[high].classList.add('pivot');

  for (let j = low; j < high; j++) {
    bars[j].classList.add('comparing');
    await waitWhilePaused(); await sleep(speed);

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
    }

    bars[j].classList.remove('comparing');
    steps++; stepsText.innerText = steps;
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[i + 1].style.height = `${array[i + 1]}px`;
  bars[high].style.height = `${array[high]}px`;

  bars[high].classList.remove('pivot');
  bars[i + 1].classList.add('sorted');
  return i + 1;
}

// Initial setup
generateBars();
updateExplanation();
