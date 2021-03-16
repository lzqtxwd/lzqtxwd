import React from 'react'
import { Button } from 'antd'
import './style.less'


const ZH = 'zh-CN';
const EN = 'en-US';

const IntlChange = () => {
  const language = localStorage.getItem('lzqLang');

  const handleChange = (lang: string) => {
    if (language !== lang) {
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