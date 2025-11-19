// frontend/src/utils/sorts.js
// Sorting Algorithm Generators with comparison tracking

export const algorithms = {
  // 🫧 Bubble Sort
  bubble: {
    name: "Bubble Sort",
    generator: function* (arr) {
      const a = arr.slice();
      const n = a.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {

          // Comparison event
          yield {
            type: "compare",
            arr: a.slice(),
            i,
            j,
            description: `Comparing ${a[j]} and ${a[j + 1]}`
          };

          if (a[j] > a[j + 1]) {
            [a[j], a[j + 1]] = [a[j + 1], a[j]];
            yield {
              type: "swap",
              arr: a.slice(),
              i,
              j,
              description: `Swapped ${a[j]} and ${a[j + 1]}`
            };
          }
        }
      }

      yield { arr: a.slice(), description: "Array is fully sorted" };
    },
  },

  // 🧩 Selection Sort
  selection: {
    name: "Selection Sort",
    generator: function* (arr) {
      const a = arr.slice();
      const n = a.length;

      for (let i = 0; i < n - 1; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
          yield {
            type: "compare",
            arr: a.slice(),
            i: min,
            j,
            description: `Comparing ${a[j]} and ${a[min]}`
          };

          if (a[j] < a[min]) min = j;
        }

        if (min !== i) {
          [a[i], a[min]] = [a[min], a[i]];
          yield {
            type: "swap",
            arr: a.slice(),
            i,
            j: min,
            description: `Placed smallest at index ${i}`
          };
        }
      }

      yield { arr: a.slice(), description: "Array is fully sorted" };
    },
  },

  // 📥 Insertion Sort
  insertion: {
    name: "Insertion Sort",
    generator: function* (arr) {
      const a = arr.slice();

      for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        while (j >= 0) {
          yield {
            type: "compare",
            arr: a.slice(),
            i: j,
            j: i,
            description: `Comparing ${a[j]} and ${key}`
          };

          if (a[j] > key) {
            a[j + 1] = a[j];
            yield {
              type: "swap",
              arr: a.slice(),
              i: j + 1,
              j,
              description: `Shifting ${a[j]} right`
            };
            j--;
          } else break;
        }

        a[j + 1] = key;
        yield {
          arr: a.slice(),
          i,
          j,
          description: `Placed ${key} at position ${j + 1}`
        };
      }

      yield { arr: a.slice(), description: "Array is fully sorted" };
    },
  },

  // 🧠 Merge Sort
  merge: {
    name: "Merge Sort",
    generator: function* (arr) {
      const a = arr.slice();

      function* mergeSort(l, r) {
        if (l >= r) return [a[l]];
        const m = Math.floor((l + r) / 2);

        const left = yield* mergeSort(l, m);
        const right = yield* mergeSort(m + 1, r);

        const merged = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
          yield {
            type: "compare",
            arr: a.slice(),
            i: l + i,
            j: m + 1 + j,
            description: `Comparing ${left[i]} and ${right[j]}`
          };

          if (left[i] <= right[j]) merged.push(left[i++]);
          else merged.push(right[j++]);
        }

        while (i < left.length) merged.push(left[i++]);
        while (j < right.length) merged.push(right[j++]);

        for (let k = 0; k < merged.length; k++) {
          a[l + k] = merged[k];
          yield {
            arr: a.slice(),
            description: `Merged ${merged[k]} into position ${l + k}`
          };
        }

        return merged;
      }

      yield* mergeSort(0, a.length - 1);
      yield { arr: a.slice(), description: "Array is fully sorted" };
    },
  },

  // ⚡ Quick Sort
  quick: {
    name: "Quick Sort",
    generator: function* (arr) {
      const a = arr.slice();

      function* quickSort(low, high) {
        if (low < high) {
          const pi = yield* partition(low, high);

          yield* quickSort(low, pi - 1);
          yield* quickSort(pi + 1, high);
        }
      }

      function* partition(low, high) {
        const pivot = a[high];

        let i = low - 1;

        for (let j = low; j < high; j++) {
          yield {
            type: "compare",
            arr: a.slice(),
            i,
            j,
            description: `Comparing ${a[j]} with pivot ${pivot}`
          };

          if (a[j] < pivot) {
            i++;
            [a[i], a[j]] = [a[j], a[i]];
            yield {
              type: "swap",
              arr: a.slice(),
              i,
              j,
              description: `Swapped ${a[i]} and ${a[j]}`
            };
          }
        }

        [a[i + 1], a[high]] = [a[high], a[i + 1]];

        yield {
          type: "swap",
          arr: a.slice(),
          i: i + 1,
          j: high,
          description: `Placed pivot at ${i + 1}`
        };

        return i + 1;
      }

      yield* quickSort(0, a.length - 1);
      yield { arr: a.slice(), description: "Array is fully sorted" };
    },
  },

  // ⛰️ Heap Sort
  heap: {
    name: "Heap Sort",
    generator: function* (arr) {
      const a = arr.slice();
      const n = a.length;

      function* heapify(n, i) {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n) {
          yield {
            type: "compare",
            arr: a.slice(),
            i: largest,
            j: l,
            description: `Comparing ${a[largest]} and ${a[l]}`
          };
          if (a[l] > a[largest]) largest = l;
        }

        if (r < n) {
          yield {
            type: "compare",
            arr: a.slice(),
            i: largest,
            j: r,
            description: `Comparing ${a[largest]} and ${a[r]}`
          };
          if (a[r] > a[largest]) largest = r;
        }

        if (largest !== i) {
          yield {
            type: "swap",
            arr: a.slice(),
            i,
            j: largest,
            description: `Swapping ${a[i]} and ${a[largest]}`
          };
          [a[i], a[largest]] = [a[largest], a[i]];
          yield* heapify(n, largest);
        }
      }

      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(n, i);
      }

      for (let i = n - 1; i > 0; i--) {
        [a[0], a[i]] = [a[i], a[0]];
        yield {
          type: "swap",
          arr: a.slice(),
          i: 0,
          j: i,
          description: `Swapped max element with index ${i}`
        };
        yield* heapify(i, 0);
      }

      yield { arr: a.slice(), description: "Array is fully sorted" };
    },
  },
};
