import * as React from 'react'
import {
  useForm,
  useFieldArray,
  useWatch,
  type Control,
  type UseFieldArrayUpdate,
} from 'react-hook-form'

type RealFieldValues = {
  array: { firstName: string }[]
}

export default function Demo1() {
  const { control, handleSubmit, register } = useForm<RealFieldValues>()
  const { fields, append, update } = useFieldArray({
    control,
    name: 'array',
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <Edit
          key={field.id}
          control={control}
          update={update}
          index={index}
          value={field}
        />
      ))}

      <button
        type="button"
        onClick={() => {
          append({ firstName: '' })
        }}
      >
        append
      </button>
      <input type="submit" />
    </form>
  )
}

const Display = ({
  control,
  index,
}: {
  control: Control<RealFieldValues, any>
  index: number
}) => {
  const data = useWatch({
    control,
    name: `array.${index}`,
  })
  return <p>{data?.firstName}</p>
}

const Edit = ({
  update,
  index,
  value,
  control,
}: {
  control: Control<RealFieldValues, any>
  update: UseFieldArrayUpdate<RealFieldValues, 'array'>
  index: number
  value: Record<'id' | 'firstName', string>
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value,
  })

  return (
    <div>
      <Display control={control} index={index} />

      <input
        placeholder="first name"
        {...register(`firstName`, { required: true })}
      />

      <button
        type="button"
        onClick={handleSubmit((data) => update(index, data))}
      >
        Submit
      </button>
    </div>
  )
}
