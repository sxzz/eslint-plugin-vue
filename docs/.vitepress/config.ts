import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import path from 'pathe'
import eslint4b from 'vite-plugin-eslint4b'

// eslint-disable-next-line unicorn/no-anonymous-default-export
export default async () => {
  const rulesPath = '../../tools/lib/rules.ts' // Avoid bundle
  const { rules } = (await import(
    rulesPath
  )) as typeof import('../../tools/lib/rules.ts')
  const uncategorizedRules = rules.filter(
    (rule) =>
      !rule.meta.docs.categories &&
      !rule.meta.docs.extensionSource &&
      !rule.meta.deprecated
  )
  const uncategorizedExtensionRule = rules.filter(
    (rule) =>
      !rule.meta.docs.categories &&
      rule.meta.docs.extensionSource &&
      !rule.meta.deprecated
  )
  const deprecatedRules = rules.filter((rule) => rule.meta.deprecated)

  const sidebarCategories = [
    { title: 'Base Rules', categoryIds: ['base'] },
    { title: 'Priority A: Essential', categoryIds: ['vue3-essential'] },
    {
      title: 'Priority B: Strongly Recommended',
      categoryIds: ['vue3-strongly-recommended']
    },
    { title: 'Priority C: Recommended', categoryIds: ['vue3-recommended'] }
  ]

  const categorizedRules: DefaultTheme.SidebarItem[] = []
  for (const { title, categoryIds } of sidebarCategories) {
    const categoryRules = rules
      .filter((rule) => rule.meta.docs.categories && !rule.meta.deprecated)
      .filter((rule) =>
        categoryIds.every((categoryId) =>
          rule.meta.docs.categories.includes(categoryId)
        )
      )
    const children: DefaultTheme.SidebarItem[] = categoryRules
      .filter(({ ruleId }) => {
        const isAlreadyListed = categorizedRules.some(
          ({ items }) =>
            items &&
            items.some(({ text: alreadyRuleId }) => alreadyRuleId === ruleId)
        )
        return !isAlreadyListed
      })
      .map(({ ruleId, name }) => ({
        text: ruleId,
        link: `/rules/${name}`
      }))

    if (children.length === 0) {
      continue
    }
    categorizedRules.push({
      text: title,
      collapsed: false,
      items: children
    })
  }

  const extraCategories: DefaultTheme.SidebarItem[] = []
  if (uncategorizedRules.length > 0) {
    extraCategories.push({
      text: 'Uncategorized',
      collapsed: false,
      items: uncategorizedRules.map(({ ruleId, name }) => ({
        text: ruleId,
        link: `/rules/${name}`
      }))
    })
  }
  if (uncategorizedExtensionRule.length > 0) {
    extraCategories.push({
      text: 'Extension Rules',
      collapsed: false,
      items: uncategorizedExtensionRule.map(({ ruleId, name }) => ({
        text: ruleId,
        link: `/rules/${name}`
      }))
    })
  }
  if (deprecatedRules.length > 0) {
    extraCategories.push({
      text: 'Deprecated',
      collapsed: false,
      items: deprecatedRules.map(({ ruleId, name }) => ({
        text: ruleId,
        link: `/rules/${name}`
      }))
    })
  }
  return defineConfig({
    base: '/',
    title: 'eslint-plugin-vuekit',
    description: 'Modern ESLint plugin for Vue 3',
    head: [['link', { rel: 'icon', href: '/favicon.png' }]],

    vite: {
      publicDir: path.resolve(import.meta.dirname, './public'),
      plugins: [eslint4b() as any],
      resolve: {
        alias: {
          'node:assert': 'assert/',
          'node:events': 'events/',
          util: 'util/',
          'node:util': 'util/',
          tslib: path.join(
            import.meta.dirname,
            '../../node_modules/tslib/tslib.es6.js'
          ),
          globby: path.join(import.meta.dirname, './shims/empty.ts'),
          'fast-glob': path.join(import.meta.dirname, './shims/empty.ts'),
          tinyglobby: path.join(import.meta.dirname, './shims/empty.ts'),
          module: path.join(import.meta.dirname, './shims/module.ts'),
          'node:module': path.join(import.meta.dirname, './shims/module.ts'),
          'node:url': path.join(import.meta.dirname, './shims/url.ts')
        }
      },
      define: {
        'require.cache': '{}'
      }
    },

    lastUpdated: true,
    themeConfig: {
      editLink: {
        pattern:
          'https://github.com/sxzz/eslint-plugin-vuekit/edit/main/docs/:path'
      },
      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/sxzz/eslint-plugin-vuekit'
        }
      ],

      nav: [
        { text: 'User Guide', link: '/user-guide/' },
        { text: 'Developer Guide', link: '/developer-guide/' },
        { text: 'Rules', link: '/rules/' },
        {
          text: 'Demo',
          link: 'https://ota-meshi.github.io/eslint-plugin-vue-demo/'
        }
      ],

      sidebar: {
        '/rules/': [
          {
            text: 'Rules',
            items: [{ text: 'Available Rules', link: '/rules/' }]
          },

          // Rules in each category.
          ...categorizedRules,

          // Rules in no category.
          ...extraCategories
        ],

        '/': [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/' },
              { text: 'User Guide', link: '/user-guide/' },
              { text: 'Developer Guide', link: '/developer-guide/' },
              { text: 'Rules', link: '/rules/' }
            ]
          }
        ]
      },

      outline: {
        level: 'deep'
      },

      search: {
        provider: 'local'
      }
    }
  })
}
