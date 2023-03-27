import * as React from 'react'
import { useForm } from 'react-hook-form'

interface IFormInputs {
  firstName: string
  lastName?: string
}

const App = () => {
  const { register, handleSubmit, unregister, setValue } =
    useForm<IFormInputs>()

  const [show, setShow] = React.useState(true)

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data))
  }

  console.log(`register('firstName')`, register('firstName'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} />
      {show && <input {...register('lastName')} />}
      <button
        type="button"
        onClick={() => {
          unregister('lastName')
          setShow(false)
        }}
      >
        unregister
      </button>
      <input type="submit" />
    </form>
  )
}

export default App
