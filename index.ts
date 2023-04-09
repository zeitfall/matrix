import { MatrixInterface } from './interfaces';

export * from './interfaces';

/**
 * A matrix class.
 *
 * @remarks
 * This class implements using `Float64Array` which makes computations much faster.
 * It also defines basic matrix operations, such as cloning, setting, mapping, randomizing, adding, subtracting,
 * taking the Hadamard product, multiplying by scalar, multiplying by matrix, and transposing.
 */
export class Matrix implements MatrixInterface {
  /**
   * An array containing the matrix elements in row-major order.
   */
  public array: Float64Array;

  /**
   * Creates an instance of the Matrix class.
   *
   * @param rows The number of rows.
   * @param columns The number of columns.
   */
  constructor(
    public rows: number,
    public columns: number,
  ) {
    this.array = new Float64Array(this.rows * this.columns);
  }

  /**
   * Creates a clone of the matrix.
   */
  public clone(): MatrixInterface {
    return new Matrix(this.rows, this.columns).set(this.array);
  }

  /**
   * Sets the matrix elements using another matrix, an array or a typed array.
   *
   * @param a Another matrix, an array or a typed array.
   * @throws An error if matrices dimensions aren't the same or arrays have different lengths.
   */
  public set(a: MatrixInterface | Float64Array | number[]): this {
    if (a instanceof Matrix) {
      if (this.rows !== a.rows || this.columns !== a.columns) {
        // eslint-disable-next-line max-len
        throw new Error(`Cannot set. Matrices dimensions aren't the same: ${this.rows} x ${this.columns} / ${a.rows} x ${a.columns}`);
      }

      this.array = new Float64Array(a.array);
    }

    if (a instanceof Float64Array || a instanceof Array) {
      /**
       * @todo Implement error handling when matrices dimensions aren't the same.
       */
      if (this.array.length !== a.length) {
        // eslint-disable-next-line max-len
        console.warn(`Cannot set. Arrays have different lengths: ${this.array.length} / ${a.length}. Probably their dimensions aren't the same.`);
      }

      this.array = new Float64Array(a);
    }

    return this;
  }

  /**
   * Applies a function to each element of the matrix.
   *
   * @param predicate A function to apply to each element of the matrix.
   */
  public map(predicate: (...args: any[]) => any): this {
    this.array = this.array.map(predicate);

    return this;
  }

  /**
   * Randomizes the matrix elements.
   */
  public randomize(): this {
    this.map(() => Math.random());

    return this;
  }

  /**
   * Adds another matrix to the current matrix.
   *
   * @param a Another matrix to add to the current matrix.
   * @throws An error if matrices dimensions aren't the same.
   */
  public add(a: MatrixInterface): this {
    if (this.rows !== a.rows || this.columns !== a.columns) {
      // eslint-disable-next-line max-len
      throw new Error(`Cannot add. Matrices dimensions aren't the same: ${this.rows} x ${this.columns} / ${a.rows} x ${a.columns}`);
    }

    this.array.forEach((_, i) => this.array[i] += a.array[i]);

    return this;
  }

  /**
   * Subtracts another matrix from the current matrix.
   *
   * @param a Another matrix to subtract from the current matrix.
   * @throws An error if matrices dimensions aren't the same.
   */
  public subtract(a: MatrixInterface): this {
    if (this.rows !== a.rows || this.columns !== a.columns) {
      // eslint-disable-next-line max-len
      throw new Error(`Cannot subtract. Matrices dimensions aren't the same: ${this.rows} x ${this.columns} / ${a.rows} x ${a.columns}`);
    }

    this.array.forEach((_, i) => this.array[i] -= a.array[i]);

    return this;
  }

  /**
   * Multiplies each element in this matrix with the corresponding element in the given matrix,
   * returning a new matrix with the same dimensions.
   *
   * @param a The matrix to perform the element-wise multiplication with.
   * @throws An error if the dimensions of this matrix and the given matrix are not the same.
   */
  public hadamardProduct(a: MatrixInterface): this {
    if (this.rows !== a.rows || this.columns !== a.columns) {
      // eslint-disable-next-line max-len
      throw new Error(`Cannot product. Matrices dimensions aren't the same: ${this.rows} x ${this.columns} / ${a.rows} x ${a.columns}`);
    }

    this.array.forEach((_, i) => this.array[i] *= a.array[i]);

    return this;
  }

  /**
   * Multiplies each element in the matrix by a scalar value.
   *
   * @param s The scalar value to multiply by.
   */
  public multiplyByScalar(s: number): this {
    this.array.forEach((_, i) => this.array[i] *= s);

    return this;
  }

  /**
   * Multiply this matrix by another matrix.
   *
   * @param a The matrix to multiply by.
   * @throws An error if the number of columns in this matrix is not equal to the number of rows in `a`.
   */
  public multiply(a: MatrixInterface): this {
    if (this.columns !== a.rows) {
      // eslint-disable-next-line max-len
      throw new Error(`Cannot multiply. Matrices have incompatible dimensions: ${this.rows} x ${this.columns} / ${a.rows} x ${a.columns}`);
    }

    const result: Float64Array = new Float64Array(this.rows * a.columns);

    for (let i = 0; i < this.rows; i++) {
      const iR = i * a.rows;
      const iC = i * a.columns;

      for (let j = 0; j < a.columns; j++) {
        let value = 0;

        for (let k = 0; k < a.rows; k++) {
          value += this.array[iR + k] * a.array[k * a.columns + j];
        }

        result[iC + j] = value;
      }
    }

    this.columns = a.columns;

    return this.set(result);
  }

  /**
   * Transposes the matrix, swapping its rows and columns.
   */
  public transpose(): this {
    const result: Float64Array = new Float64Array(this.rows * this.columns);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        result[j * this.rows + i] = this.array[i * this.columns + j];
      }
    }

    [this.rows, this.columns] = [this.columns, this.rows];

    return this.set(result);
  }
}
