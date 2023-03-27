import * as React from 'react'
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  UseFormRegister,
} from 'react-hook-form'

type RealFieldValues = {
  array: { firstName: string }[]
}

export default function Demo2() {
  const { control, handleSubmit, register } = useForm<RealFieldValues>()
  // useForm注入好表单初始类型 `RealFieldValues`, 返回的`control`和`register`都有类型传递性

  // useFieldArray接受`control`，返回的`field`和`append`也具有类型传递性
  const {
    fields,
    append,
    prepend,
    swap,
    insert,
    move,
    update,
    replace,
    remove,
  } = useFieldArray({
    control,
    name: 'array',
  })

  console.log('fields：',fields)

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <Edit
          key={field.id}
          control={control}
          index={index}
          register={register}
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
      <button
        type="button"
        onClick={() => {
          prepend({ firstName: 'first' })
        }}
      >
        prepend
      </button>
      <button
        type="button"
        onClick={() => {
          swap(1, 2)
        }}
      >
        swap 1 with 2
      </button>
      <button
        type="button"
        onClick={() => {
          insert(0, { firstName: 'insert' })
        }}
      >
        insert 0
      </button>
      <button
        type="button"
        onClick={() => {
          move(0, 3)
        }}
      >
        move 0 to 3
      </button>
      <button
        type="button"
        onClick={() => {
          remove([0, 2])
        }}
      >
        remove 0 和 2
      </button>
      <button
        type="button"
        onClick={() => {
          update(0, { firstName: 'update' })
          // 根据官方文档：update会使组件先卸载后重新加载
        }}
      >
        update
      </button>
      <button
        type="button"
        onClick={() => {
          replace([{ firstName: '初始化了' }])
        }}
      >
        replace
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
  index,
  register,
  control,
}: {
  control: Control<RealFieldValues, any>
  register: UseFormRegister<RealFieldValues>
  index: number
}) => {
  return (
    <div>
      <Display control={control} index={index} />

      <input
        placeholder="first name"
        {...register(`array.${index}.firstName`, { required: true })}
      />
    </div>
  )
}
