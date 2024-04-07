import type { Meta, StoryObj } from '@storybook/react'
import DOMPurify from 'dompurify'
import {
  createFooter,
  FooterProps,
} from '../src/client/components/footer/footer'

function Wrapper() {
  return <div></div>
}

type WrapperPropsAndCustomArgs = React.ComponentProps<typeof Wrapper> &
  FooterProps

const meta = {
  title: 'Example/Footer',
  component: Wrapper,
  render: ({ container }) => {
    const footer = createFooter(container)
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(footer.element.outerHTML),
        }}
      />
    )
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<WrapperPropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {
    container: document.createElement('div'),
  },
}
