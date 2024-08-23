
<template>
    <v-select
        v-model="selectedLanguage"
        :items="availableLocales"
        hide-details
        density="compact"
        single-line
        variant="solo"
        flat
        class="bg-background-secondary mr-4 px-1 select"
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
