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
.grid {
    display: flex;
    margin: 0 auto;
    width: 70%;
}

.container {
    padding: 0 !important;
}

.background-purple {
    background-color: #f9f0fd;
    width: 100% !important;
}
</style>