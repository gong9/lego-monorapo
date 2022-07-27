import { useState } from 'react'
import { Swiper, SwiperItem } from '@nutui/nutui-react'

import schema from './schema.json'

const picArr = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]

const SuperSwiper = () => {
  const [initPage1] = useState(0)
  const [height] = useState(150)

  const onChange = (e) => {
    // do something
  }
  return (
    <Swiper
      height={height}
      paginationColor='#426543'
      autoPlay='3000'
      initPage={initPage1}
      paginationVisible
      onChange={onChange}
    >
      {
        picArr.map(
          src => {
            return (
              <SwiperItem >
                <img src={src}/>
              </SwiperItem>
            )
          }
        )
      }

    </Swiper>
  )
}

SuperSwiper.schema = schema
export default SuperSwiper
