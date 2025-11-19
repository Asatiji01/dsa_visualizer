const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const pseudocodes = {
  bubble: `for i from 0 to n-1
  for j from 0 to n-i-2
    if a[j] > a[j+1] then swap`,

  selection: `for i from 0 to n-1
  min=i
  for j from i+1 to n-1
    if a[j] < a[min] then min=j
  swap a[i], a[min]`,

  insertion: `for i from 1 to n-1
  key = a[i]
  j = i-1
  while j >=0 and a[j] > key
    a[j+1] = a[j]
    j--
  a[j+1] = key`,

  merge: `mergeSort(a,l,r)
  if l<r
    m=(l+r)/2
    mergeSort(a,l,m)
    mergeSort(a,m+1,r)
    merge(a,l,m,r)`,

  quick: `quickSort(a,low,high)
  if low<high
    pi=partition(a,low,high)
    quickSort(a,low,pi-1)
    quickSort(a,pi+1,high)`,

  heap: `build max heap
for i from n-1 down to 1
  swap a[0], a[i]
  heapify(a,0,i)`
};

// Pseudocode route
router.get('/pseudocode/:algo', auth, (req, res) => {
  const algo = req.params.algo;
  res.json({ pseudocode: pseudocodes[algo] || 'Not available' });
});

// List route
router.get('/list', (req, res) => {
  res.json({ algorithms: Object.keys(pseudocodes) });
});

module.exports = router;
