const { Router } = require('express');
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
const { CacheTime } = require('../helpers');

module.exports = function ({ CommentController }) {
    const router = Router();

    router.get('/:ideaId', [ParseIntMiddleware, CacheMiddleware(CacheTime.ONE_HOUR)], CommentController.getIdeaComments);
    router.get('/:commentId/unique', CacheMiddleware(CacheTime.ONE_HOUR), CommentController.get);
    router.post('/:ideaId', AuthMiddleware, CommentController.createComment);
    router.patch('/:commentId', AuthMiddleware, CommentController.update);
    router.delete('/:commentId', AuthMiddleware, CommentController.delete);

    return router;
};