import React, { useState, useRef } from 'react'
import { Modal, Button } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import TechnologyBlock from './TechnologyBlock/index'
import CategoryLine from '@/components/Echarts/CategoryLine'
import Bar from '@components/Echarts/Bar'
import Pie from '@components/Echarts/Pie'
import Graph from '@components/AntV/Graph'
import './style.less'

const iconfont = require('@assets/fonts/iconfont/iconfont');
const IconFont = createFromIconfontCN({
  scriptUrl: iconfont
});

const LineData = {
  cetegory: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  value: [
    [820, 932, 901, 934, 1290, 1330, 1320]
  ]
}

const pieData = [
  { value: 1048, name: '吃饭' },
  { value: 735, name: '睡觉' },
  { value: 580, name: '工作' },
  { value: 484, name: '游戏' },
  { value: 300, name: '运动' }
]

const graphData = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};

const TechnologyShow = () => {
  const graphRef: any = useRef(null)
  const [reactModal, setReactModal] = useState(false)
  const [echartsModal, setEchartsModal] = useState(false)
  const [antvModal, setAntvModal] = useState(false)

  const closeModal = () => {
    setReactModal(false)
    setEchartsModal(false)
    setAntvModal(false)
  }

  const handleAntvChangeMode = () => {
    console.log(graphRef, 999)

    graphRef.current.changeModes('add')

    graphRef.current.getData()
  }


  return (
    <div className="technology-show">
      <div className="technology-show-title">常用技术栈</div>

      <div className="technology-show-content">
        <div className="content-block" onClick={() => { setReactModal(true) }}>
          <TechnologyBlock iconType="iconReact" text="React" />
        </div>

        <div className="content-block">
          <TechnologyBlock iconType="iconantd" text="AntDesign" />
        </div>

        <div className="content-block">
          <TechnologyBlock iconType="icontypescript" text="TypeScript" />
        </div>

        <div className="content-block" onClick={() => { setEchartsModal(true) }}>
          <TechnologyBlock iconType="iconecharts" text="Echarts" />
        </div>

        <div className="content-block" onClick={() => { setAntvModal(true) }}>
          <TechnologyBlock iconType="iconantv" text="AntV" />
        </div>

        <div className="content-block">
          <TechnologyBlock iconType="iconnodejs" text="NodeJS" />
        </div>

        <div className="content-block">
          <TechnologyBlock iconType="icongraphql" text="graphQL" />
        </div>

      </div>

      <Modal title="React" visible={reactModal} onCancel={closeModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Modal title="Echarts" visible={echartsModal} width={848} onCancel={closeModal} className="echarts-modal">
        <div className="echarts-content">
          <div className="echarts-box">
            <CategoryLine data={LineData} title="上周点击量趋势图" />
          </div>
          <div className="echarts-box">
            <Bar data={LineData} title="上周每日点击量" />
          </div>
          <div className="echarts-box">
            <Pie data={pieData} title="上周时间占比" />
          </div>
          <div className="echarts-box"></div>
        </div>
      </Modal>

      <Modal title="AntV" visible={antvModal} width={848} onCancel={closeModal} className="antv-modal">
        <div className="antv-content">
          <Button onClick={handleAntvChangeMode}>切换</Button>
          <Graph data={graphData} fatherRef={graphRef} />
        </div>
      </Modal>
    </div>
  )
}

export default TechnologyShow
