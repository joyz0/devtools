import { injectable } from 'inversify'
import {
  Widget,
  type IWidget,
  addDisposableListener,
  EventType,
} from '../base/dom'
import { SideNavCodes } from '../base/constants'
import Icon from '../../assets/icon.svg'
import CodeTemplateIcon from '../../assets/code_template.svg'
import { createSVG } from '../base/util'

interface SideNavOptions {
  container?: HTMLElement
  onClickItem(code?: string): void
  activeCode?: string
}

interface ISideNav extends IWidget {}

@injectable()
class SideNav extends Widget implements ISideNav {
  private _items = new Map()
  public override initialize(options: SideNavOptions) {
    const element = this._element
    element.classList.add('devtool-side-nav')
    this._items.set(
      SideNavCodes.HOME,
      new SideNavItem({
        code: SideNavCodes.HOME,
        type: 'leader',
        icon: createSVG(Icon),
      }),
    )
    this._items.set(
      SideNavCodes.CODE_TEMPLATE,
      new SideNavItem({
        code: SideNavCodes.CODE_TEMPLATE,
        type: 'item',
        icon: createSVG(CodeTemplateIcon),
      }),
    )
    for (const [, item] of this._items.entries()) {
      element.appendChild(item.element)
    }

    this._register(
      addDisposableListener(element, EventType.CLICK, (e) => {
        const target = e.target
        if (
          target instanceof HTMLElement &&
          target.classList.contains('devtool-side-nav-item')
        ) {
          const code = target.dataset.code
          this._selectItem(code)
          if (options.onClickItem) {
            options.onClickItem(code)
          }
        }
      }),
    )

    if (options.activeCode) {
      this._selectItem(options.activeCode)
    }
    if (options.container) {
      options.container.appendChild(element)
    }

    return this
  }

  private _selectItem(code?: string) {
    if (!code) {
      return
    }
    for (const [, item] of this._items.entries()) {
      if (item.code === code) {
        item.select()
      } else {
        item.unselect()
      }
    }
  }
}

interface SideNavItemOptions {
  code: string
  type: 'leader' | 'item'
  icon: HTMLElement
}
interface ISideNavItem extends IWidget {
  readonly code?: string

  select(): void
  unselect(): void
}

class SideNavItem extends Widget implements ISideNavItem {
  constructor(options: SideNavItemOptions) {
    super()
    this.initialize(options)
  }

  public override initialize(options: SideNavItemOptions) {
    const { type, icon, code } = options
    const element = this._element
    if (type === 'leader') {
      element.classList.add('devtool-side-nav-leader')
    } else {
      element.classList.add('devtool-side-nav-item')
    }
    element.dataset.code = code
    if (icon) {
      element.appendChild(icon)
    }
  }

  public get code() {
    return this._element.dataset.code
  }

  public select() {
    this._element.classList.add('active')
  }

  public unselect() {
    this._element.classList.remove('active')
  }
}

export { SideNav }
