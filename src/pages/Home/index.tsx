import React, { useEffect, useRef, useState } from 'react'
import { Button, Anchor } from 'antd'
import CoverCanvas from '@components/CoverCanvas'
import FlipPendant from '@components/FlipPendant'
import Welcome from '@pages/Home/Welcome'
import PersonalInfo from '@pages/Home/PersonalInfo'
import ContactMe from '@pages/Home/ContactMe'
import TechnologyShow from '@pages/Home/TechnologyShow'
import WorkExperience from '@pages/Home/WorkExperience'
import ProjectExperience from '@pages/Home/ProjectExperience'
import Directory from '@/components/AnchorDirectory'

// import myFetch from '@utils/myFetch'
import myWebSocket from '../../utils/myWebSocket/index'
import meImg from '@assets/images/me.png'
import './style.less'

// 定义页面锚点，从上至下。
const anchors = ['_welcome', '_personalInfo', '_contactMe', '_technologyShow', '_workExperience', '_projectExperience']

const Home = () => {
  // const contentRef: any = useRef(null)
  // const coverRef: any = useRef()
  const [canvasWidth, setCanvasWidth] = useState('100px')
  const [canvasHeight, setCanvasHeight] = useState('100px')
  const [showCanvas, setShowCanvas] = useState(true)

  useEffect(() => {
    // contentRef && setCanvasWidth(contentRef.current.offsetWidth)
    // contentRef && setCanvasHeight(contentRef.current.offsetHeight)
  })

  // const handleShowCanvas = () => {
  //   setShowCanvas(!showCanvas)
  // }

  // const handleClearCanvas = () => {
  //   coverRef.current.clearCanvas(canvasWidth, canvasHeight)
  // }

  return (
    <div className="home">
      <div className="content">
        <div id={anchors[0]} className="welcome-box">
          <Welcome />
        </div>

        <div id={anchors[1]} className="personal-info-box">
          <PersonalInfo />
        </div>

        <div id={anchors[2]} className="contactme-box">
          <ContactMe />
        </div>

        <div id={anchors[3]} className="technology-show-box">
          <TechnologyShow />
        </div>

        <div id={anchors[4]} className="work-experience-box">
          <WorkExperience />
        </div>

        <div id={anchors[5]} className="project-experience-box">
          <ProjectExperience />
        </div>
      </div>


      {/* 目录-锚点跳转 */}
      <div className="directory-box">
        <Directory anchors={anchors} />
      </div>



      {/* <div className="content-box" ref={contentRef}>
        <div className="annotation" onClick={handleClearCanvas}>
          <FlipPendant Positive={<div>aasd</div>} Back={<div>asd</div>} />
        </div>

        <div onClick={handleClearCanvas}>
          清除
        </div>

        <div className="stack-box">
          <img src={meImg} width={168} />
        </div>
      </div>

      <div className="canvas">
        {showCanvas && <CoverCanvas coverRef={coverRef} width={canvasWidth} height={canvasHeight} />}
      </div> */}
    </div>
  )
}

export default Home