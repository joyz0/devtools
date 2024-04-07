import { injectable } from 'inversify'
import { Disposable } from '../lifecycle'
import { EventType, addDisposableListener } from '../dom'

export enum DRAG_DIRECTION {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
}

interface Behavior {
  onDragging: (event: MouseEvent, element: HTMLElement) => void
  onDragEnd: (event: MouseEvent, element: HTMLElement) => void
  onWindowResize: (event: UIEvent, element: HTMLElement) => void
}

/**
 * 拖拽服务
 */

@injectable()
class DraggableService extends Disposable {
  // 自定义拖拽行为
  private readonly behaviorMap = new Map<HTMLElement, Behavior>()
  private dragElement?: HTMLElement
  private mouseMotionVector?: DRAG_DIRECTION
  private lastMouseX = 0
  private lastMouseY = 0

  constructor() {
    super()
    this._register(
      addDisposableListener(document, EventType.POINTER_UP, (e) => {
        e.preventDefault()
        this._onDragEnd(e)
      }),
    )
    this._register(
      addDisposableListener(document, EventType.POINTER_LEAVE, (e) => {
        e.preventDefault()
        this._onDragEnd(e)
      }),
    )
    this._register(
      addDisposableListener(document, EventType.POINTER_MOVE, (e) => {
        e.preventDefault()
        this._onDragging(e)
      }),
    )
    this._register(
      addDisposableListener(window, EventType.RESIZE, (e) => {
        e.preventDefault()
        this._onWindowResize(e)
      }),
    )
  }

  public initialize(element: HTMLElement, behavior: Behavior) {
    this.behaviorMap.set(element, behavior)
  }

  public get dragContext() {
    return {
      mouseMotionVector: this.mouseMotionVector,
    }
  }

  private _onDragEnd(e: MouseEvent) {
    if (this.dragElement) {
      this.lastMouseX = 0
      this.lastMouseY = 0
      this.behaviorMap.get(this.dragElement)?.onDragEnd(e, this.dragElement)
      this.dragElement = undefined
      this.mouseMotionVector = undefined
    }
  }

  private _onDragging(e: MouseEvent) {
    if (this.dragElement) {
      if (!this.lastMouseX || !this.lastMouseY) {
        this.lastMouseX = e.clientX
        this.lastMouseY = e.clientY
      }
      this.mouseMotionVector = this.calculateMouseElementRelativeDirection(
        e.clientX - this.lastMouseX,
        e.clientY - this.lastMouseY,
      )
      this.lastMouseX = e.clientX
      this.lastMouseY = e.clientY
      const behavior = this.behaviorMap.get(this.dragElement)
      behavior?.onDragging(e, this.dragElement)
    }
  }

  private _onWindowResize(e: UIEvent) {
    for (const [element, behavior] of this.behaviorMap.entries()) {
      behavior.onWindowResize(e, element)
    }
  }

  /**
   * 计算鼠标相对节点的方向
   * @param x 鼠标相对element的x坐标
   * @param y 鼠标相对element的y坐标
   * @returns DRAG_DIRECTION
   */
  public calculateMouseElementRelativeDirection(x: number, y: number) {
    const angleDeg = this.calculateAngle(x, -y)
    if (angleDeg >= 45 && angleDeg <= 135) {
      return DRAG_DIRECTION.UP
    } else if (angleDeg >= -135 && angleDeg <= -45) {
      return DRAG_DIRECTION.DOWN
    } else if (angleDeg > -45 && angleDeg < 45) {
      return DRAG_DIRECTION.RIGHT
    } else {
      return DRAG_DIRECTION.LEFT
    }
  }

  private calculateAngle(x: number, y: number) {
    const angleRad = Math.atan2(y, x)
    const angleDeg = (angleRad * 180) / Math.PI
    return angleDeg
  }

  public startDrag(element: HTMLElement) {
    this.dragElement = element
  }

  /**
   * 计算鼠标和节点的相对坐标
   * @param e
   * @param element
   * @returns {x, y}
   */
  public calculateMouseElementRelativeCoordinates(
    e: MouseEvent,
    element: HTMLElement,
  ) {
    const elementCoords = {
      x: element.offsetLeft + element.clientWidth / 2,
      y: element.offsetTop + element.clientHeight / 2,
    }
    return {
      x: e.clientX - elementCoords.x,
      y: e.clientY - elementCoords.y,
    }
  }
}

export { DraggableService }
