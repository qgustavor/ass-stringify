const stringifyDescriptor = {
  comment ({ value }) {
    return `;${value}`
  },
  formatSpec ({ key, value }) {
    return `${key}: ${value.join(', ')}`
  },
  properties ({ value, key }, format) {
    const values = format.map(key => value[key])
    return `${key}: ${values.join(',')}`
  },
  raw ({ key, value }) {
    return `${key}: ${value}`
  }
}

const stringifySection = section => {
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

    return stringifyDescriptor[method](descriptor, format)
  }).join('\n')

  return body ? `${head}\n${body}` : head
}

const stringifyAss = ass => ass.map(stringifySection).join('\n\n') + '\n'

export default stringifyAss
