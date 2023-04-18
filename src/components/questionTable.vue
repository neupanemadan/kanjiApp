<template>
  <n-row gutter="12">
    <n-col :span="18">
      <div>
      <n-card style="margin-top: 10px" embedded :bordered="false">
        <n-data-table
          ref="questionTable"
          :columns="columns"
          :data="questions"
          :pagination="pagination"
          :loading="loading"
          :row-class-name="rowClassName"
          :style="{ height: `${height}vh` }"
          size="small"
          flex-height
        />
      </n-card>
    </div>
    </n-col>
  </n-row>
  </template>
  <script>
  import { h, ref } from "vue";
  import { useDialog } from "naive-ui";
  import { NButton } from "naive-ui";
  
  
  const createColumns = ({ updateHandler, deleteHandler }) => {
    return [
      {
        title: "Question",
        key: "question"
      },
      {
        title: "Answer",
        key: "answer"
      },
      {
        title: "Actions",
        key: "actions",
        width: 80,
        render(row) {
          return h(
            NButton,
            {
              style: {
                marginLeft: "1px"
              },
              type: "info",
              strong: true,
              size: "medium",
              onClick: () => updateHandler(row)
            },
            { default: () => "Edit" }
          );
        }
      },
      {
        title: "",
        key: "actions",
        render(row) {
          return h(
            NButton,
            {
              style: {
                allignItem:"left",
                marginLeft: "7px"
              },
              type: "error",
              strong: true,
              size: "medium",
              onClick: () => deleteHandler(row)
            },
            { default: () => "Delete" }
          );
        }
      },
    ];
  };
  
  export default {
    name: "questionTable",
  
    data() {
      const active = ref(null)
      const selectedQuestion = ref(null)
      const dialog = useDialog()
  
      return {
          columns: createColumns({
            updateHandler: row => {
              active.value = true
              selectedQuestion.value = row
              this.updateRow(selectedQuestion)
            },
            deleteHandler: row => {
              dialog.warning({
              title: "Conform",
              content: "Are you sure?",
              positiveText: "Yes",
              negativeText: "Cancel",
              onPositiveClick: () => {
                const eventName =  "question:delete";
                console.log(row)
                this.$emit(eventName, row.id);
              },
            })
          }
        }),
        active,
        disabled: false,
        dialog,
        loading: false,
        height: ref(66),
        pagination: {
          pageSize: 25
        },
        selectedQuestion
      };
    },
    methods: {
    },
  
    props: {
      questions: {
        type: Array
      },
      updateRow: {
        type: Function,
        required: true
      }
    }
  };
  </script>
  <style scoped>
  :deep(.before-one-month td) {
    color: rgba(255, 0, 0, 0.75) !important;
  }
  </style>
  