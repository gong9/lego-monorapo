import { handleInjectPorpsAndEvents } from '../util'

export default (ctx) => {
  const {
    props: { options, component }
  } = ctx

  if (component === 'BLMBatchCitySelect') {
    return handleInjectPorpsAndEvents(<BLMBatchCitySelect
      optionsData={[]}
      value={[]}
    />, options)
  } else if (component === 'BLMSelectAndNestedList' || component === 'BLMSelectAndSearch') {
    return handleInjectPorpsAndEvents(<component
      data={[]}
      value={[]}
    />, options)
  } else {
    return handleInjectPorpsAndEvents(
      <el-select
        value=''
      >
      </el-select>, options
    )
  }
}

