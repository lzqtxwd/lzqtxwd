/**
 * 基于antv的关系图实现。
 */

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import './style.less'

// 定义节点样式结构
interface NodeStyle {
  fill?: String, // 节点填充色
  stroke?: String, // 节点描边颜色
  lineWidth?: Number, // 描边宽度
  lineDash?: Number[], // 描边虚线，数组代表实、虚长度。
  shadowColor?: String, // 阴影颜色。
  shadowBlur?: Number, // 阴影范围。
  shadowOffsetX?: Number, // 阴影X方向偏移量
  shadowOffsetY?: Number, // 阴影Y方向偏移量
  opacity?: Number, // 设置绘图的当前alpha或透明值。
  fillOpacity?: Number, // 设置填充的alpha或透明值。
  cursor?: String, // 设置鼠标在该节点的样式。
}

// 定义边样式结构
interface EdgeStyle {
  stroke?: String // 边的颜色。
  lineWidth?: Number, // 边的宽度。
  lineAppendWidth?: Number, // 边响应鼠标事件的检测宽度。当lineWidth太小不易选中时使用。提升点中范围。
  endArrow?: Boolean | Object, // 为 true 时在边的结束端绘制默认箭头，为 false 时不绘制结束端箭头；为obj时使用内置或者自定义的箭头。
  startArrow?: Boolean | Object, // 为 true 时在边的开始端绘制默认箭头，为 false 时不绘制结束端箭头；为obj时使用内置或者自定义的箭头。
  strokeOpacity?: Number, // 边透明度。
  shadowColor?: String, // 阴影颜色。
  shadowBlur?: Number, // 阴影模糊程度。
  shadowOffsetX?: Number, // 阴影偏移量X
  shadowOffsetY?: Number, // 阴影偏移量Y
  lineDash?: Number[], // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。
  cursor?: String, // 鼠标移入的样式
}

// 定义label样式结构
interface LabelStyle {
  fill?: String, // 文本颜色
  stroke?: String, // 文本描边颜色
  lineWidth?: Number, // 文本描边粗细。
  opacity?: Number, // 文本透明度。
  fontFamily?: String, // 文本字体。
  fontSize?: String, // 文本字体大小
}

// 定义label配置结构。
interface NodeLabelCfg {
  position?: String, // 文本相对于节点的位置，目前支持的位置有：'center'，'top'，'left'，'right'，'bottom'。默认为 'center'。modelRect 节点不支持该属性
  offset?: Number, //文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；以此类推在其他 position 时的情况。modelRect 节点的 offset 为左边距
  style?: LabelStyle, // 标签的样式属性。
}

// 定义边label配置
interface EdgeLabelCfg {
  refX?: Number, // 标签在X方向的偏移量
  refY?: Number, // 标签在Y方向的偏移量
  position?: String, // 文本相对边的位置。目前支持的位置有：'start'，'middle'，'end'。默认为'middle'
  autoRotate?: Boolean, // 标签文字是否随边旋转，默认为false。
  style?: LabelStyle, // 标签文字样式
}

// 定义节点结构
interface Node {
  id: String, // 节点唯一标识
  x?: Number, // 可选，节点位置x
  y?: Number,  // 可选，节点位置y
  type?: String, // 可选, 内置节点类型或自定义节点名称。默认为 circle
  size?: Number | Array<Number>, // 可选，节点大小
  anchorPoints?: Array<Number>, // 可选 制定边连入节点位置。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点。
  style?: NodeStyle, // 可选 节点的样式属性
  label?: String, // 可选 文本文字
  labelCfg?: NodeLabelCfg, // 可选 文本配置项。
}

interface Edge {
  id?: String // 边唯一ID
  source: String, // 起始点id
  target: String, // 目标点id
  type?: String, // 指定边类型。默认为line。内置九种，支持自定义。
  sourceAnchor?: Number, // 边起始点的锚点的索引值。
  targetAnchor?: Number, // 边的中止点的锚点索引值。
  style?: EdgeStyle, // 边的样式。
  label?: String, // 文本文字。
  labelCfg?: EdgeLabelCfg, // 文本配置项
}

interface PropsType {
  data: {
    nodes: Array<Node>,
    edges: Array<Edge>,
  }
}

const Graph = (props: PropsType) => {
  const { data } = props
  const graphNodeRef: any = useRef(null)
  let graph;

  useEffect(() => {
    if (!graph) {
      addNodeBehavior()
      addEdgeBehavior()

      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(graphNodeRef.current) as HTMLElement,
        width: graphNodeRef.current.offsetWidth,
        height: graphNodeRef.current.offsetHeight,
        modes: {
          // 默认交互模式
          default: ['drag-node', 'click-select', 'click-add-node', 'click-add-edge', 'drag-canvas', 'zoom-canvas'],
          // 增加节点交互模式
          addNode: ['click-add-node', 'click-select'],
          // 增加边交互模式
          addEdge: ['click-add-edge', 'click-select'],
        }
      })
    }

    graph.data(data);
    graph.render();
  }, [data])

  /**
   * 自定义图交互
   * 添加点
   */
  const addNodeBehavior = () => {
    // 添加的节点数量，用于生成唯一 id
    let addedNodeCount = 0;

    // 封装点击添加节点的交互
    G6.registerBehavior('click-add-node', {
      // 设定该自定义行为需要监听的事件及其响应函数
      getEvents() {
        // 监听的事件为 canvas:click，响应函数是 onClick
        return {
          'canvas:click': 'onClick',
        };
      },
      // 点击事件
      onClick(ev) {
        const graph: any = this.graph;
        // 在图上新增一个节点
        graph.addItem('node', {
          x: ev.canvasX,
          y: ev.canvasY,
          id: `node-${addedNodeCount}`, // 生成唯一的 id
        });
        addedNodeCount++;
      },
    });
  }

  /**
   * 自定义图交互
   * 增加边
   */
  const addEdgeBehavior = () => {
    // 封装点击添加边的交互
    G6.registerBehavior('click-add-edge', {
      // 设定该自定义行为需要监听的事件及其响应函数
      getEvents() {
        return {
          'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
          mousemove: 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
          'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数是 onEdgeClick
        };
      },

      // getEvents 中定义的 'node:click' 的响应函数
      onClick(ev) {
        const node = ev.item;
        const graph: any = this.graph;
        // 鼠标当前点击的节点的位置
        const point = { x: ev.x, y: ev.y };
        const model = node.getModel();
        if (this.addingEdge && this.edge) {
          graph.updateItem(this.edge, {
            target: model.id,
          });

          this.edge = null;
          this.addingEdge = false;
        } else {
          // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
          this.edge = graph.addItem('edge', {
            source: model.id,
            target: point,
          });
          this.addingEdge = true;
        }
      },

      // getEvents 中定义的 mousemove 的响应函数
      onMousemove(ev) {
        const graph: any = this.graph;
        // 鼠标的当前位置
        const point = { x: ev.x, y: ev.y };
        if (this.addingEdge && this.edge) {
          // 更新边的结束点位置为当前鼠标位置
          graph.updateItem(this.edge, {
            target: point,
          });
        }
      },

      // getEvents 中定义的 'edge:click' 的响应函数
      onEdgeClick(ev) {
        const graph: any = this.graph;
        const currentEdge = ev.item;
        // 拖拽过程中，点击会点击到新增的边上
        if (this.addingEdge && this.edge == currentEdge) {
          graph.removeItem(this.edge);
          this.edge = null;
          this.addingEdge = false;
        }
      },
    });
  }

  return <div ref={graphNodeRef} className="graph-node"></div>
}

export default Graph;
