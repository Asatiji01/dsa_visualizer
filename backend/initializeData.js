const mongoose = require('mongoose');
const Algorithm = require('./models/Algorithm');
require('dotenv').config();

const defaultAlgorithms = [
  {
    name: 'Bubble Sort',
    category: 'sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)'
  },
  {
    name: 'Selection Sort',
    category: 'sorting',
    description: 'Selection sort is an in-place comparison sorting algorithm that divides the input list into two parts: sorted and unsorted.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)'
  },
  {
    name: 'Insertion Sort',
    category: 'sorting',
    description: 'Insertion sort builds the final sorted array one item at a time by inserting each element into its proper position.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)'
  },
  {
    name: 'Quick Sort',
    category: 'sorting',
    description: 'QuickSort is a divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)'
  },
  {
    name: 'Merge Sort',
    category: 'sorting',
    description: 'Merge Sort is a stable, divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)'
  }
];

async function initializeData() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-visualizer';
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Algorithm.deleteMany({});
    console.log('Cleared existing algorithms');

    // Insert default algorithms
    await Algorithm.insertMany(defaultAlgorithms);
    console.log('Default algorithms inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

initializeData();