import { NoticeBar as NutuiNoticeBar } from '@nutui/nutui-react'
import schema from './schema.json'

const NoticeBar = ({ defaultConfig }) => {
  const { noticeBar } = defaultConfig
  return (
    <>
      <NutuiNoticeBar
        text={noticeBar}
      />
    </>
  )
}
NoticeBar.schema = schema
export default NoticeBar
