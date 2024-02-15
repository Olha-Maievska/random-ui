import { Card } from 'flowbite-react'
import { DateTime } from 'luxon'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface EmployeeCardProps {
  name: string
  dob: Date
  photo: string
  uuid: string
}

const EmployeeCard: FC<EmployeeCardProps> = ({ name, dob, photo, uuid }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/employee/${uuid}`)
  }

  return (
    <div className="w-96 cursor-pointer" onClick={handleClick}>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={photo}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Date of birth:{' '}
          {DateTime.fromJSDate(dob).toLocaleString(DateTime.DATETIME_SHORT)}
        </p>
      </Card>
    </div>
  )
}

export default EmployeeCard
