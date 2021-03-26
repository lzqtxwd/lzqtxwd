import React from 'react'
import IntlChange from '@components/IntlChange'
import FlipPendant from '@components/FlipPendant'
import './style.less'

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="intl-change-box">
        <IntlChange />
      </div>

      <div className="welcome-content">


        <div className="more-button">
          {/* <FlipPendant Positive={<div>More</div>} Back={<div>更多</div>} /> */}
        </div>
      </div>
    </div>
  )
}

export default Welcome
