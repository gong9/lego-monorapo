import { openDialog } from '../../util/openDialog'

import './index.sass'
import schema from './schema.json'

const Button = ({ defaultConfig }) => {
  const { bgcColor, btnText } = defaultConfig
  return (
    <div className='super-btn' style={{ background: `${bgcColor}` }}>
      <button
        onClick={() => {
          openDialog()
        }}
      >
        {btnText}
      </button>
    </div>
  )
}

Button.schema = schema
export default Button
