const Material = require('../Videos/videoModel');  // Adjust the path as per your project structure

// Get All Videos or Filter by Course ID
exports.getAllVideos = async (req, res) => {
    try {
        const filter = req.query.course_id ? { course_id: req.query.course_id } : {};
        const videos = await Material.find(filter).populate('course_id batch_id teacher_id');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving videos', error });
    }
};

// Get Video by ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Material.findById(req.params.id).populate('course_id batch_id teacher_id');
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving video', error });
    }
};

// Add a New Video
exports.addVideo = async (req, res) => {
    const { course_id, batch_id, teacher_id, title, description, video_link } = req.body;
    try {
        const newVideo = new Material({
            course_id,
            batch_id,
            teacher_id,
            title,
            description,
            video_link
        });
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding video', error });
    }
};

// Update Video by ID
exports.updateVideo = async (req, res) => {
    try {
        const updatedVideo = await Material.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating video', error });
    }
};

// Delete Video by ID
exports.deleteVideo = async (req, res) => {
    try {
        const deletedVideo = await Material.findByIdAndDelete(req.params.id);
        if (!deletedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error });
    }
};
