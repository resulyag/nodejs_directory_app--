const directoryController = require("../controllers/directoryController.js");

const router = require("express").Router();

router.post("/add", directoryController.add);

router.get("/", directoryController.getAll);

router.get("/:filter", directoryController.getAllbyFilter);

router.delete("/:id", directoryController.deleteById);

router.put("/:id", directoryController.updateById);



module.exports = router;
