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

  /**
   * Gets the property name and optional value of a given node.
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
   * @typedef {Object} NameAndOptional
   * @property {string|undefined} name - Name of node
   * @property {boolean|undefined} isOptional - Optional value of node
   *
   * @param {ASTNode} node - The node to get.
   * @returns {NameAndOptional} - The property name and optional value if static.
   */
  getStaticPropertyNameAndOptional(node) {
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
        return {
          name: String(prop.value),
          isOptional: prop.optional,
        };

      case 'TemplateLiteral':
        if (prop.expressions.length === 0 && prop.quasis.length === 1) {
          return {
            name: prop.quasis[0].value.cooked,
            isOptional: prop.optional,
          };
        }
        break;

      case 'Identifier':
        if (!node.computed) {
          return {
            name: prop.name,
            isOptional: prop.optional,
          };
        }
        break;

      // no default
    }

    return {};
  },

  /**
   *
   * Gets if the property is optional given `Property` node.
   *
   * @param {ASTNode} node - The `Property` node to get.
   * @returns {boolean} - The optional value or false.
   */
  getPropertyOptional(node) {
    const { isOptional } = module.exports.getStaticPropertyNameAndOptional(
      node,
    );
    return !!(isOptional || node.optional);
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
   * @returns {string|null} - The property name or null.
   * @private
   */
  getPropertyName(node) {
    const { name } = module.exports.getStaticPropertyNameAndOptional(node);

    return name || (node.key && node.key.name) || null;
  },
};
