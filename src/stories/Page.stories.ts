import type { Meta, StoryObj } from '@storybook/react'
import LoginPage from '../modules/auth/pages/login.page'

const meta = {
  title: 'Pages/Auth',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
