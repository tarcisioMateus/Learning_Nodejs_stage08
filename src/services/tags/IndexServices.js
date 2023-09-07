class IndexServices {
  constructor ({ tagsRepository }) {
    this.tagsRepository = tagsRepository
  }

  async execute() {
    let tags = await this.tagsRepository.getUserTags({ user_id })
    tags = tags.map( tag => tag.name )
    tags = tagsOneEntryOnly ( tags )

    return tags
  }
}

module.exports = IndexServices

function tagsOneEntryOnly ( tags ) {
  let filteredTags = []
  for ( const tag of tags ) {
    if ( !filteredTags.includes(tag) ) {
      filteredTags = [...filteredTags, tag]
    }
  }
  return filteredTags
}