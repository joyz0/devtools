import { IoC } from '../src/client/IoC'
import { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Panel, type PanelOptions } from '../src/client/components/panel/panel'
import {
  EDGE_POSITION,
  IDENTIFIERS,
} from '../src/client/components/base/constants'

function Wrapper(props: PanelOptions) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      const instance = IoC.get<Panel>(IDENTIFIERS.Panel)
      instance.initialize({
        ...props,
        container: container.current,
      })
      instance.makeDraggable()
    }
  }, [])

  return <div ref={container}></div>
}

function MultipleWrapper() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      const instance1 = IoC.get<Panel>(IDENTIFIERS.Panel)
      const instance2 = IoC.get<Panel>(IDENTIFIERS.Panel)
      instance1.initialize({
        initialPosition: EDGE_POSITION.BOTTOM,
        panelSize: 30,
        container: container.current,
      })
      instance2.initialize({
        initialPosition: EDGE_POSITION.RIGHT,
        panelSize: 60,
        container: container.current,
      })
      instance1.makeDraggable()
      instance2.makeDraggable()
    }
  }, [])

  return <div ref={container}></div>
}

type WrapperPropsAndCustomArgs = React.ComponentProps<typeof Wrapper>

const meta = {
  title: 'Example/Panel',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<WrapperPropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>

export const BottomPanel: Story = {
  render() {
    return <Wrapper initialPosition={EDGE_POSITION.BOTTOM} panelSize={30} />
  },
}

export const RightPanel: Story = {
  render() {
    return <Wrapper initialPosition={EDGE_POSITION.RIGHT} panelSize={60} />
  },
}

export const MultiplePanel: Story = {
  render() {
    return <MultipleWrapper />
  },
}
