import type { Meta, StoryObj } from '@storybook/react'
import EmployeeCard from '../modules/employees/components/employee-card.components'
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6'

const meta = {
  title: 'Employee/Card',
  component: EmployeeCard,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { id: '1' },
      },
      routing: { path: '/employee/:id' },
    }),
  },
} satisfies Meta<typeof EmployeeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'John Smith',
    photo: 'https://randomuser.me/api/portraits/men/25.jpg',
    dob: new Date(),
    uuid: '1',
  },
}
