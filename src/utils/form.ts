// 通用 JSON 验证规则
export function jsonValidator() {
  return {
    required: true,
    validator: (_, value: string, callback) => {
      if (!value) {
        return callback();
      }
      try {
        JSON.parse(value);
        callback();
      } catch (e) {
        let errorMessage = "unknown error";
        if (e instanceof Error) {
          errorMessage = e.message;
        }
        callback(new Error(`JSON error: ${errorMessage}`));
      }
    },
    trigger: "blur",
  };
}
