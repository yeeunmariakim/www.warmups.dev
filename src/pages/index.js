import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Link } from '../components/link'
import Logo from '../../static/logo.svg'

import classes from '../styles/index.module.sass'

export default ({ data }) => {
  const siteMetadata = data.site.siteMetadata
  const chapters = data.allMarkdownRemark.edges.map(({ node }) => ({
    slug: node.fields.slug,
    title: node.frontmatter.title,
    description: node.frontmatter.description,
  }))
  return (
    <Layout isHome>
      <Logo className={classes.logo} aria-label={siteMetadata.title} />

      <section>
        <h1 className={classes.subtitle}>Programming Warmups, <em>for Developers</em></h1>
        <div className={classes.introduction}>
          <p> If you are like many developers, you may find it frustrating when you start to program for the first time &mdash; or when you return to programming after the weekend. <span role="img" aria-label="wink">😉</span> Stop procrastinating or feeling overwhelmed and use <Link variant="secondary" to="https://warmups.dev">warmups.dev</Link> to master programming skills and rev up your mind. You only need your web browser!</p>
        </div>
        <div className={classes.continuation}>
          <p> Although <Link variant="secondary" to="https://warmups.dev">warmups.dev</Link> uses the Python programming language, each exercise explores the concepts shared by many languages and environments. A warmup poses a question that a developer can intuitively answer upon completion of every one of its steps. Find a question that you want to answer and get started! <span role="img" aria-label="rocket">🚀</span></p>
        </div>
      </section>

  {chapters.map(({ slug, title, description }) => (
    <section key={slug} className={classes.chapter}>
      <h2 className={classes.chapterTitle}>
        <Link hidden to={slug}>
          {title}
        </Link>
      </h2>
      <p className={classes.chapterDesc}>
        <Link hidden to={slug}>
          {description}
        </Link>
      </p>
    </section>
  ))}
  </Layout>
  )
}

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "chapter" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`
