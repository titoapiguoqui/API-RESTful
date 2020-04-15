const { UserService } = require('../../../src/services');
let { UserModelMock: { user, users } } = require('../../mocks');
let { UserRepositoryMock } = require('../../mocks');

describe('User Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return a user by id', async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.get.mockReturnValue(user);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.get(user._id);

        expect(expected).toMatchObject(user);
    });

    it('Should return a user by username', async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.getUserByUsername.mockReturnValue(user);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.getUserByUsername(user.username);

        expect(expected).toMatchObject(user);
    });

    it('Should return a user collection', async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.getAll.mockReturnValue(users);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.getAll();

        expect(expected).toMatchObject(users);
    });

    it('Should update a specific user by id', async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.update.mockReturnValue(user);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.repository.update(user._id, user);

        expect(expected).toMatchObject(user);
    });

    it('Should delete a specific user by id', async () => {
        const UserRepository = UserRepositoryMock;
        UserRepository.delete.mockReturnValue(true);

        const _userService = new UserService({ UserRepository });
        const expected = await _userService.repository.delete(user._id);

        expect(expected).toEqual(true);
    });
});