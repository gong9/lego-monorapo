import draggable from 'vuedraggable'
import './left.scss'

export default {
  components: {
    draggable
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    handleClone(data) {
      return JSON.parse(JSON.stringify(data))
    }
  },
  render(h) {
    return (
      <div class='left-area'>
        {Object.keys(this.data).map((itemKey) => {
          return (
            <div class='components'>
              <h4 class='snapshot-group-title'>
                <i class='el-icon-potato-strips' />
                {itemKey === 'container' ? '容器组件' : '基础组件'}
              </h4>
              <draggable
                class='snapshot-container'
                tag='div'
                list={this.data[itemKey]}
                clone={this.handleClone}
                sort={false}
                group={{ pull: 'clone', put: false }}
              >
                {this.data[itemKey].map((copmonents) => (
                  <div class='snapshot'>{`${copmonents.label}(${copmonents.name})`}</div>
                ))}
              </draggable>
            </div>
          )
        })}
      </div>
    )
  }
}
