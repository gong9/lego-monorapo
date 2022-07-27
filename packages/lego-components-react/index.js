import '@nutui/nutui-react/dist/style.css'
import './style.scss'
import Button from './src/components/Button/index'
import Dialog from './src/components/Dialog/index'
import Image from './src/components/Image/index'
import NoticeBar from './src/components/NoticeBar/index'
import SuperSwiper from './src/components/Swiper/index'
import SuperTabs from './src/components/Tabs/index'
import getSchema from './src/util/getSchema'

// 组合组件物料信息
const schameMap = [
  getSchema(Button),
  getSchema(Dialog),
  getSchema(Image),
  getSchema(NoticeBar),
  getSchema(SuperSwiper),
  getSchema(SuperTabs)
]

export {
  schameMap,
  Button,
  Dialog,
  Image,
  NoticeBar,
  SuperSwiper,
  SuperTabs
}
