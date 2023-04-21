import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog-library/',
  title: 'blog and library',
  description: 'a simple personal blog and library',
  srcDir: './src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '组件库📦',
        items: [{ text: 'Vue', items: [] }]
      },
      {
        text: '工具库🔧',
        items: []
      },
      {
        text: '知识库📚',
        items: [
          {
            text: '前端📊',
            items: []
          },
          {
            text: 'Go Lang'
          },
          {
            text: '服务器💾',
            items: []
          }
        ]
      },
      {
        text: '生活琐碎☕',
        items: [
          {
            text: 'oculus quest',
            items: [{ text: 'oculus quest 2 激活', link: '/fragment/quest2-activation' }]
          }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/elwinYe/blog-library' }]
  },

  // 路由重写
  rewrites: {}
})
