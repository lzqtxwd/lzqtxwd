import React from 'react'
import { Button, Anchor } from 'antd'
import intl from 'react-intl-universal'
import './style.less'

const { Link } = Anchor;

interface PropsType {
  anchors: Array<string>
}

const AnchorDirectory = (props: PropsType) => {
  const { anchors } = props

  return (
    <div className="directory">
      <Anchor className="directory-anchor-list">
        {anchors.map((value, index) => {
          return (
            <Link href={'#' + value} title={intl.get('anchorDirectory.' + value)} key={value} />
          )
        })}
      </Anchor>
    </div>
  )
}

export default AnchorDirectory
