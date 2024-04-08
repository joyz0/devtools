import { inject, injectable } from 'inversify'
import { Widget, type IWidget } from '../base/dom'
import { EdgePosition, Identifiers } from '../base/constants'
import { FrameContent } from './frameContent'
import './frame.css'

interface FrameOptions {
  container?: HTMLElement
}

interface IFrame extends IWidget {
  toggleVisible(): void
  moveFollow(target: HTMLElement, targetPostion: EdgePosition): void
  renderContent(): void
}

@injectable()
class Frame extends Widget implements IFrame {
  private readonly _margin = 15
  private _visible = false
  private _frameElement!: HTMLElement

  constructor(
    @inject(Identifiers.FrameContent) private _frameContent: FrameContent,
  ) {
    super()
  }

  public override initialize(options: FrameOptions): IFrame {
    const element = this._element
    const frameElement = document.createElement('div')
    element.classList.add('devtool-frame-container')
    frameElement.classList.add('devtool-frame')
    element.appendChild(frameElement)
    element.style.width = `min(80vw, 100vw - ${this._margin * 2}px)`
    element.style.height = `min(70vh, 100vh - ${this._margin * 2}px)`

    if (options.container) {
      options.container.appendChild(element)
    }

    this._frameElement = frameElement

    return this
  }

  private _computedBoundingValue(
    rawValue: number,
    type: 'left' | 'top',
  ): number {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const frameRect = this._element.getBoundingClientRect()
    const maxLeft = windowWidth - this._margin - frameRect.width
    const maxTop = windowHeight - this._margin - frameRect.height

    if (type === 'left') {
      return Math.min(maxLeft, Math.max(this._margin, rawValue))
    } else if (type === 'top') {
      return Math.min(maxTop, Math.max(this._margin, rawValue))
    }

    return this._margin
  }

  public toggleVisible() {
    this._visible = !this._visible
    if (this._visible) {
      this._frameElement.classList.add('opened')
    } else {
      this._frameElement.classList.remove('opened')
    }
  }

  public moveFollow(target: HTMLElement, targetPostion: EdgePosition) {
    const targetBounding = target.getBoundingClientRect()
    const frameRect = this._element.getBoundingClientRect()
    const targetCenterCoords = {
      x: targetBounding.left + targetBounding.width / 2,
      y: targetBounding.top + targetBounding.height / 2,
    }
    let left = 0
    let top = 0
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    if (targetPostion.startsWith('TOP')) {
      left = this._computedBoundingValue(
        targetCenterCoords.x - frameRect.width / 2,
        'left',
      )
      top = this._margin
    } else if (targetPostion.startsWith('RIGHT')) {
      left = windowWidth - this._margin - frameRect.width
      top = this._computedBoundingValue(
        targetCenterCoords.y - frameRect.height / 2,
        'top',
      )
    } else if (targetPostion.startsWith('BOTTOM')) {
      left = this._computedBoundingValue(
        targetCenterCoords.x - frameRect.width / 2,
        'left',
      )
      top = windowHeight - this._margin - frameRect.height
    } else if (targetPostion.startsWith('LEFT')) {
      left = this._margin
      top = this._computedBoundingValue(
        targetCenterCoords.y - frameRect.height / 2,
        'top',
      )
    }
    this._element.style.left = `${left}px`
    this._element.style.top = `${top}px`
  }

  public renderContent() {
    this._frameContent.initialize({
      container: this._frameElement,
    })
  }
}

export { Frame }
