<template>
  <div class="noAnniversary">
    <div class="images">
      <img src="../images/图片 30.png" alt />
    </div>
    <div class="dialog">
      <p>请先添加新的事件</p>
    </div>
    <div class="addBtn" >
      <el-button type="info" @click="$emit('update:dialogShow',true)">+</el-button>
    </div>
  </div>
</template>

<script>
export default {
    props : {
        dialogShow : Boolean
    }
   
};
</script>

<style>
.noAnniversary {
  position: relative;
  width: 543px;
  height: 230px;
}
.noAnniversary .images {
  position: absolute;
  top: 50%;
  left: 5px;
  margin-top: -20px;
}

.noAnniversary .dialog {
  position: absolute;
  width: 449px;
  height: 112px;
  top: 25%;
  right: 0;
  background-color: rgb(0, 204, 141);
  border-radius: 20px;
  line-height: 112px;
  text-align: center;
  font-size: 43px;
  color: rgb(255, 255, 255);
}
.noAnniversary .dialog::before {
  content: "";
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  display: block;
  position: absolute;
  left: -30px;
  margin-top: -5px;
  top: 50%;
  border: 15px solid transparent;
  border-right-color: rgb(0, 204, 141);
}

.noAnniversary .addBtn {
  width: 177px;
  height: 61px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: 100px;
}
.noAnniversary .addBtn .el-button{
    width: 177px;
    height: 61px;
    font-size: 50px;
}
</style>