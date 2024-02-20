# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Strapi.io is required for this to work

Download [Strapi](https://strapi.io/)
use: npx create-strapi-app@latest my-project

run through the Strapi setup. Once complete, turn off your server and then replace the src file in the strapi install folder with the src folder
that was downloaded with this pull.

Place the backup file into the strapi root folder and run this command:
npm run strapi import -- -f backup.tar.gz

You will see 2 errors, that's fine, as it's a feature we do not use in Strapi.

Once imported, start strapi
npm run strapi dev

and you should see all the new data in your strapi install.

In your vue app:
testTwo@testing.com
1337

You should see an order appear. To see the other oders, look them up in the strapi backend.
