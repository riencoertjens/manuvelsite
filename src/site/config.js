require('dotenv').config()

const base = {
  owner: `Rien Coertjens`,
  name: `Manuvèl`,
  shortName: `Manuvèl`,
  tagline: `drink - eat - ride`,
  twitter: `rien_coertjens`,
  instagram: `manuvel.be`,
  email: `info@manuvel.be`,
  phone: `(+32)012 345 67 89`,
  facebookAppID: ``,
  facebookPage: ``,
  businessLocation: { lat: 51.16851, lng: 4.142393 },
  // url: `https://manuvelsite.netlify.com`, // no trailing slash!
  url: `https://www.manuvel.be`,
  titleTemplateSeperator: ` | `,
  icon: `src/images/site-icon.png`, // 1500x1500 This path is relative to the root of the site.
  image: `/images/social-image.jpg`, // 1200x630 This path is relative to the root of the site.
  language: `en`,
  description: `Drink. Eat. Ride. No really, just ride. Have coffee. Upload Strava. Meet up with friends. Take that selfie. Buy those clothes. Whatever.  Stretch!  #9100`,
  primaryColor: `#B88746`,
  primaryBgColor: `#222`,
}

const config = {
  base: base,
  siteMetadata: {
    owner: base.owner,
    businessLocation: base.businessLocation,
    email: base.email,
    phone: base.phone,
    siteTitle: `${base.name}`,
    siteDescription: base.description,
    siteTagline: base.tagline,
    siteImage: base.image,
    siteIcon: base.icon,
    siteUrl: base.url,
    titleTemplate: `${base.name}${base.titleTemplateSeperator}%s`,
    twitterUsername: base.twitter,
    instagramUsername: base.instagram,
    facebookPage: base.facebookPage,
    facebookAppID: base.facebookAppID,
    siteLanguage: base.language,
    mapsApiKey: process.env.MAPS_API_KEY,
    organization: {
      name: base.owner,
      url: base.url,
      logo: `${base.url}/icons/icon-512x512.png`,
    },
  },
  manifest: {
    name: base.name,
    short_name: base.shortName,
    start_url: `/`,
    background_color: base.primaryBgColor,
    theme_color: base.primaryColor,
    display: `minimal-ui`,
    icon: base.icon, // This path is relative to the root of the site.
  },
}

module.exports = config
