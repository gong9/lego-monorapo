import './style.scss'
import Button from './src/Components/Button/index'
import Dialog from './src/Components/Dialog/index'
import Image from './src/Components/Image/index'
import getSchma from './src/util/getSchema'

// 组合组件物料信息
const schameMap = [
  getSchma(Button),
  getSchma(Dialog),
  getSchma(Image)
]

export {
  schameMap,
  Button,
  Dialog,
  Image
}
