/**
 * 定义覆盖画布。覆盖在元素上，实现元素可用鼠标绘画。
 * 
 * eg. <CoverCanvas width={canvasWidth} height={canvasHeight} />
 * 宽高等于需要覆盖的元素的宽高
 * 通过定位使画布和覆盖元素重合。
 * 被覆盖元素中的需要交互的元素，通过 z-index 调整层级。
 */

import React, { useRef, useImperativeHandle, useEffect, useState } from 'react'

interface PropsType {
  width: string;
  height: string;
  coverRef: any; // 父组件调用方法的入口
}

const CoverCanvas = (props: PropsType) => {
  const { width, height, coverRef } = props
  const canvasRef: any = useRef(null)

  useImperativeHandle(coverRef, () => ({
    /**
     * 清空画布。
     * width 画布的款
     * height 画布的高
     */
    clearCanvas: (width, height) => {
      const canvas = canvasRef.current
      const cx = canvas.getContext('2d')

      cx.clearRect(0, 0, canvas.width, canvas.height);
      // 重置宽高 清空画布
      // canvas.width = canvas.width
      // canvas.height = canvas.height
    }
  }))

  /**
   * 按下鼠标开始画画。确定起点
   * @param e 
   */
  const startLine = (e) => {
    const canvas = canvasRef.current
    const cx = canvas.getContext('2d')

    cx.beginPath();
    cx.moveTo(e.clientX - canvasRef.current.getBoundingClientRect().left, e.clientY - canvasRef.current.getBoundingClientRect().top)

    // 注册鼠标移动事件。
    canvas.onmousemove = (ev) => {
      cx.lineTo(ev.clientX - canvasRef.current.getBoundingClientRect().left, ev.clientY - canvasRef.current.getBoundingClientRect().top);
      cx.stroke();
    }
  }

  /**
   * 松开鼠标，完成绘画，取消鼠标移动事件。
   */
  const endLine = () => {
    const canvas = canvasRef.current

    canvas.onmousemove = null
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} onMouseDown={startLine} onMouseUp={endLine} onMouseLeave={endLine} />
  )
}

export default CoverCanvas