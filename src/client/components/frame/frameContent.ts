import { injectable } from 'inversify'
import { Widget, type IWidget } from '../base/dom'

interface FrameContentOptions {
  container?: HTMLElement
}

interface IFrameContent extends IWidget {}

@injectable()
class FrameContent extends Widget implements IFrameContent {
  public override initialize(options: FrameContentOptions) {
    const element = this._element
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 10; i++) {
      const elem = document.createElement('div')
      elem.style.height = '50px'
      elem.style.border = '1px solid'
      fragment.appendChild(elem)
    }
    element.appendChild(fragment)

    if (options.container) {
      options.container.appendChild(element)
    }

    return this
  }
}

export { FrameContent }
