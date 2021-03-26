import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeLangAction } from '../../redux/actions'
import { Button } from 'antd'
import './style.less'


const ZH = 'zh-CN';
const EN = 'en-US';

const IntlChange = () => {
  const language = useSelector((state: any) => state.changeLang.lang) || localStorage.getItem('lzqLang')
  const dispatch = useDispatch()

  const handleChange = (lang: string) => {
    if (language !== lang) {
      dispatch(changeLangAction(lang))
      localStorage.setItem('lzqLang', lang)

      window.location.reload()
    }
  }

  return (
    <div className="intl-change">
      <Button type="link" className={`zh-button ${language === ZH ? 'select' : ''}`} onClick={() => handleChange(ZH)}>中</Button>
      /
      <Button type="link" className={`en-button ${language === EN ? 'select' : ''}`} onClick={() => handleChange(EN)}>En</Button>
    </div>
  )
}

export default IntlChange