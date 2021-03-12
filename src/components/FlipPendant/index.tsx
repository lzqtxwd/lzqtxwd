/**
 * 翻转挂件。
 * hover时翻转至背面。
 * 
 * eg. <FlipPendant Positive={<div>aasd</div>} Back={<div>asd</div>} />
 */

import React from 'react'
import './style.less'

interface PropsType {
  Positive: React.ReactNode
  Back: React.ReactNode
}

const FlipPendant = (props: PropsType) => {
  const { Positive, Back } = props

  return (
    <div className="flip-pendant">
      <div className="positive">
        {Positive}
      </div>
      <div className="back">
        {Back}
      </div>
    </div>
  )
}

export default FlipPendant