import { NoticeBar as NutuiNoticeBar } from '@nutui/nutui-react'
import schema from './schema.json'

const NoticeBar = ({ defaultConfig }) => {
  const { noticeBarTitle } = defaultConfig
  return (
    <div>
      <NutuiNoticeBar
        text={noticeBarTitle}
        background='rgba(251, 248, 220, 1)'
        color='#D9500B'
      />
    </div>
  )
}
NoticeBar.schema = schema
export default NoticeBar
