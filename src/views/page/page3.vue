<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部 -->
         <el-menu>
            <sidebar ref="sidebar"></sidebar>
         </el-menu>
      </el-header>
      <el-container>
          <el-main class=qwe>
            <!-- tab -->
            <el-tabs
                v-model="activeIndex"
                type="card"
                 class="city "   
                @tab-click="tabClick"
                v-if="options.length"
                @tab-remove="tabRemove">
              
                <el-tab-pane 
                :key="item.name"
                v-for="(item) in options"
                v-if="item.name!='首页'"
                :p_id="item.num"
                :label="item.name"                
                :name="item.route"
                closable>
                </el-tab-pane>
                
                <el-tab-pane       
                    v-else
                    :key="item.name"
                    :label="item.name"
                    :name="item.route"
                    :closable="false"
                >
                </el-tab-pane>
            </el-tabs>
            <!-- 内容 -->
              <router-view/>
          </el-main>
      </el-container>
    </el-container>    
 </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
export default {
  name: "homes",
  data() {
    return {      
    };
  },
  methods:{    
    // tab切换时，动态的切换路由
    tabClick (tab) {     
      let path = this.activeIndex;
      this.menu_index = tab.$attrs.p_id 
                        ? tab.$attrs.p_id
                        :this.$store.state.menuIndex;

      this.$router.push({path: path});  

      if(this.activeIndex==='/'){     
        const a = this.$refs.sidebar,
              b = this.menu_index;
        setTimeout(function(){
          a.closeMenu(b); 
        },300)  
      } 

      this.$store.commit('save_index', tab.$attrs.p_id);
    },
    tabRemove (targetName) {
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {          
          this.$store.commit('set_active_index', this.options[this.options.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
  components: {
     sidebar 
  },
  computed: {
    options () {
      return this.$store.state.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.options ) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name,num: to.query.num});
        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
      }
    }
  }

};
</script>
<style>
.qwe{
  padding: 100px;
  background-color: #F5F5F5
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  background-color: #5E75E6;
  color: 
}
</style>
