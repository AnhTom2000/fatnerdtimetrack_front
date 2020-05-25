<template>
  <div class="otherSettings">
    <div class="international">
      <h3 class="title">国际化设置</h3>
      <span class="props">语言</span>
      <el-select v-model="local" placeholder="请选择">
        <el-option
          v-for="(language,index) in languages"
          :key="index"
          :label="language.value"
          :value="language.id"
        ></el-option>
      </el-select>
    </div>
    <div class="defaultSettings">
      <h3 class="title">默认设置</h3>
      <ul>
        <li>
          <span class="props">默认重要性</span>
          <el-select v-model="priority">
            <el-option v-for="(item,index) in prioritys" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </li>
        <li>
          <span class="props">默认标签</span>
          <el-select v-model="tag" class="last">
            <el-option v-for="(item,index) in tags" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languages: [
        { id: "zh-CN", value: "简体中文" },
        { id: "us", value: "English" }
      ],
      prioritys: ["紧急", "重要", "普通"],
      tags: ["学习", "工作", "娱乐"],
      local: "简体中文",
      priority: "普通",
      tag: "学习"
    };
  }
};
</script>

<style >
.otherSettings{
    position: relative;
    width: 341px;
    height: 291px;
}
.international{
    margin-bottom: 30px;
}
.otherSettings .title {
    font-weight: 400;
    margin-bottom: 20px;
}

.otherSettings .props{
    /* margin-right: 10px; */
    margin-left: 30px;
}

.otherSettings .international .el-select{
    position: absolute;
    top: 35px;
    right: 0;
}

.otherSettings .defaultSettings .el-select{
    /* margin-left: 20px; */
    margin-bottom: 30px;
    margin-left: 14px;
}
.otherSettings .defaultSettings .last{
    margin-left: 30px;
}

</style>