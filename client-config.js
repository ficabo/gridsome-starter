module.exports = {
  site: {
    name: 'Ficabo Gridsome Start',
    shortName: 'Ficabo Starter',
    description: 'The Ficabo Gridsome starter project',
    shortDescription: 'The Ficabo Gridsome starter project',
    url: 'https://www.ficabo.com.au',
    defaultImgPath: '',
    primaryColor: '#ffffff',
    geoRegion: 'AU',
    geoPlacename: 'Sunshine Coast',
    locale: 'en_AU',
  },
  sanity: {
    projectId: process.env.GRIDSOME_SANITY_PROJECT_ID,
    dataset: process.env.GRIDSOME_SANITY_DATASET,
  },
}
