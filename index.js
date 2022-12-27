const stringifyDescriptor = {
  comment ({ value }) {
    return `;${value}`
  },
  formatSpec ({ key, value }, format, options) {
    return `${key}: ${value.join(options.formatJoiner)}`
  },
  properties ({ key, value }, format) {
    const values = format.map(key => value[key])
    return `${key}: ${values.join(',')}`
  },
  raw ({ key, value }) {
    return `${key}: ${value}`
  }
}

const stringifySection = (section, options) => {
  const head = `[${section.section}]`
  let format = null

  const body = section.body.map(descriptor => {
    const method = descriptor.type === 'comment'
      ? 'comment'
      : descriptor.key === 'Format'
        ? 'formatSpec'
        : format
          ? 'properties'
          : 'raw'

    if (method === 'formatSpec') {
      format = descriptor.value
    }

    return stringifyDescriptor[method](descriptor, format, options)
  }).join(options.lineBreak)

  return body ? `${head}${options.lineBreak}${body}` : head
}

const stringifyAss = (ass, options = {}) => {
  options.lineBreak ||= '\n'
  options.formatJoiner ||= ', '
  options.sectionJoiner ||= options.lineBreak.repeat(2)

  return ass
    .map(section => stringifySection(section, options))
    .join(options.sectionJoiner) +
    options.lineBreak
}

export default stringifyAss
