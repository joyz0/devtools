import { Widget, type IWidget } from '../base/dom'
import { Panel, type PanelOptions } from '../panel/panel'
import { Frame } from '../frame/frame'
import { inject, injectable } from 'inversify'
import { IDENTIFIERS } from '../base/constants'

interface WorkbenchOptions extends PanelOptions {}
interface IWorkbench extends IWidget {}

@injectable()
class Workbench extends Widget implements IWorkbench {
  constructor(
    @inject(IDENTIFIERS.Panel) private _panel: Panel,
    @inject(IDENTIFIERS.Frame) private _frame: Frame,
  ) {
    super()
    const $body = document.body
    if (!$body) {
      throw new Error(
        'Cannot find document.body, make sure this is in a browser environment.',
      )
    }
  }

  public override initialize(options: WorkbenchOptions) {
    const element = this._element
    element.classList.add('devtool-workbench')

    this._frame
      .initialize({
        container: element,
      })
      .renderContent()
    const panelElement = this._panel
      .initialize({
        ...options,
        container: element,
        onDragging: (elem, position) => {
          this._frame.moveFollow(elem, position)
        },
        onClick: () => {
          this._frame.toggleVisible()
        },
        onRightClick: (openInspector) => {
          console.log('right click panel open inspector', openInspector)
        },
      })
      .makeDraggable().element

    if (options.container) {
      options.container.appendChild(element)
      this._frame.moveFollow(panelElement, options.initialPosition)
    }

    return this
  }
}

export { Workbench }
