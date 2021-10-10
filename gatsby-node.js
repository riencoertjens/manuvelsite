const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const locationPageTemplate = path.resolve(
    `src/components/templates/_location-template.js`
  )

  const result = await graphql(`
    {
      locations: allFile(filter: { relativeDirectory: { eq: "locations" } }) {
        nodes {
          name
          childMarkdownRemark {
            frontmatter {
              sections
            }
          }
        }
      }
    }
  `)

  const { locations } = result.data

  locations.nodes.forEach((location) => {
    const path = location.name
    createPage({
      path,
      component: locationPageTemplate,
      context: {
        location: location.name,
        sections: location.childMarkdownRemark.frontmatter.sections,
      },
    })
  })
}
