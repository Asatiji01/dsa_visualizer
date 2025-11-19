// run: node backend/scripts/seedTheory.js
// run: node backend/scripts/seedTheory.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env correctly from parent folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const Theory = require('../models/Theory');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI)
{
  console.error("❌ ERROR: MONGO_URI missing in .env file");
  process.exit(1);
}

const defaultData = [
  {
    algo: 'bubble',
    title: 'Bubble Sort',
    description:
      'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Each pass bubbles the largest unsorted element to the end.',
    timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    stable: true,
    usecases: ['Small datasets', 'Almost-sorted arrays'],
    pros: ['Simple', 'In-place', 'Stable'],
    cons: ['Slow on large datasets'],
    example: 'Example: [5,2,1] -> after passes -> [1,2,5]'
  },
  {
    algo: 'selection',
    title: 'Selection Sort',
    description:
      'Selection Sort repeatedly selects the smallest element from the unsorted portion and places it at the beginning.',
    timeComplexity: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    stable: false,
    usecases: ['Small arrays', 'Memory constrained'],
    pros: ['Simple', 'In-place'],
    cons: ['Not stable', 'Inefficient on large arrays'],
    example: 'Select min and swap with current index'
  },
  {
    algo: 'insertion',
    title: 'Insertion Sort',
    description:
      'Insertion Sort builds the sorted array one item at a time by inserting each element into its correct position among already sorted elements.',
    timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    stable: true,
    usecases: ['Small arrays', 'Nearly sorted arrays'],
    pros: ['Adaptive', 'Stable', 'In-place'],
    cons: ['Slow on large arrays'],
    example: 'Insert each element into sorted left side'
  },
  {
    algo: 'merge',
    title: 'Merge Sort',
    description:
      'Merge Sort divides the array into halves, recursively sorts each half, and merges the sorted halves.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    usecases: ['Large datasets', 'External sorting'],
    pros: ['Stable', 'Predictable O(n log n)'],
    cons: ['Requires extra space'],
    example: 'Divide and merge sorted halves'
  },
  {
    algo: 'quick',
    title: 'Quick Sort',
    description:
      'Quick Sort picks a pivot, partitions the array into elements less than pivot and greater than pivot, then recursively sorts partitions.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    usecases: ['General-purpose sorting'],
    pros: ['Fast on average', 'In-place (small memory)'],
    cons: ['Worst-case O(n^2) without precautions'],
    example: 'Partition around pivot'
  },
  {
    algo: 'heap',
    title: 'Heap Sort',
    description:
      'Heap Sort builds a max heap and repeatedly extracts the maximum to build the sorted array.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    stable: false,
    usecases: ['Memory constrained O(1) auxiliary'],
    pros: ['O(n log n) guaranteed', 'In-place'],
    cons: ['Not stable'],
    example: 'Build heap then extract max'
  }
];

async function seed() {
  try {
    console.log("Connecting to:", MONGO_URI);
    await mongoose.connect(MONGO_URI);

    console.log('Connected to DB ✔');

    for (const data of defaultData) {
      await Theory.findOneAndUpdate({ algo: data.algo }, data, { upsert: true });
      console.log('Seeded:', data.algo);
    }

    console.log("🎉 THEORY DATA SEEDED SUCCESSFULLY");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seed();
