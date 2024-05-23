import { Button, Spinner } from 'flowbite-react'
import { ComponentProps, FC } from 'react'

interface HrButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean
}

const HrButton: FC<HrButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <Button
      size="xs"
      {...props}
      className="h-8 flex items-center justify-center"
    >
      {isLoading ? (
        <>
          <div className="flex items-center justify-center">
            <Spinner className="mr-2" size="sm" light={true} />
            Loading...
          </div>
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export default HrButton
