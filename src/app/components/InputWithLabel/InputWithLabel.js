import React from 'react'
import InputStyled from './style'
export default function InputWithLabel(props) {
  const { id, type, placeholder, error, ...rest } = props;
  return (
    <InputStyled.Box htmlFor={id}>
      <InputStyled.Input type={type ? type : "text"} id={id} placeholder="&nbsp;"  {...rest} />
      <InputStyled.Label>{placeholder && placeholder}{error && <InputStyled.Error> ({error})</InputStyled.Error>}</InputStyled.Label>
      <InputStyled.Border className="border"></InputStyled.Border>
    </InputStyled.Box>
  )
}
