<template>
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
        title: "Level",
        key: "level"
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
      const dialog = useDialog()
  
      return {
          columns: createColumns({
            updateHandler: row => {
              const eventName =  "question:update";
              this.$emit(eventName, row);
            },
            deleteHandler: row => {
              dialog.warning({
              title: "Conform",
              content: "Are you sure?",
              positiveText: "Yes",
              negativeText: "Cancel",
              onPositiveClick: () => {
                const eventName =  "question:delete";
                this.$emit(eventName, row.itemId);
              },
            })
          }
        }),
        disabled: false,
        dialog,
        loading: false,
        height: ref(56),
        pagination: {
          pageSize: 25
        }
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
  