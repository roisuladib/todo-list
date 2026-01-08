import { useState } from 'react';

/**
 * Custom hook to manage an array state with common array operations.
 * @template T The type of elements in the array.
 * @param {T[]} defaultValue The default value of the array state.
 * @returns {ArrayHook<T>} An object with array state and array manipulation functions.
 */
type ArrayHook<T> = {
  array: T[];
  set: React.Dispatch<React.SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (element: T) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
};

/**
 * Custom hook to manage an array state with common array operations.
 * @template T The type of elements in the array.
 * @param {T[]} defaultValue The default value of the array state.
 * @returns {ArrayHook<T>} An object with array state and array manipulation functions.
 */
export function useArray<T>(defaultValue: T[]): ArrayHook<T> {
  const [array, setArray] = useState<T[]>(defaultValue);

  /**
   * Pushes an element to the end of the array.
   * @param {T} element The element to be added to the array.
   */
  function push(element: T) {
    setArray(a => [...a, element]);
  }

  /**
   * Filters the array based on the provided callback function.
   * @param {(element: T) => boolean} callback The callback function used to filter the array.
   */
  function filter(callback: (element: T) => boolean) {
    setArray(a => a.filter(callback));
  }

  /**
   * Updates an element at a specific index in the array.
   * @param {number} index The index of the element to be updated.
   * @param {T} newElement The new element that will replace the existing one.
   */
  function update(index: number, newElement: T) {
    setArray(a => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length)]);
  }

  /**
   * Removes an element at a specific index from the array.
   * @param {number} index The index of the element to be removed.
   */
  function remove(index: number) {
    setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  /**
   * Clears the array by setting it to an empty array.
   */
  function clear() {
    setArray([]);
  }

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    clear,
  };
}
