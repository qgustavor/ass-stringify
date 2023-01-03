const formatTimestamp = (time) => {
  return new Date(Math.round(time * 100) * 10).toISOString().substr(12, 10)
}

const propertyMapper = (key, valueMap, options) => {
  const value = valueMap[key]
  if (typeof value === 'number' && options.timestampKeys.includes(key)) {
    return formatTimestamp(value)
  }
  return value
}

const stringifyDescriptor = {
  comment ({ value }) {
    return `;${value}`
  },
  formatSpec ({ key, value }, options) {
    return `${key}: ${value.join(options.formatJoiner)}`
  },
  properties ({ key, value }, options, format) {
    const values = format.map(key => propertyMapper(key, value, options))
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

    return stringifyDescriptor[method](descriptor, options, format)
  }).join(options.lineBreak)

  return body ? `${head}${options.lineBreak}${body}` : head
}

const stringifyAss = (ass, options = {}) => {
  options.lineBreak ||= '\n'
  options.formatJoiner ||= ', '
  options.sectionJoiner ||= options.lineBreak.repeat(2)
  options.timestampKeys ||= ['Start', 'End']

  return ass
    .map(section => stringifySection(section, options))
    .join(options.sectionJoiner) +
    options.lineBreak
}

export default stringifyAss
