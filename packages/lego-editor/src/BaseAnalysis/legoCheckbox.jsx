export default (ctx) => {
  const renderOptions = (data) => {
    return data.map((option) => {
      return (
        <el-checkbox
          key={option.value}
          label={option.value}
        >{option.label}
        </el-checkbox>
      )
    })
  }
  return (
    <el-checkbox-group value={[1, 2, 3]}>
      {
        renderOptions([{
          label: '示例1',
          value: 1
        },
        {
          label: '示例2',
          value: 2
        },
        {
          label: '示例3',
          value: 3
        }
        ])
      }
    </el-checkbox-group>
  )
}

