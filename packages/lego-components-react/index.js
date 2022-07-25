import '@nutui/nutui-react/dist/style.css'
import './style.scss'
import Button from './src/components/Button/index'
import Dialog from './src/components/Dialog/index'
import Image from './src/components/Image/index'
import NoticeBar from './src/components/NoticeBar/index'
import getSchma from './src/util/getSchema'

// 组合组件物料信息
const schameMap = [
  getSchma(Button),
  getSchma(Dialog),
  getSchma(Image),
  getSchma(NoticeBar)
]

export {
  schameMap,
  Button,
  Dialog,
  Image,
  NoticeBar
}
