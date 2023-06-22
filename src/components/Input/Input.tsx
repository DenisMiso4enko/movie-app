import React, { FC } from 'react'
import './Input.scss'

type InputProps = {
  cls?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  icon?: any
}

const Input: FC<InputProps> = ({
  cls,
  onChange,
  value,
  placeholder,
  type = 'text',
  icon,
}) => {
  return (
    <div className="input-wrapper">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        className={cls}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
