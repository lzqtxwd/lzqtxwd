import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import './style.less'

const iconfont = require('@assets/fonts/iconfont/iconfont');
const IconFont = createFromIconfontCN({
  scriptUrl: iconfont
});

interface PropsType {
  iconType: string,
  text: string
}

const TechnologyBlock = (props: PropsType) => {
  const { iconType, text } = props

  return (
    <div className="technology-block">
      <div className="block-icon">
        <IconFont type={iconType} />
      </div>
      <div className="block-text">
        {text}
      </div>
    </div>
  )
}

export default TechnologyBlock
