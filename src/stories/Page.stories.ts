import type { Meta, StoryObj } from '@storybook/react'
import LoginPage from '../modules/auth/pages/login.page'
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6'

const meta = {
  title: 'Pages/Auth',
  component: LoginPage,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
