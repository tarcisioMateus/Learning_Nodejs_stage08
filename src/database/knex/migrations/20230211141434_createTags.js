exports.up = knex => knex.schema.createTable('tags', table => {
    table.incrementes('id')

    table.text('name').notNullable()

    table.integer('note_id').references('id').inTable('notes').onDelete('CASACADE')
    table.integer('user_id').references('id').inTable('users').onDelete('CASACADE')
})


exports.down = knex => knex.schema.dropTable('tags')
