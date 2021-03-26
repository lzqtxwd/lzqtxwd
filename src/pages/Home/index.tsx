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
import './style.less'

// 定义页面锚点，从上至下。
const anchors = ['_welcome', '_personalInfo', '_contactMe', '_technologyShow', '_workExperience', '_projectExperience']

const Home = () => {
  const contentRef: any = useRef(null)
  const coverRef: any = useRef()
  const [canvasWidth, setCanvasWidth] = useState('100px')
  const [canvasHeight, setCanvasHeight] = useState('100px')
  const [showCanvas, setShowCanvas] = useState(true)

  useEffect(() => {
    const updateSize = () => {
      contentRef && setCanvasWidth(contentRef.current.offsetWidth)
      contentRef && setCanvasHeight(contentRef.current.offsetHeight)
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  })

  // const handleShowCanvas = () => {
  //   setShowCanvas(!showCanvas)
  // }

  // const handleClearCanvas = () => {
  //   coverRef.current.clearCanvas(canvasWidth, canvasHeight)
  // }

  return (
    <div className="home" ref={contentRef}>
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

      <div className="canvas">
        {showCanvas && <CoverCanvas coverRef={coverRef} width={canvasWidth} height={canvasHeight} />}
      </div>
    </div>
  )
}

export default Home