import MonacoEditor from '../MonacoEditor/index.jsx'
import { dispatch } from '../util'

import './top.scss'

export default {
  props: {
    schema: {
      type: [Object, Array],
      default: () => []
    },
    layoutJsx: {
      type: Object,
      default: () => {}
    },
    jsonSchema: {
      type: String,
      default: () => '{}'
    }
  },
  data() {
    return {
      drawerFlag: false,
      dialogVisible: false
    }
  },
  computed: {

  },
  methods: {
    openDrawer() {
      this.drawerFlag = true
    },
    closeDrawer() {
      this.drawerFlag = false
    }
  },
  render(h) {
    return (
      <div class='top-area'>
        <el-row gutter={20}>
          <el-col span={6}>
            <div class='top-title'>Lego布局编辑器</div>
          </el-col>
          <el-col span={4} offset={14} class='top-center'>
            <div onClick={this.openDrawer}><span class='el-icon-notebook-2' />查看json</div>
            <div onClick={() => { this.dialogVisible = true }}><span class='el-icon-notebook-2' />布局信息</div>
            <div onClick={() => { dispatch(this, 'LegoEditor', 'publish') }}><span class='el-icon-position' />发布布局</div>
          </el-col>
        </el-row>
        <el-drawer
          title='布局json'
          visible={this.drawerFlag}
          direction='rtl'
          beforeClose={this.closeDrawer}
        >
          <MonacoEditor
            language='json'
            editorHight='100%'
            editorWidth='100%'
            value={this.jsonSchema}
          />
        </el-drawer>

        {/* 布局信息 */}
        <el-dialog
          title='布局信息'
          visible={this.dialogVisible}
          width='30%'
          before-close={() => { this.dialogVisible = false }}>
          <div>
            { this.layoutJsx}
          </div>
          <span slot='footer' class='dialog-footer'>
            <el-button onClick={() => { this.dialogVisible = false }}>取 消</el-button>
            <el-button type='primary' onClick={() => { this.dialogVisible = false }}>确 定</el-button>
          </span>
        </el-dialog>
      </div>
    )
  }
}
