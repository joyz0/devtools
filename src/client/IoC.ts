import { Container } from 'inversify'
import { DraggableService } from './components/base/services/draggableService'
import { Panel } from './components/panel/panel'
import { Frame } from './components/frame/frame'
import { FrameContent } from './components/frame/frameContent'
import { Identifiers } from './components/base/constants'
import { Workbench } from './components/workbench/workbench'

let IoC: Container

export function initContainer() {
  if (IoC) {
    return IoC
  }
  IoC = new Container({ skipBaseClassChecks: true })
  IoC.bind<DraggableService>(Identifiers.DraggableService)
    .to(DraggableService)
    .inSingletonScope()
  IoC.bind<Panel>(Identifiers.Panel).to(Panel)
  IoC.bind<Frame>(Identifiers.Frame).to(Frame)
  IoC.bind<FrameContent>(Identifiers.FrameContent).to(FrameContent)
  IoC.bind<Workbench>(Identifiers.Workbench).to(Workbench)
  return IoC
}
