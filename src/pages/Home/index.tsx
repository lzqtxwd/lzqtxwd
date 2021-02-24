import React from 'react'
import './style.less'
import selfImg from '@assets/images/self.jpg'

const Home = () => {



  return (
    <div className="home">
      <div className="self-introduction">
        <div className="self-image">
          <img src={selfImg} width={168} height={168} />
        </div>
        <div className="self-info">
          {/* <p>姓名：梁智强</p>
          <p>性别：男</p>
          <p>年龄：24周岁</p>
          <p>籍贯：重庆荣昌</p>
          <p>职业：前端开发工程师</p>
          <p>工作经验：2年</p> */}
        </div>

        <div className="header"></div>

      </div>
    </div>
  )
}

export default Home