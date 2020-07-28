const Article = require("../model/articles");
const Comment = require("../model/comment");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    if (!articles) {
      return res.status(200).json({ message: "No Articles found" });
    }
    return res.status(200).json({
      message: "Found articles successfully",
      payload: articles,
    });
  } catch (err) {
    return res.status(400).json({ error: "Error While fetching Articles" });
  }
};

exports.addArticle = async (req, res) => {
  const { title, material, img = "No img" } = req.body;
  const article = new Article({
    user: req.profile,
    title: title,
    material: material,
    img: img,
  });

  try {
    const saveArticle = await article.save();
    if (!saveArticle)
      return res.status(400).json({ error: "Unable to create an article" });
  } catch (err) {
    return res.status(400).json({ error: "Unable to create an article" });
  }
  return res.status(200).json({
    message: "Article Created",
    payload: article,
  });
};

exports.getArticleById = (req, res, next, id) => {
  Article.findById(id).exec((err, article) => {
    if (err || !article) {
      return res.status(400).json({ error: "Cannot create an article" });
    }
    req.article = article;
    next();
  });
};

exports.getArticle = (req, res) => {
  return res.status(200).json(req.article);
};

exports.updateArticle = (req, res) => {
  const { type } = req.body;
  switch (type) {
    case "like":
      Article.findByIdAndUpdate(
        req.article._id,
        { like: req.article.like + 1 },
        (err, res) => {
          if (err) {
            return res.status(400).json({ error: "Failed" });
          }
          return res.status(200);
        }
      );
    case "dislike":
      Article.findByIdAndUpdate(
        req.article._id,
        { dislike: req.article.dislike + 1 },
        (err, res) => {
          if (err) {
            return res.status(400).json({ error: "Failed" });
          }
          return res.status(200);
        }
      );
  }
};

exports.addComment = async (req, res) => {
  const { comment } = req.body;
  const c = new Comment({
    user: req.profile,
    article: req.article,
    msg: comment,
  });
  try {
    const saveComment = c.save();
  } catch (err) {
    return res.status(400).json({ error: "Unable to add comment" });
  }
  return res.status(200).json(c);
};
