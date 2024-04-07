import { Container } from 'inversify'
import 'reflect-metadata'
import { DraggableService } from './components/base/services/draggableService'
import { Panel } from './components/panel/panel'
import { Frame } from './components/frame/frame'
import { FrameContent } from './components/frame/frameContent'
import { IDENTIFIERS } from './components/base/constants'
import { Workbench } from './components/workbench/workbench'

export const IoC = new Container({ skipBaseClassChecks: true })
IoC.bind<DraggableService>(IDENTIFIERS.DraggableService)
  .to(DraggableService)
  .inSingletonScope()
IoC.bind<Panel>(IDENTIFIERS.Panel).to(Panel)
IoC.bind<Frame>(IDENTIFIERS.Frame).to(Frame)
IoC.bind<FrameContent>(IDENTIFIERS.FrameContent).to(FrameContent)
IoC.bind<Workbench>(IDENTIFIERS.Workbench).to(Workbench)
