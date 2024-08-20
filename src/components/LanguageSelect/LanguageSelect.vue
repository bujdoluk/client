
<template>
    <v-select
        v-model="selectedLanguage"
        :items="availableLocales"
        hide-details
        density="compact"
        variant="plain"
        single-line
        class="bg-background-secondary mr-4 px-1 width"
        @update:model-value="onSelectedLanguage"
    />
</template>

<script setup lang="ts">
/**
 * @file Language select component.
 * @description User can choose between languages.
 */
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';

const { availableLocales, locale } = useI18n();
const selectedLanguage = ref<string>('English');

const onSelectedLanguage = (): void => {
    locale.value = selectedLanguage.value;
    localStorage.setItem('lang', selectedLanguage.value);
};

watch(() => selectedLanguage.value, () => {
    const storedLanguage = localStorage.getItem('lang');
    if (storedLanguage) {
        locale.value = storedLanguage;
    }
});

</script>

<style scoped>
.width {
    min-width: 110px !important;
}
</style>