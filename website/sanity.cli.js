import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '23vvbmgr',
    dataset: 'production'
  },
  deployment: {
    appId: 'i0drily01jdg4qfe9cs8cyil',
    autoUpdates: true,
  }
})
