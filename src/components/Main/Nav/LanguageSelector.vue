<template>
  <select
    :value="modelValue"
    @change="changeLanguage"
    class="p-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 hover:text-white transition-all duration-300 focus:outline-none ml-4"
  >
    <option v-for="lang in languages" :key="lang.code" :value="lang.code">
      
      {{ lang.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "LanguageSelector",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      languages: [
        { code: 'en', name: 'English', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_Kingdom.svg' },
        { code: 'bn', name: 'বাংলা', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bangladesh.svg' },
        { code: 'fr', name: 'Français', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg' },
        { code: 'ja', name: '日本語', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg' },
        { code: 'cn', name: '简体中文', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_China.svg' },
        { code: 'th', name: 'ไทย', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg' },
        { code: 'ms', name: 'Melayu', flag: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg' },
        { code: 'hi', name: 'हिंदी', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg' },
      ],
    };
  },
  methods: {
    changeLanguage(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
