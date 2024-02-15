import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Label, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import HrButton from '../../../components/hr-button.components'
import { useNavigate, useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { useEmployeeStore } from '../store'
import { observer } from 'mobx-react'

interface EmployeeEditProps {}

const pastDate = DateTime.now().minus({ years: 18 })

const employeeSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  photo: z.string().nonempty().url(),
  birthDate: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  }, z.date().max(pastDate.toJSDate())),
})

type EmployeeValues = z.infer<typeof employeeSchema>

const EmployeeEdit: FC<EmployeeEditProps> = observer(() => {
  const employeeStore = useEmployeeStore()
  const params = useParams()
  const navigate = useNavigate()
  const employee = employeeStore.findEmployeeById(params.id || '')
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<EmployeeValues>({
    defaultValues: {
      firstName: employee?.name.first,
      lastName: employee?.name.last,
      photo: employee?.picture.large,
      birthDate: DateTime.fromISO(
        employee?.dob.date || new Date().toISOString()
      ).toFormat('yyyy-LL-dd') as unknown as Date,
    },
    resolver: zodResolver(employeeSchema),
  })

  const onSubmit = async (values: EmployeeValues) => {
    try {
      await employeeStore.updateEmployeeByID(employee!.login.uuid, values)
      navigate('/')
    } catch (error) {
      setError('root', {
        message: 'Something bad happened, plese try again later',
      })
    }
  }

  if (!employee)
    return (
      <Alert color="failure">
        <span className="font-medium">Error!</span> Something bad happened,
        plese try again later
      </Alert>
    )

  return (
    <div className="w-96 mx-auto mt-32">
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root?.message && (
          <Alert color="failure">{errors.root?.message}</Alert>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="Your name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            color={errors.firstName?.message ? 'failure' : 'gray'}
            helperText={errors.root?.message}
            required
            {...register('firstName')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Your surname" />
          </div>
          <TextInput
            id="lastName"
            type="lastName"
            color={errors.lastName?.message ? 'failure' : 'gray'}
            helperText={errors.lastName?.message}
            required
            {...register('lastName')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="photo" value="Photo" />
          </div>
          <TextInput
            id="photo"
            type="text"
            color={errors.photo?.message ? 'failure' : 'gray'}
            helperText={errors.photo?.message}
            required
            {...register('photo')}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="birthDate" value="Date of birth" />
          </div>
          <TextInput
            id="birthDate"
            type="date"
            color={errors.birthDate?.message ? 'failure' : 'gray'}
            helperText={errors.birthDate?.message}
            required
            {...register('birthDate')}
          />
        </div>
        <HrButton type="submit" isLoading={isSubmitting}>
          Submit
        </HrButton>
      </form>
    </div>
  )
})

export default EmployeeEdit
