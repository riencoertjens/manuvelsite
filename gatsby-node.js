const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const locationPageTemplate = path.resolve(
    `src/components/templates/_location-template.js`
  )

  const result = await graphql(`
    {
      sections: allFile(filter: { relativeDirectory: { eq: "sections" } }) {
        nodes {
          name
          childMarkdownRemark {
            frontmatter {
              title
              tagline
              height
              width
              gold
              contentNL
              contentEN
            }
          }
        }
      }
      locations: allFile(filter: { relativeDirectory: { eq: "locations" } }) {
        nodes {
          name
          childMarkdownRemark {
            frontmatter {
              title
              address {
                street
                city
                post_code
                coordinates {
                  lat
                  lng
                }
              }
              sections
            }
          }
        }
      }
    }
  `)

  const { sections, locations } = result.data

  locations.nodes.forEach((location) => {
    const path = location.name
    createPage({
      path,
      component: locationPageTemplate,
      context: {
        ...location.childMarkdownRemark.frontmatter,
        sections: sections.nodes.filter((section) =>
          location.childMarkdownRemark.frontmatter.sections.includes(
            section.name
          )
        ),
      },
    })
  })
}
