const Story = require("../models/story")

const createStories = async (req, res) => {
    try {
        const doc = new Story({
            title: req.body.title,
            text: req.body.text,
            poster: req.body.poster,
            author: req.userId
        })

        const story = doc.save()

        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getStories = async (req, res) => {
    try {
        const stories = await Story.find().sort({createdAt: -1}).populate("author", "-password").exec()

        return res.status(200).json(stories)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getStory = async (req, res) => {
    try {
        const storyId = req.params.id
        const story = await Story.findOneAndUpdate(
            {_id: storyId},
            {$inc: {views: 1}},
            { returnDocument: "after" }
        ).populate("author", "-password").exec()

        if(!story){
            return res.status(404).json({
                message: "Story not found!"
            })
        }

        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const updateStory = async (req, res) => {
    try {
        const story = await Story.findOneAndUpdate(
            {_id: req.params.id},
            {
                title: req.body.title,
                text: req.body.text,
                poster: req.body.poster,
                author: req.userId
            },
            {new: true}
        )

        if(!story){
            return res.status(404).json({
                message: "Story not found!"
            })
        }

        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const deleteStory = async (req, res) => {
    try {
        const story = await Story.findOneAndDelete({_id: req.params.id})

        if(!story){
            return res.status(404).json({
                message: "Story not found!"
            })
        }

        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = { createStories, getStories, getStory, updateStory, deleteStory }