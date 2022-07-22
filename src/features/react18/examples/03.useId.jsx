import { useId } from "react"
import {map} from 'lodash'

function InputComponent ({label}) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label} </label>
      <input type="text" id={id} />
    </div>
  )
}

export default function Demo () {
  const formConfig = [
    {
      label: 'input 1'
    },
    {
      label: 'input 2'
    }
  ]
  return (
    <div>
      <h3>useId</h3>
      <br />

      {map(formConfig, itemConfig => <InputComponent key={itemConfig.label} label={itemConfig.label} />)}
    </div>
  )
}