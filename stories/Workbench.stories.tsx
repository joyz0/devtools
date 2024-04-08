import { initContainer, EdgePosition, Identifiers } from '../src/client'
import { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Workbench } from '../src/client/components/workbench/workbench'

const IoC = initContainer()

function Wrapper() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      const instance = IoC.get<Workbench>(Identifiers.Workbench)
      instance.initialize({
        container: container.current,
        initialPosition: EdgePosition.BOTTOM,
        panelSize: 30,
      })
    }
  }, [])

  return <div ref={container}></div>
}

type WrapperPropsAndCustomArgs = React.ComponentProps<typeof Wrapper>

const meta = {
  title: 'Example/Workbench',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<WrapperPropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render() {
    return <Wrapper />
  },
}
