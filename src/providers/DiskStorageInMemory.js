class DiskStorage {
  storage = []

  async saveFile(fileName) {
    this.storage.push(fileName)

    return fileName
  }

  async deleteFile(fileName) {
    this.storage = this.storage( fileN => fileN !== fileName)
  }

}

module.exports = DiskStorage