import type { Meta, StoryObj } from '@storybook/react'
import EmployeeCard from '../modules/employees/components/employee-card.components'

const meta = {
  title: 'Employee/Card',
  component: EmployeeCard,
} satisfies Meta<typeof EmployeeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'Olha',
    photo: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
    dob: new Date(),
  },
}
