const {
  getAllArticles,
  addArticle,
  getArticleById,
  getArticle,
  updateArticle,
  addComment,
} = require("../controller/articles");
const { getUserById, authenticated } = require("../controller/auth");

const router = require("express").Router();

router.param("uid", getUserById);
router.param("aid", getArticleById);
router.get("/articles", getAllArticles);
router.get("/article/:aid", getArticle);
router.post("/add/article/:uid", authenticated, addArticle);
router.post("/add/comment/:uid/:aid", addComment);
router.put("/update/article/:uid/:aid", authenticated, updateArticle);

module.exports = router;
