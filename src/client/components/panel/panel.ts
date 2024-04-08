import { inject, injectable } from 'inversify'
import { Identifiers, EdgePosition } from '../base/constants'
import {
  addDisposableListener,
  EventType,
  Widget,
  type IWidget,
} from '../base/dom'
import {
  DRAG_DIRECTION,
  DraggableService,
} from '../base/services/draggableService'
import Icon from '../../assets/icon.svg'
import './panel.css'

export interface PanelOptions {
  container?: HTMLElement
  initialPosition: EdgePosition
  panelSize: number
  onDragging?: (element: HTMLElement, position: EdgePosition) => void
  onClick?: () => void
  onRightClick?: (openInspector: boolean) => void
}

interface IPanel extends IWidget {
  makeDraggable(): IPanel
}

@injectable()
class Panel extends Widget implements IPanel {
  private _options!: PanelOptions
  private offsetX = 0
  private offsetY = 0
  private _panelPosition!: EdgePosition
  private _panelElement!: HTMLElement
  private _glowingElement!: HTMLElement
  private _openInspector = false

  constructor(
    @inject(Identifiers.DraggableService)
    private _draggableService: DraggableService,
  ) {
    super()
  }

  public override initialize(options: PanelOptions) {
    this._options = Object.assign(
      {
        initialPosition: EdgePosition.BOTTOM,
        panelSize: 30,
      },
      options,
    )
    const { initialPosition, panelSize } = this._options
    const element = this._element
    element.classList.add('devtool-anchor')
    const panel = document.createElement('div')
    panel.classList.add('devtool-panel')
    panel.style.width = `${panelSize}px`
    panel.style.height = `${panelSize}px`
    panel.tabIndex = 0
    panel.setAttribute('role', 'button')

    const img = document.createElement('img')
    img.src = Icon
    panel.appendChild(img)

    const glowing = document.createElement('div')
    glowing.classList.add('devtool-panel-glowing')
    glowing.style.width = `${panelSize * 5}px`
    glowing.style.height = `${panelSize * 5}px`
    glowing.style.transform = `translate(-50%, -50%)`

    element.appendChild(glowing)
    element.appendChild(panel)

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (initialPosition === EdgePosition.BOTTOM) {
      element.style.left = `${(windowWidth - panelSize) / 2}px`
      element.style.top = `${windowHeight - panelSize}px`
    } else if (initialPosition === EdgePosition.RIGHT) {
      element.style.left = `${windowWidth - panelSize}px`
      element.style.top = `${(windowHeight - panelSize) / 2}px`
    }

    if (options.container) {
      options.container.appendChild(element)
    }

    this._register(
      addDisposableListener(element, EventType.CLICK, (e) => {
        e.preventDefault()
        if (this._options.onClick) {
          this._options.onClick()
        }
      }),
    )

    this._register(
      addDisposableListener(element, EventType.CONTEXT_MENU, (e) => {
        e.preventDefault()
        if (this._options.onRightClick) {
          this.toggleInspector()
          this._options.onRightClick(this._openInspector)
        }
      }),
    )

    this._panelElement = panel
    this._glowingElement = glowing
    this.panelPosition = initialPosition

    return this
  }

  private get panelPosition() {
    return this._panelPosition
  }

  private set panelPosition(value: EdgePosition) {
    this._panelPosition = value
    const element = this._panelElement
    const transformOffset = this._options.panelSize / 6
    if (value.startsWith('TOP')) {
      element.classList.remove('devtool-panel-vertical')
      element.style.transform = `translate(-50%, -${transformOffset}px)`
      element.style.borderTopLeftRadius = '0px'
      element.style.borderTopRightRadius = '0px'
      element.style.borderBottomLeftRadius = ''
      element.style.borderBottomRightRadius = ''
    } else if (value.startsWith('RIGHT')) {
      element.classList.add('devtool-panel-vertical')
      element.style.transform = `translate(${transformOffset}px, -50%) rotate(90deg)`
      element.style.borderTopLeftRadius = '0px'
      element.style.borderTopRightRadius = '0px'
      element.style.borderBottomLeftRadius = ''
      element.style.borderBottomRightRadius = ''
    } else if (value.startsWith('BOTTOM')) {
      element.classList.remove('devtool-panel-vertical')
      element.style.transform = `translate(-50%, ${transformOffset}px)`
      element.style.borderTopLeftRadius = ''
      element.style.borderTopRightRadius = ''
      element.style.borderBottomLeftRadius = '0px'
      element.style.borderBottomRightRadius = '0px'
    } else if (value.startsWith('LEFT')) {
      element.classList.add('devtool-panel-vertical')
      element.style.transform = `translate(-${transformOffset}px, -50%) rotate(90deg)`
      element.style.borderTopLeftRadius = ''
      element.style.borderTopRightRadius = ''
      element.style.borderBottomLeftRadius = '0px'
      element.style.borderBottomRightRadius = '0px'
    }
  }

