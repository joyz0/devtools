import { isIterable } from './util'

export interface IDisposable {
  dispose(): void
}

export function dispose<T extends IDisposable>(disposable: T): T
export function dispose<T extends IDisposable>(
  disposable: T | undefined,
): T | undefined
export function dispose<
  T extends IDisposable,
  A extends Iterable<T> = Iterable<T>,
>(disposables: A): A
export function dispose<T extends IDisposable>(disposables: Array<T>): Array<T>
export function dispose<T extends IDisposable>(
  disposables: ReadonlyArray<T>,
): ReadonlyArray<T>
export function dispose<T extends IDisposable>(
  arg: T | Iterable<T> | undefined,
): any {
  if (isIterable(arg)) {
    const errors: any[] = []

    for (const d of arg) {
      if (d) {
        try {
          d.dispose()
        } catch (e) {
          errors.push(e)
        }
      }
    }

    if (errors.length === 1) {
      throw errors[0]
    } else if (errors.length > 1) {
      throw new AggregateError(
        errors,
        'Encountered errors while disposing of store',
      )
    }

    return Array.isArray(arg) ? [] : arg
  } else if (arg) {
    arg.dispose()
    return arg
  }
}

export class DisposableStore implements IDisposable {
  static DISABLE_DISPOSED_WARNING = false

  private readonly _toDispose = new Set<IDisposable>()
  private _isDisposed = false

  constructor() {}

  public dispose(): void {
    if (this._isDisposed) {
      return
    }
    this._isDisposed = true
    this.clear()
  }

  public get isDisposed(): boolean {
    return this._isDisposed
  }

  public clear(): void {
    if (this._toDispose.size === 0) {
      return
    }

    try {
      dispose(this._toDispose)
    } finally {
      this._toDispose.clear()
    }
  }

  public add<T extends IDisposable>(o: T): T {
    if (!o) {
      return o
    }
    if ((o as unknown as DisposableStore) === this) {
      throw new Error('Cannot register a disposable on itself!')
    }

    if (this._isDisposed) {
      if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
        console.warn(
          new Error(
            'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!',
          ).stack,
        )
      }
    } else {
      this._toDispose.add(o)
    }

    return o
  }

  public delete<T extends IDisposable>(o: T): void {
    if (!o) {
      return
    }
    if ((o as unknown as DisposableStore) === this) {
      throw new Error('Cannot dispose a disposable on itself!')
    }
    this._toDispose.delete(o)
    o.dispose()
  }

  public deleteAndLeak<T extends IDisposable>(o: T): void {
    if (!o) {
      return
    }
    if (this._toDispose.has(o)) {
      this._toDispose.delete(o)
    }
  }
}

abstract class Disposable implements IDisposable {
  protected readonly _store = new DisposableStore()

  constructor() {}

  public dispose(): void {
    this._store.dispose()
  }

  protected _register<T extends IDisposable>(o: T): T {
    if ((o as unknown as Disposable) === this) {
      throw new Error('Cannot register a disposable on itself!')
    }
    return this._store.add(o)
  }
}

export { Disposable }
