const { Router } = require('express');
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../middlewares');
const { CacheTime } = require('../helpers');

module.exports = function ({ IdeaController }) {
    const router = Router();

    router.get('', [ParseIntMiddleware, CacheMiddleware(CacheTime.ONE_HOUR)], IdeaController.getAll);
    router.get('/:ideaId', IdeaController.get);
    router.get('/:userId/all', [ParseIntMiddleware, CacheMiddleware(CacheTime.ONE_HOUR)], IdeaController.getUserIdeas);
    router.post('', AuthMiddleware, IdeaController.create);
    router.patch('/:ideaId', AuthMiddleware, IdeaController.update);
    router.delete('/:ideaId', AuthMiddleware, IdeaController.delete);
    router.post('/:ideaId/upvote', AuthMiddleware, IdeaController.upvoteIdea);
    router.post('/:ideaId/downvote', AuthMiddleware, IdeaController.downvoteIdea);

    return router;
};