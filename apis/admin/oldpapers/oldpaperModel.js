var mongoose = require('mongoose')

var paperSchema = mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', default: null },
    //batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batches', default: null },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', default: null },
    title: { type: String },
    description: { type: String },
    upload_file: { type: String, default: '' },

    status: { type: Boolean, default: true },


    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, }
})

var paper = module.exports = mongoose.model('paper', paperSchema);

module.exports.get = function (Callback, limit) {
    material.find(Callback).limit(limit);
}