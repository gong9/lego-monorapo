import { useState } from 'react'
import { Tabs, TabPane } from '@nutui/nutui-react'
import schema from './schema.json'

const SuperTabs = () => {
  const [tab1value, setTab1value] = useState('0')
  return (
    <>
      <Tabs value={tab1value} onChange={({ paneKey }) => {
        setTab1value(paneKey)
      }}>
        <TabPane title='Tab 1'> Tab 1 </TabPane>
        <TabPane title='Tab 2'> Tab 2 </TabPane>
        <TabPane title='Tab 3'> Tab 3 </TabPane>
      </Tabs>
    </>
  )
}
SuperTabs.schema = schema
export default SuperTabs
