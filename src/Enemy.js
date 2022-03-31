import React from 'react'

export default function Enemy({info, key}) {
  return (
    <div className='enemy' id={info.key}>{info.life}</div>
  )
}