  private toggleInspector() {
    this._openInspector = !this._openInspector
    if (this._openInspector) {
      this._panelElement.style.filter = 'saturate(1)'
    } else {
      this._panelElement.style.filter = ''
    }
  }

  public makeDraggable() {
    const glowing = this._glowingElement
    this._draggableService.initialize(this._element, {
      onDragEnd: () => {
        this.offsetX = 0
        this.offsetY = 0
        glowing.style.opacity = ''
      },
      onDragging: (e) => {
        this._smartStickToEdge(e)
        if (this._options.onDragging) {
          this._options.onDragging(this._element, this.panelPosition)
        }
      },
      onWindowResize: () => {
        const panelSize = this._options.panelSize
        const oldLeft = Number(this._element.style.left.slice(0, -2))
        const oldTop = Number(this._element.style.top.slice(0, -2))
        let nextLeft
        let nextTop
        if (oldTop > window.innerHeight - panelSize) {
          nextTop = window.innerHeight - panelSize
        }
        if (oldLeft > window.innerWidth - panelSize) {
          nextLeft = window.innerWidth - panelSize
        }
        if (this.panelPosition?.startsWith('RIGHT')) {
          nextLeft = window.innerWidth - panelSize
          if (oldTop > window.innerHeight - panelSize) {
            nextTop = window.innerHeight - panelSize
          }
        } else if (this.panelPosition?.startsWith('BOTTOM')) {
          nextTop = window.innerHeight - panelSize
          if (oldLeft > window.innerWidth - panelSize) {
            nextLeft = window.innerWidth - panelSize
          }
        }
        this._element.style.left = `${nextLeft}px`
        this._element.style.top = `${nextTop}px`
        if (this._options.onDragging) {
          this._options.onDragging(this._element, this.panelPosition)
        }
      },
    })
    this._register(
      addDisposableListener(this._element, EventType.POINTER_DOWN, (e) => {
        e.preventDefault()
        this.offsetX = e.clientX - this._element.offsetLeft
        this.offsetY = e.clientY - this._element.offsetTop
        this._draggableService.startDrag(this._element)
        glowing.style.opacity = '0.6'
      }),
    )
    return this
  }

  /**
   * 自动吸附窗口边界
   * @param e
   */
  private _smartStickToEdge(e: MouseEvent) {
    const panelSize = this._options.panelSize
    const currentPanelPosition = this._checkPanelPosition()
    let nextPanelPosition = this._predictNextPanelPosition(
      e,
      currentPanelPosition,
    )
    if (nextPanelPosition === EdgePosition.UNKNOWN) {
      // 如果为空，则取当前位置
      nextPanelPosition = currentPanelPosition
    } else {
      if (nextPanelPosition.startsWith('TOP')) {
        this._element.style.top = '0px'
      } else if (nextPanelPosition.startsWith('BOTTOM')) {
        this._element.style.top = `${window.innerHeight - panelSize}px`
      } else if (nextPanelPosition.startsWith('LEFT')) {
        this._element.style.left = '0px'
      } else if (nextPanelPosition.startsWith('RIGHT')) {
        this._element.style.left = `${window.innerWidth - panelSize}px`
      }
    }
    if (
      nextPanelPosition.startsWith('TOP') ||
      nextPanelPosition.startsWith('BOTTOM')
    ) {
      this._element.style.left = `${Math.min(window.innerWidth - panelSize, Math.max(0, e.clientX - this.offsetX))}px`
    } else if (
      nextPanelPosition.startsWith('LEFT') ||
      nextPanelPosition.startsWith('RIGHT')
    ) {
      this._element.style.top = `${Math.min(window.innerHeight - panelSize, Math.max(0, e.clientY - this.offsetY))}px`
    }
  }

