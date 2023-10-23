const Pool = require("../config/db");

const postArticle = async (data) => {
    const { title, content, author, category } = data;
    console.log("model postArticle");
    try {
        const queryString = `INSERT INTO article(title, content, author, category) 
        VALUES($1, $2, $3, $4) RETURNING id`;
        const values = [title, content, author, category];

        const result = await Pool.query(queryString, values);
        return result.rows[0].id;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getArticles = async () => {
    try {
        const queryString = "SELECT * FROM article";
        const result = await Pool.query(queryString);
        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getArticleById = async (articleId) => {
    try {
        const queryString = "SELECT * FROM article WHERE id = $1";
        const values = [articleId];
        const result = await Pool.query(queryString, values);

        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteArticleById = async (articleId) => {
    try {
        const queryString = "DELETE FROM article WHERE id = $1";
        const values = [articleId];
        const result = await Pool.query(queryString, values);

        return result.rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateArticleById = async (articleId, newData) => {
    try {
        const { title, content, author, category } = newData;
        const queryString = `
            UPDATE article 
            SET title = $1, content = $2, author = $3, category = $4, updated_at = NOW()
            WHERE id = $5
        `;
        const values = [title, content, author, category, articleId];

        const result = await Pool.query(queryString, values);

        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { postArticle, getArticles, getArticleById, deleteArticleById, updateArticleById };
