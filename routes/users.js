const { Router } = require('express');
const {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
} = require('../controllers/users')

const router = Router();


// get
router.get('/', userGet);

// put
router.put('/:userId', userPut);

// patch
router.patch('/', userPatch);

// post
router.post('/', userPost);

// delete
router.delete('/', userDelete);


module.exports = router;