  /**
   * 预测panel经过鼠标拖拽后出现在edge的位置
   * @returns EdgePosition
   */
  private _predictNextPanelPosition(
    e: MouseEvent,
    currentPanelPosition: EdgePosition,
  ) {
    const coords =
      this._draggableService.calculateMouseElementRelativeCoordinates(
        e,
        this._element,
      )
    const direction =
      this._draggableService.calculateMouseElementRelativeDirection(
        coords.x,
        coords.y,
      )
    const shouldChange =
      Math.abs(coords.x) > window.innerWidth / 3 ||
      Math.abs(coords.y) > window.innerHeight / 3

    if (!shouldChange) {
      return EdgePosition.UNKNOWN
    }

    const mouseMotionVector =
      this._draggableService.dragContext.mouseMotionVector

    if (DRAG_DIRECTION.RIGHT === direction) {
      if (currentPanelPosition === EdgePosition.LEFT_TOP) {
        return EdgePosition.TOP_LEFT
      } else if (
        currentPanelPosition === EdgePosition.LEFT &&
        mouseMotionVector === DRAG_DIRECTION.RIGHT
      ) {
        return EdgePosition.RIGHT
      } else if (currentPanelPosition === EdgePosition.LEFT_BOTTOM) {
        return EdgePosition.BOTTOM_LEFT
      }
    } else if (DRAG_DIRECTION.LEFT === direction) {
      if (currentPanelPosition === EdgePosition.RIGHT_TOP) {
        return EdgePosition.TOP_RIGHT
      } else if (
        currentPanelPosition === EdgePosition.RIGHT &&
        mouseMotionVector === DRAG_DIRECTION.LEFT
      ) {
        return EdgePosition.LEFT
      } else if (currentPanelPosition === EdgePosition.RIGHT_BOTTOM) {
        return EdgePosition.BOTTOM_RIGHT
      }
    } else if (DRAG_DIRECTION.DOWN === direction) {
      if (currentPanelPosition === EdgePosition.TOP_LEFT) {
        return EdgePosition.LEFT_TOP
      } else if (
        currentPanelPosition === EdgePosition.TOP &&
        mouseMotionVector === DRAG_DIRECTION.DOWN
      ) {
        return EdgePosition.BOTTOM
      } else if (currentPanelPosition === EdgePosition.TOP_RIGHT) {
        return EdgePosition.RIGHT_TOP
      }
    } else if (DRAG_DIRECTION.UP === direction) {
      if (currentPanelPosition === EdgePosition.BOTTOM_LEFT) {
        return EdgePosition.LEFT_BOTTOM
      } else if (
        currentPanelPosition === EdgePosition.BOTTOM &&
        mouseMotionVector === DRAG_DIRECTION.UP
      ) {
        return EdgePosition.TOP
      } else if (currentPanelPosition === EdgePosition.BOTTOM_RIGHT) {
        return EdgePosition.RIGHT_BOTTOM
      }
    }
    return EdgePosition.UNKNOWN
  }

  /**
   * 判断panel当前在edge的位置
   * @returns EdgePosition
   */
  private _checkPanelPosition() {
    const panelSize = this._options.panelSize
    const offsetLeft = this._element.offsetLeft
    const offsetTop = this._element.offsetTop
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    let panelPosition
    if (offsetLeft >= 0 && offsetTop === 0) {
      if (offsetLeft < windowWidth / 3) {
        panelPosition = EdgePosition.TOP_LEFT
      } else if (offsetLeft < (windowWidth * 2) / 3) {
        panelPosition = EdgePosition.TOP
      } else {
        panelPosition = EdgePosition.TOP_RIGHT
      }
    } else if (offsetLeft >= 0 && offsetTop === windowHeight - panelSize) {
      if (offsetLeft < windowWidth / 3) {
        panelPosition = EdgePosition.BOTTOM_LEFT
      } else if (offsetLeft < (windowWidth * 2) / 3) {
        panelPosition = EdgePosition.BOTTOM
      } else {
        panelPosition = EdgePosition.BOTTOM_RIGHT
      }
    } else if (offsetLeft === 0 && offsetTop > 0) {
      if (offsetTop < windowHeight / 3) {
        panelPosition = EdgePosition.LEFT_TOP
      } else if (offsetTop < (windowHeight * 2) / 3) {
        panelPosition = EdgePosition.LEFT
      } else {
        panelPosition = EdgePosition.LEFT_BOTTOM
      }
    } else if (offsetLeft === window.innerWidth - panelSize && offsetTop > 0) {
      if (offsetTop < windowHeight / 3) {
        panelPosition = EdgePosition.RIGHT_TOP
      } else if (offsetTop < (windowHeight * 2) / 3) {
        panelPosition = EdgePosition.RIGHT
      } else {
        panelPosition = EdgePosition.RIGHT_BOTTOM
      }
    } else {
      panelPosition = EdgePosition.TOP_LEFT
    }
    this.panelPosition = panelPosition
    return panelPosition
  }
}

export { Panel }
