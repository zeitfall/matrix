/**
 * An interface representing the instance of a Matrix.
 *
 * @export
 * @interface MatrixInterface
 */
export interface MatrixInterface {
  /**
   * An array containing the matrix elements in row-major order.
   */
  array: Float64Array;

  /**
   * The rows of the matrix.
   */
  rows: number;

  /**
   * The columns of the matrix.
   */
  columns: number;

  /**
   * Creates a clone of the matrix.
   */
  clone(): MatrixInterface;

  /**
   * Sets the matrix elements using another matrix, an array or a typed array.
   *
   * @param a Another matrix, an array or a typed array.
   * @throws An error if matrices dimensions aren't the same or arrays have different lengths.
   */
  set(a: MatrixInterface | Float64Array | number[]): this;

  /**
   * Applies a function to each element of the matrix.
   *
   * @param predicate A function to apply to each element of the matrix.
   */
  map(predicate: (...args: any[]) => any): this;

  /**
   * Randomizes the matrix elements.
   */
  randomize(): this;

  /**
   * Adds another matrix to the current matrix.
   *
   * @param a Another matrix to add to the current matrix.
   * @throws An error if matrices dimensions aren't the same.
   */
  add(a: MatrixInterface): this;

  /**
   * Subtracts another matrix from the current matrix.
   *
   * @param a Another matrix to subtract from the current matrix.
   * @throws An error if matrices dimensions aren't the same.
   */
  subtract(a: MatrixInterface): this;

  /**
   * Multiplies each element in this matrix with the corresponding element in the given matrix,
   * returning a new matrix with the same dimensions.
   *
   * @param a The matrix to perform the element-wise multiplication with.
   * @throws An error if the dimensions of this matrix and the given matrix are not the same.
   */
  hadamardProduct(a: MatrixInterface): this;

  /**
   * Multiplies each element in the matrix by a scalar value.
   *
   * @param s The scalar value to multiply by.
   */
  multiplyByScalar(s: number): this;

  /**
   * Multiply this matrix by another matrix.
   *
   * @param a The matrix to multiply by.
   * @throws An error if the number of columns in this matrix is not equal to the number of rows in `a`.
   */
  multiply(a: MatrixInterface): this;

  /**
   * Transposes the matrix, swapping its rows and columns.
   */
  transpose(): this;
}
