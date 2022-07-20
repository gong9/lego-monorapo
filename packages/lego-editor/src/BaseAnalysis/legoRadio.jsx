export default (ctx) => {
  const renderOptions = (data) => {
    return data.map((option) => {
      return (
        <el-radio
          id={option.label}
          key={option.value}
          label={option.value}
        >{option.label}
        </el-radio>
      )
    })
  }

  return <el-radio-group value={1}>{
    renderOptions([
      { label: '示例1', value: 1 },
      { label: '示例2', value: 2 }])
  }</el-radio-group>
}

