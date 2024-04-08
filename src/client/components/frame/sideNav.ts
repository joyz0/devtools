import { injectable } from 'inversify'
import { Widget, type IWidget } from '../base/dom'

interface SideNavOptions {
  container?: HTMLElement
}

interface ISideNav extends IWidget {}

@injectable()
class SideNav extends Widget implements ISideNav {
  public override initialize(options: SideNavOptions) {
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

export { SideNav }
