/**
 * @fileoverview Internal rule to prevent missing or invalid meta property in core rules.
 * @author Vitor Balocco
 */

/**
 * Gets the property of the Object node passed in that has the name specified.
 */
function getPropertyFromObject(propertyName: string, node: any): any {
  if (node && node.type === 'ObjectExpression') {
    for (const property of node.properties) {
      if (property.type === 'Property' && property.key.name === propertyName) {
        return property
      }
    }
  }
  return null
}

/**
 * Checks the validity of the meta definition of this rule and reports any errors found.
 */
function checkMetaValidity(context: any, exportsNode: any) {
  const metaProperty = getPropertyFromObject('meta', exportsNode)
  if (!metaProperty) {
    context.report({
      node: exportsNode,
      messageId: 'missingMeta'
    })
    return
  }

  const metaDocs = getPropertyFromObject('docs', metaProperty.value)
  if (!metaDocs) {
    context.report({
      node: metaProperty,
      messageId: 'missingMetaDocs'
    })
    return
  }

  const metaDocsCategories = getPropertyFromObject('categories', metaDocs.value)
  if (!metaDocsCategories) {
    context.report({
      node: metaDocs,
      messageId: 'missingMetaDocsCategories'
    })
    return
  }

  const metaDocsRecommended = getPropertyFromObject(
    'recommended',
    metaDocs.value
  )
  if (metaDocsRecommended) {
    context.report({
      node: metaDocsRecommended,
      messageId: 'invalidMetaDocsRecommended'
    })
    return
  }
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce correct use of `meta` property in core rules',
      categories: ['Internal']
    },
    schema: [],
    messages: {
      missingMeta: 'Rule is missing a meta property.',
      missingMetaDocs: 'Rule is missing a meta.docs property.',
      missingMetaDocsCategories:
        'Rule is missing a meta.docs.categories property.',
      invalidMetaDocsRecommended:
        'Rule should not have a meta.docs.recommended property.'
    },
    languages: ['js/js']
  },

  create(context: any) {
    let exportsNode: any

    return {
      AssignmentExpression(node: any) {
        if (
          node.left &&
          node.right &&
          node.left.type === 'MemberExpression' &&
          node.left.object.name === 'module' &&
          node.left.property.name === 'exports'
        ) {
          exportsNode = node.right
        }
      },

      ExportDefaultDeclaration(node: any) {
        exportsNode = node.declaration
      },

      'Program:exit'() {
        checkMetaValidity(context, exportsNode)
      }
    }
  }
}
