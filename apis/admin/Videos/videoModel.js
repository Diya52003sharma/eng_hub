var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batches', default: null },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', default: null },
    title: { type: String, required: true },
    description: { type: String },
    video_link: { type: String, default: '' },  // Changed to video_link for clarity

    status: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }
});

var Video = module.exports = mongoose.model('Video', videoSchema);

module.exports.get = function (Callback, limit) {
    material.find(Callback).limit(limit);
};
