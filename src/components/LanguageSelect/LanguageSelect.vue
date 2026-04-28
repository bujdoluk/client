<template>
    <v-select
        v-model="selectedLanguage"
        :items="languages"
        item-title="label"
        item-value="value"
        hide-details
        density="compact"
        single-line
        variant="solo"
        flat
        class="bg-background-secondary language-select"
        @update:model-value="onSelectLanguage"
    >
        <template #selection="{ item }">
            <img
                :src="item.raw.flag"
                :alt="item.raw.label"
                class="flag-img"
            >
            <span class="font-weight-bold ml-2 text-caption">{{ item.raw.code }}</span>
        </template>

        <template #item="{ item, props }">
            <v-list-item
                v-bind="props"
                :title="undefined"
            >
                <template #prepend>
                    <img
                        :src="item.raw.flag"
                        :alt="item.raw.label"
                        class="flag-img mr-3"
                    >
                </template>
                <v-list-item-title class="text-body-2">
                    {{ item.raw.label }}
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-select>
</template>

<script setup lang="ts">
/**
 * @file Language select component.
 * @description User can choose between languages using real flag images.
 */
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { locale } = useI18n();

const languages = [
    { code: 'EN', flag: 'https://flagcdn.com/w40/gb.png', label: 'English', value: 'English' },
    { code: 'SK', flag: 'https://flagcdn.com/w40/sk.png', label: 'Slovenčina', value: 'Slovak' },
    { code: 'CS', flag: 'https://flagcdn.com/w40/cz.png', label: 'Čeština', value: 'Czech' },
    { code: 'FR', flag: 'https://flagcdn.com/w40/fr.png', label: 'Français', value: 'French' },
    { code: 'DE', flag: 'https://flagcdn.com/w40/de.png', label: 'Deutsch', value: 'German' }
];

const selectedLanguage = ref<string>(locale.value);

const onSelectLanguage = (value: string): void => {
    locale.value = value;
    localStorage.setItem('lang', value);
};
</script>

<style scoped>
.language-select {
    min-width: 110px;
    max-width: 110px;
    border-radius: 8px;
    margin-right: 10px;
}

.flag-img {
    width: 24px;
    height: 16px;
    object-fit: cover;
    border-radius: 2px;
    display: block;
    flex-shrink: 0;
}
</style>