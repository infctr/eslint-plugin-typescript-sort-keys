const objectNodeTypes = new Set([
  'TSInterfaceDeclaration',
  'TSEnumDeclaration',
  'TSTypeLiteral',
]);

module.exports = {
  getObjectBody(node) {
    switch (node.type) {
      case 'TSInterfaceDeclaration':
        return node.body.body;
      case 'TSEnumDeclaration':
      case 'TSTypeLiteral':
        return node.members;
      default:
        return null;
    }
  },

  getObjectParent(node) {
    let result = node;
    while (result) {
      if (objectNodeTypes.has(result.type)) {
        break;
      }
      result = result.parent;
    }
    return result;
  },
  /**
   * Gets the property name of a given node.
   * The node can be a TSPropertySignature, or a TSMethodSignature.
   *
   * If the name is dynamic, this returns `null`.
   *
   * For examples:
   *
   *     a.b           // => "b"
   *     a["b"]        // => "b"
   *     a['b']        // => "b"
   *     a[`b`]        // => "b"
   *     a[100]        // => "100"
   *     a[b]          // => null
   *     a["a" + "b"]  // => null
   *     a[tag`b`]     // => null
   *     a[`${b}`]     // => null
   *
   *     let a = {b: 1}            // => "b"
   *     let a = {["b"]: 1}        // => "b"
   *     let a = {['b']: 1}        // => "b"
   *     let a = {[`b`]: 1}        // => "b"
   *     let a = {[100]: 1}        // => "100"
   *     let a = {[b]: 1}          // => null
   *     let a = {["a" + "b"]: 1}  // => null
   *     let a = {[tag`b`]: 1}     // => null
   *     let a = {[`${b}`]: 1}     // => null
   *
   * @param {ASTNode} node - The node to get.
   * @returns {string|null} The property name if static. Otherwise, null.
   */
  getStaticPropertyName(node) {
    let prop;

    switch (node && node.type) {
      case 'TSIndexSignature':
        if (node.parameters.length > 0) {
          const [identifier] = node.parameters;
          prop = {
            ...identifier,
            name: `[index: ${identifier.name}]`,
          };
        }
        break;

      case 'TSPropertySignature':
      case 'TSMethodSignature':
        prop = node.key;
        break;

      case 'TSEnumMember':
        prop = node.id;
        break;

      // no default
    }

    switch (prop && prop.type) {
      case 'Literal':
        return String(prop.value);

      case 'TemplateLiteral':
        if (prop.expressions.length === 0 && prop.quasis.length === 1) {
          return prop.quasis[0].value.cooked;
        }
        break;

      case 'Identifier':
        if (!node.computed) {
          return prop.name;
        }
        break;

      // no default
    }

    return null;
  },

  /**
   * Gets the property name of the given `Property` node.
   *
   * - If the property's key is an `Identifier` node, this returns the key's name
   *   whether it's a computed property or not.
   * - If the property has a static name, this returns the static name.
   * - Otherwise, this returns null.
   *
   * @param {ASTNode} node - The `Property` node to get.
   * @returns {string|null} The property name or null.
   * @private
   */
  getPropertyName(node) {
    return module.exports.getStaticPropertyName(node) || node.key.name || null;
  },
};
