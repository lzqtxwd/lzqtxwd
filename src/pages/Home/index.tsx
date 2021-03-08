import React, { useEffect } from 'react'
// import myFetch from '@utils/myFetch'
import myWebSocket from '../../utils/myWebSocket/index'
import selfImg from '@assets/images/self.jpg'
import './style.less'

const Home = () => {
  useEffect(() => {
    // console.log(myFetch)
  })

  return (
    <div className="home">
      <div className="welcome">

      </div>

      <div className="self-introduction">
        {/* <div className="slip-box">
          <div className="self-image">
            <img src={selfImg} width={168} height={168} />
          </div>
          <div className="self-image-text">
            啊啊啊啊
          </div>
        </div>

        <div className="self-info">
          <p>姓名：梁智强</p>
          <p>性别：男</p>
          <p>年龄：24周岁</p>
          <p>籍贯：重庆荣昌</p>
          <p>职业：前端开发工程师</p>
          <p>工作经验：2年</p>
        </div> */}
      </div>
      <div className="technology-stack">
        <div className="stack-box">
          
        </div>
      </div>
    </div>
  )
}

export default Home