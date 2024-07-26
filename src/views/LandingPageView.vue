<template>
    <v-container
        fluid
        class="container"
    >
        <LandingPageNavbar />
        <LandingPageHeadline />
        <LandingPageOverview />
        <LandingPageTrustedBy />
        <LandingPageFeatures />
        <LandingPageBlog />
        <LandingPageFooter />
    </v-container>
</template>

<script setup lang="ts">
/**
 * @file Landing Page View.
 */
</script>

<style scoped>
.container {
    padding: 0 !important;
}
</style>