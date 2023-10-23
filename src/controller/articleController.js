const { postArticle, getArticles, getArticleById, deleteArticleById, updateArticleById } = require("../model/articleModel");
const xss = require("xss");

const articleController = {
    postData: async (req, res, next) => {
        try {
            const { title, content, author, category } = req.body;
            console.log("post data ");
            console.log(title, content, author, category);

            if (!title || !content || !author || !category) {
                return res.status(400).json({ status: 400, message: "input title, content, author, category required" });
            }

            let data = {
                title: xss(title),
                content: xss(content),
                author: xss(author),
                category: xss(category),
            };

            console.log("data");
            console.log(data);
            let result = postArticle(data);
            console.log(result);

            return res.status(200).json({ status: 200, message: "data category success", data });
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
    getData: async (req, res, next) => {
        try {
            const getArticle = await getArticles();
            console.log("getArticle");
            console.log(getArticle);
            res.status(200).json({ status: 200, message: "get data users success", data: getArticle });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
    getDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ message: "id wrong" });
            }

            const dataArticleById = await getArticleById(parseInt(id));

            console.log("dataUsers");
            console.log(dataArticleById);

            if (!dataArticleById) {
                return res.status(200).json({ status: 200, message: "get data users not found", data: [] });
            }

            return res.status(200).json({ status: 200, message: "get data users success", data: dataArticleById });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
    deleteDataById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ message: "id wrong" });
            }

            const result = await deleteArticleById(parseInt(id));
            console.log(result);

            if (result.rowCount == 0) {
                throw new Error("delete data failed");
            }

            return res.status(200).json({ status: 200, message: "delete data users success", data: result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: err.message });
        }
    },
    putData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, content, author, category } = req.body;

            if (!id || id <= 0 || isNaN(id)) {
                return res.status(404).json({ message: "id wrong" });
            }

            const dataArticle = await getArticleById(parseInt(id));

            console.log("put data");
            console.log(dataArticle[0]);

            const data = {
                title: xss(title) || dataArticle[0].title,
                content: xss(content) || dataArticle[0].content,
                author: xss(author) || dataArticle[0].author,
                category: xss(category) || dataArticle[0].category,
            };

            const result = await updateArticleById(id, data);
            console.log(result);

            return res.status(200).json({ status: 200, message: "update data article success", data });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    },
};

module.exports = articleController;
