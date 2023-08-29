<script setup>
import { reactive, computed } from "vue";
import { NButton, NPopover } from "naive-ui";
const props = defineProps({
  list: {
    type: Object,
    default: () => {},
  },
  Menu: {
    type: Object,
    default: () => {},
  },
});
let Menulist = reactive(
  props.Menu.map((item) => ({ [item.dataName]: item.list[0].value })).reduce(
    (acc, cur) => Object.assign(acc, cur),
    {}
  )
);
//处理多选
const data = reactive(new Map(Object.entries(props.list)));
for (const item of Object.values(props.Menu)) {
  console.log(item);
  if (item.Multiple) {
    const { list, dataName } = item;
    Menulist[dataName] = list.map((val) => val.value);
  }
}
const emits = defineEmits(["update"]);
//重置
const reset = () => {
  for (const [key, value] of Object.entries(props.list)) {
    data.set(key, value);
  }
  for (const item of Object.values(props.Menu)) {
    if (item.Multiple) {
      const allOption = item.list.find((val) => val.label === "checkall");
      if (allOption) {
        data.set(item.dataName, [allOption.value]);
      } else {
        data.set(item.dataName, "");
      }
    } else {
      data.set(item.dataName, "");
    }
  }
  for (const key in Menulist) {
    let Multiplekeys = props.Menu.filter((item) => item.Multiple).map(
      (item) => item.dataName
    );
    if (Multiplekeys.length) {
      Multiplekeys.forEach((v) => {
        const listValues = props.Menu.find((item) => item.dataName === v).list.map(
          (item) => item.value
        );
        const currentValues = Menulist[v] || [];
        const newValues = [...new Set([...currentValues, ...listValues])];
        Menulist[v] = newValues;
      });
    } else {
      Menulist[key] = "";
    }
  }
  emits("update", Menulist);
};
//选中
const active = (item, value) => {
  console.log(item, value);
  if (!item.Multiple) {
    data.set(item.dataName, value);
  } else {
    const currentValues = data.get(item.dataName) || [];
    if (value === "checkall") {
      const newValues = item.list.map((val) => val.value);
      data.set(item.dataName, newValues);
    } else {
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter((v) => v !== value && v !== "checkall");
        data.set(item.dataName, newValues);
      } else {
        const newValues = [...currentValues, value];
        data.set(item.dataName, newValues);
        if (currentValues.includes("checkall")) {
          const allSelected = item.list.every((val) => {
            return data.get(item.dataName)?.includes(val.value);
          });
          if (allSelected) {
            const allOption = item.list.find((val) => val.label === "checkall");
            if (allOption) {
              const currentValues = data.get(item.dataName) || [];
              if (!currentValues.includes(allOption.value)) {
                const newValues = [...currentValues, allOption.value];
                data.set(item.dataName, newValues);
              }
            }
          }
        } else {
          const allOption = item.list.find((val) => val.label === "checkall");
          if (allOption) {
            const currentValues = data.get(item.dataName) || [];
            if (currentValues.includes(allOption.value)) {
              const newValues = currentValues.filter((v) => v !== allOption.value);
              data.set(item.dataName, newValues);
            }
          }
        }
      }
    }
  }
  for (const key in Menulist) {
    if (item.dataName === key) {
      Menulist[key] = data.get(item.dataName);
    }
  }
  let arr = props.Menu.filter((item) => item.Multiple);
  if (Array.isArray(Menulist[arr[0]?.dataName])) {
    Menulist[arr[0].dataName].length === arr[0].list.length - 1
      ? (Menulist[arr[0].dataName] = ["checkall", ...Menulist[arr[0].dataName]])
      : (Menulist[arr[0].dataName] = Menulist[arr[0].dataName].filter(
          (item) => item !== ""
        ));
  }

  emits("update", Menulist);
};
</script>
<template>
  <n-popover style="max-width: 35vw" placement="bottom-center" trigger="click">
    <template #trigger>
      <n-button type="primary">更多筛选</n-button>
    </template>
    <div class="Menu">
      <div v-for="(item, index) in Menu" :key="index">
        <span class="colors">{{ item.label }}</span>
        <div class="btn">
          <div class="children" v-for="(val, i) in item.list" :key="i">
            <n-button
              @click="active(item, val.value, val.label)"
              :type="
                (item.Multiple && data.get(item.dataName)?.includes(val.value)) ||
                (item.Multiple && data.get(item.dataName)?.includes(val.label)) ||
                (item.Multiple && Menulist[item.dataName]?.includes(val.value))
                  ? 'primary'
                  : !item.Multiple &&
                    (data.get(item.dataName) === val.value ||
                      data.get(item.dataName) === val.label)
                  ? 'primary'
                  : 'default'
              "
              >{{ val.label }}</n-button
            >
          </div>
        </div>
      </div>

      <div class="reset">
        <n-button style="width: 70px" @click="reset">重置</n-button>
      </div>
    </div>
  </n-popover>
</template>

<style scoped>
.colors {
  color: #0099ff;
  min-width: 4vw;
  flex-shrink: 0;
  text-align: right;
  margin-right: 1vw;
}
.Menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.Menu > div {
  display: flex;
  align-items: center;
}
.btn {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.btn div {
  margin: 5px 5px 5px 0px;
}
.reset {
  justify-content: flex-end;
}
</style>
