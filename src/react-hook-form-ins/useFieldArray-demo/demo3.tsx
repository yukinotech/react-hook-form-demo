import React from 'react'
import {
  useForm,
  useWatch,
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormUnregister,
} from 'react-hook-form'

type FormValues = {
  data: { name: string; conditional?: string; easyConditional?: string }[]
}

const ConditionField = ({
  control,
  index,
  register,
  unregister,
}: {
  control: Control<FormValues>
  index: number
  register: UseFormRegister<FormValues>
  unregister: UseFormUnregister<FormValues>
}) => {
  const output = useWatch({
    name: 'data',
    control,
    // defaultValue: 'yay! I am watching you :)',
  })

  // output[index]?.name !== 'bill' && unregister(`data.${index}.conditional`)

  return (
    <>
      {output[index]?.name === 'bill' && (
        <input {...register(`data.${index}.conditional`)} />
      )}
      <input
        {...register(`data.${index}.easyConditional`)}
        style={{ display: output[index]?.name === 'bill' ? 'block' : 'none' }}
      />
    </>
  )
}

const UseFieldArrayUnregister: React.FC = () => {
  const { control, handleSubmit, register, unregister } = useForm<FormValues>({
    defaultValues: {
      data: [{ name: 'test' }, { name: 'test1' }, { name: 'test2' }],
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  })
  const { fields } = useFieldArray({
    control,
    name: 'data',
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((data, index) => (
        <div key={data.id}>
          <input {...register(`data.${index}.name`)} />
          <ConditionField
            control={control}
            register={register}
            index={index}
            unregister={unregister}
          />
        </div>
      ))}
      <input type="submit" />
    </form>
  )
}

export default UseFieldArrayUnregister
