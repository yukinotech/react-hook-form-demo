import * as React from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextField } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

type FormValues = {
  ReactDatepicker: string
  text1: string
}

export default function App() {
  const { handleSubmit, control } = useForm<FormValues>()

  const [show, setShow] = React.useState(true)

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          control={control}
          name="ReactDatepicker"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ReactDatePicker
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              // @ts-ignore
              selected={value}
            />
          )}
        />
        {show && (
          <Controller
            control={control}
            name="text1"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
              />
            )}
          />
        )}
        <input type="submit" />
      </form>
      <button onClick={()=>{setShow(pre=>!pre)}}>show</button>
    </>
  )
}
