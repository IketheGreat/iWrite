const { Router } = require("express")
const router = Router()

const {createStories, deleteStory, getStories, getStory, updateStory} = require("../controllers/stories.controller")
const protectAuth = require("../middlewares/protectAuth")

router.post("/", protectAuth, createStories)
router.get("/", getStories)
router.get("/:id", getStory)
router.delete("/:id", protectAuth, deleteStory)
router.put("/:id", protectAuth, updateStory)

module.exports = router