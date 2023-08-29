<script setup>
import { ref, reactive } from "vue";
let Emenulist = reactive({ Billing: "", Dump: "" });
const update = (value) => {
  Emenulist = Object.assign(Emenulist, value);
  console.log(Emenulist);
};
const pipelineclear = {
  selectList: [
    {
      label: "状态",
      value: "",
      dataName: "Billing", //需要绑定的字段名
      list: [
        { label: "全部", value: "" },
        { label: "进场前", value: "-2.5,-2,-1.5,-1" },
        { label: "进场后", value: "0,1,1.5,2,2.5" },
        { label: "已确认", value: "3" },
      ],
    },
    {
      label: "倾倒点",
      value: "",
      dataName: "Dump", //需要绑定的字段名
      list: [
        { label: "全部", value: "" },
        { label: "蓬朗", value: "蓬朗" },
        { label: "吴淞江", value: "吴淞江" },
        { label: "陆家", value: "陆家" },
        { label: "娄江", value: "娄江" },
      ],
    },
  ],
};

const information = {
  selectList: [
    {
      label: "分析类型",
      value: "无需清掏井室分析",
      dataName: "whetherDisable", //需要绑定的字段名
      list: [
        { label: "全部井室养护分析", value: "" },
        { label: "无需清掏井室分析", value: "无需清掏井室分析" },
      ],
    },
    {
      label: "任务类型",
      value: "全部",
      dataName: "subtype",
      list: [
        { label: "全部", value: "" },
        { label: "市政", value: "市政" },
        { label: "小区", value: "小区" },
      ],
    },
    {
      label: "状态",
      value: "全部",
      dataName: "status",
      Multiple: true,
      list: [
        { label: "全部", value: "checkall" },
        { label: "进行中", value: 0 },
        { label: "已完成", value: 1 },
        { label: "已确认", value: 2 },
        { label: "已审核", value: 3 },
      ],
    },
  ],
};
let Emenulist2 = reactive({ whetherDisable: "", subtype: "", status: "" });
const update2 = (value) => {
  Emenulist2 = Object.assign(Emenulist2, value);
  console.log(Emenulist2);
};
</script>

<template>
  <div id="box">
    <Emenu @update="update" :list="Emenulist" :Menu="pipelineclear.selectList" />
    <Emenu @update="update2" :list="Emenulist2" :Menu="information.selectList" />
  </div>
</template>
<style lang="less" scoped></style>
